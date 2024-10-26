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
} from "../../redux/filtersSlice";
import Checkbox from "../../components/Checkbox/Checkbox";

function VehicleList() {}

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

function performSearch() {
  console.log("Performing search");
}

function Filters() {
  return (
    <>
      <Location />
      <p className={styles.filtersLabel}>Filters</p>
      <div id="filters" className={styles.filters}>
        <VehicleEquipment />
        <VehicleType />
        <Button
          text="Search"
          className={styles.searchButton}
          onClick={performSearch}
        />
      </div>
    </>
  );
}

function Location() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.filters.location);

  const handleSelect = async (value) => {
    dispatch(setLocation(value));
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
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ position: "relative" }}>
            <input
              className={styles.locationInput}
              {...getInputProps({ placeholder: "City" })}
              id="location"
            />

            {loading && <div>...loading</div>}

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
  return (
    <div className={styles.catalog}>
      <div className={styles.catalogLeft}>
        <Filters />
      </div>
      <div className={styles.catalogRight}>
        <VehicleList />
      </div>
    </div>
  );
}

export default Catalog;
