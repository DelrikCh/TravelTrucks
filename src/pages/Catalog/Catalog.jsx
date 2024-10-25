import { useState } from "react";
import styles from "./Catalog.module.css";

import PlacesAutocomplete from "react-places-autocomplete";

function VehicleList() {}

function VehicleType() {}

function VehicleEquipment() {}

function Filters() {}

function Location() {
  const [address, setAddress] = useState("");

  const handleSelect = async (value) => {
    setAddress(value);
  };

  return (
    <div className={styles.locationForm}>
      <label className={styles.locationLabel} htmlFor="location">
        Location
      </label>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={{
          types: ["(cities)"],
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              className={styles.locationInput}
              {...getInputProps({ placeholder: "City" })}
              id="location"
            />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
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
        <Location />
      </div>
      <div className={styles.catalogRight}></div>
    </div>
  );
}

export default Catalog;
