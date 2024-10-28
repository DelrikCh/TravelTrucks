import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete from "react-places-autocomplete";

import Button from "../../components/Button/Button";
import styles from "./Catalog.module.css";
import {
  setLocation,
  addEquipment,
  removeEquipment,
  addType,
  removeType,
  increasePage,
  resetPage,
} from "../../redux/filtersSlice";
import Checkbox from "../../components/Checkbox/Checkbox";
import FilterItems from "../../components/FilterItems/FilterItems";
import { fetchCampers } from "../../services/apiService";
import { setVehiclesList } from "../../redux/vehiclesSlice";
import { switchFavorite } from "../../redux/favoriteVehiclesSlice";
import SVGProvider from "../../services/SVGProvider";
import { get_filters } from "../../services/helpers";
import { useNavigate } from "react-router-dom";
import VehicleRatingLocation from "../../components/VehicleRatingLocation/VehicleRatingLocation";
import { toast, ToastContainer } from "react-toastify";

function VehicleListItem({
  id,
  name,
  price,
  rating,
  reviews,
  location,
  description,
  filters,
  img,
}) {
  price = `€${price}.00`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSwitch = (id) => {
    dispatch(switchFavorite(id));
  };
  const favorites = useSelector((state) => state.favoriteVehicles.ids);
  return (
    <li className={styles.vehicleListItem}>
      <img src={img} alt={name} className={styles.vehicleListItemImage} />
      <div className={styles.vehicleListItemContent}>
        <div className={styles.vehicleListItemTitleDiv}>
          <h2 className={styles.vehicleListItemTitle}>{name}</h2>
          <h2 className={styles.vehicleListItemPrice}>{price}</h2>
          <button
            className={styles.favoriteButton}
            onClick={() => onSwitch(id)}
          >
            <SVGProvider
              id="favorite"
              className={`${styles.vehicleListItemFavorite} ${
                favorites.includes(id)
                  ? styles.vehicleListItemFavoriteSelected
                  : ""
              }`}
            />
          </button>
        </div>
        <VehicleRatingLocation
          rating={rating}
          reviews={reviews}
          location={location}
        />
        <div>
          <p className={styles.vehicleListItemDescription}>{description}</p>
        </div>
        <div className="vehicleListItemFilters">
          <FilterItems
            filters={filters}
            className={styles.vehicleListItemFiltersItems}
          />
        </div>
        <Button
          text="Show more"
          className={styles.vehicleListItemButton}
          onClick={() => {
            navigate(`/catalog/${id}`);
          }}
        />
      </div>
    </li>
  );
}

function VehicleList() {
  const page = useSelector((state) => state.filters.page);
  const perPage = 4;
  let vehicles = useSelector((state) => state.vehicles);
  vehicles = Object.entries(vehicles);
  vehicles = vehicles.slice(0, page * perPage);
  vehicles = Object.fromEntries(vehicles);
  return (
    <ul className={styles.vehicleList}>
      {Object.keys(vehicles).map((key) => {
        const vehicle = vehicles[key];
        if (!vehicle.id) return null;

        const filters = get_filters(vehicle);
        return (
          <VehicleListItem
            key={vehicle.id}
            id={vehicle.id}
            name={vehicle.name}
            price={vehicle.price}
            rating={vehicle.rating}
            reviews={vehicle.reviews.length}
            location={vehicle.location}
            description={vehicle.description}
            filters={filters}
            img={vehicle.gallery[0].thumb}
          />
        );
      })}
    </ul>
  );
}

function filterResults(results, filters) {
  // "Local": endpoint result
  // I.e. local value in equipment filters: expected value to be true
  const bool_matcher = {
    AC: "AC",
    TV: "TV",
    Kitchen: "kitchen",
    Bathroom: "bathroom",
  };
  // Local, expected value
  const text_matcher = {
    Automatic: { key: "transmission", value: "automatic" },
  };
  // endpoint value: expected value
  const vehicleTypeCheck = {
    alcove: "Alcove",
    fullyIntegrated: "Fully Integrated",
    panelTruck: "Van",
  };
  const { location, type, equipment } = filters;
  return results.filter((vehicle) => {
    // Location check
    if (location && vehicle.location !== location) return false;
    // Bool checks
    for (const key in bool_matcher) {
      // If equipment has the equipment and the vehicle doesn't have the equipment, return false
      if (equipment.includes(key) && !vehicle[bool_matcher[key]]) return false;
    }
    // Text checks
    for (const key in text_matcher) {
      const { key: vehicle_key, value } = text_matcher[key];
      if (equipment.includes(key) && vehicle[vehicle_key] !== value)
        return false;
    }
    // Vehicle type check
    if (type.length > 0 && !type.includes(vehicleTypeCheck[vehicle.form])) {
      return false;
    }

    return true;
  });
}

function Filter({ data, icons_texts, addFilter, removeFilter, title }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.filters}>
      <h3 className={styles.filtersTitle}>{title}</h3>
      <hr className={styles.divider} />
      <ul className={styles.filtersList}>
        {icons_texts.map(({ icon, text }) => (
          <li key={icon}>
            <Checkbox
              text={text}
              icon={icon}
              checked={data.includes(text)}
              onChange={(checked) =>
                checked
                  ? dispatch(addFilter(text))
                  : dispatch(removeFilter(text))
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function VehicleType() {
  const type = useSelector((state) => state.filters.type);
  // Van, Fully Integrated, Alcove
  const icons_texts = [
    { icon: "van", text: "Van" },
    { icon: "fully_integrated", text: "Fully Integrated" },
    { icon: "alcove", text: "Alcove" },
  ];
  return (
    <Filter
      data={type}
      icons_texts={icons_texts}
      addFilter={addType}
      removeFilter={removeType}
      title="Vehicle type"
    />
  );
}

function VehicleEquipment() {
  const equipment = useSelector((state) => state.filters.equipment);
  // AC, Automatic, Kitchen, TV, Bathroom
  const icons_texts = [
    { icon: "ac", text: "AC" },
    { icon: "automatic", text: "Automatic" },
    { icon: "kitchen", text: "Kitchen" },
    { icon: "tv", text: "TV" },
    { icon: "bathroom", text: "Bathroom" },
  ];
  return (
    <Filter
      data={equipment}
      icons_texts={icons_texts}
      addFilter={addEquipment}
      removeFilter={removeEquipment}
      title="Vehicle equipment"
    />
  );
}

function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const searchFunc = () => {
    try {
      console.log("Searching");
      fetchCampers().then((res) => {
        const result = filterResults(res.data.items, filters);
        console.log(result);
        dispatch(resetPage());
        dispatch(setVehiclesList(result));
      });
    } catch (error) {
      toast.error("Error fetching vehicles");
      console.error(error);
    }
  };
  // If no vehicles in state.vehicles, then invoke searchFunc
  // persistance takes 1 key, so <= 1
  if (Object.keys(useSelector((state) => state.vehicles)).length <= 1) {
    searchFunc();
  }
  return (
    <>
      <ToastContainer />
      <Location />
      <p className={styles.filtersLabel}>Filters</p>
      <div id="filters" className={styles.filters}>
        <VehicleEquipment />
        <VehicleType />
        <Button
          text="Search"
          className={styles.searchButton}
          onClick={searchFunc}
        />
      </div>
    </>
  );
}

function Location() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.filters.location);

  const handleSelect = async (value) => {
    // Reverse entire string by comma
    let reversed = value.split(",").reverse();
    // The endpoint api is different. Hack for Ukraine(remove Oblast from the array)
    reversed = reversed.filter((item) => !item.includes("Oblast"));
    reversed = reversed.join(", ").trim();
    dispatch(setLocation(reversed));
  };

  return (
    <div className={styles.locationForm}>
      <label className={styles.locationLabel} htmlFor="location">
        Location
      </label>
      <PlacesAutocomplete
        value={location}
        onChange={(value) => dispatch(setLocation(value))}
        onSelect={handleSelect}
        searchOptions={{
          types: ["(cities)"],
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div style={{ position: "relative" }}>
            <input
              className={styles.locationInput}
              {...getInputProps({ placeholder: "City" })}
              id="location"
            />

            {suggestions.length > 0 && (
              <div className={styles.locationSuggestionsContainer}>
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    padding: "12px 20px", // Padding for better aesthetics
                    cursor: "pointer", // Change cursor to pointer on hover
                  };

                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={suggestion.placeId}
                      className={styles.locationSuggestions}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

function Catalog() {
  const dispatch = useDispatch();
  const loadMoreButtonHidden = useSelector(
    (state) => state.filters.page * 4 >= Object.keys(state.vehicles).length
  );
  return (
    <div className={styles.catalog}>
      <div className={styles.catalogLeft}>
        <Filters />
      </div>
      <div className={styles.catalogRight}>
        <VehicleList />
        <button
          className={styles.loadMoreButton}
          onClick={() => dispatch(increasePage())}
          hidden={loadMoreButtonHidden}
        >
          Load more
        </button>
      </div>
    </div>
  );
}

export default Catalog;
