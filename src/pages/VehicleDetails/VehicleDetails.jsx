import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import styles from "./VehicleDetails.module.css";
import { fetchCamper } from "../../services/apiService";
import { get_filters, prettify_filter_data } from "../../services/helpers";
import VehicleRatingLocation from "../../components/VehicleRatingLocation/VehicleRatingLocation";
import FilterItems from "../../components/FilterItems/FilterItems";

function Header({ vehicle }) {
  return (
    <div className={styles.detailsHeader}>
      <h2 className={styles.vehicleTitle}>{vehicle.name}</h2>
      <VehicleRatingLocation
        rating={vehicle.rating}
        reviews={vehicle.reviews.length}
        location={vehicle.location}
      />
      <h2 className={styles.vehiclePrice}>{`€${vehicle.price}.00`}</h2>
    </div>
  );
}

function Pictures({ vehicle }) {
  return (
    <ul className={styles.gallery}>
      {vehicle.gallery.map((picture) => (
        <li key={picture.original}>
          <img
            src={picture.original}
            alt={vehicle.name}
            className={styles.picture}
          />
        </li>
      ))}
    </ul>
  );
}

function Description({ vehicle }) {
  return <p className={styles.description}>{vehicle.description}</p>;
}

function SubpageChoserButtons({ state, setState }) {
  return (
    <ul className={styles.buttons}>
      <li>
        <button
          onClick={() => {
            setState("features");
          }}
          className={`${styles.button} ${
            state === "features" ? styles.buttonActive : ""
          }`}
        >
          Features
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setState("reviews");
          }}
          className={`${styles.button} ${
            state === "reviews" ? styles.buttonActive : ""
          }`}
        >
          Reviews
        </button>
      </li>
    </ul>
  );
}

function HorizontalLine() {
  return <hr className={styles.horizontalLine} />;
}

function Features({ vehicle }) {
  const filters = get_filters(vehicle);
  const fields = {
    Form: vehicle.form,
    Length: vehicle.length,
    Width: vehicle.width,
    Height: vehicle.height,
    Tank: vehicle.tank,
    Consumption: vehicle.consumption,
  };
  return (
    <div className={styles.features}>
      <FilterItems filters={filters} />
      <div className={styles.vehicleData}>
        <h3 className={styles.vehicleDataTitle}>Vehicle details</h3>
        <hr className={styles.horizontalLine} />
        <ul className={styles.vehicleDataList}>
          {Object.entries(fields).map(([key, value]) => (
            <li key={key} className={styles.vehicleDataItem}>
              <span className={styles.vehicleDataItemTitle}>{key}</span>
              <span className={styles.vehicleDataItemData}>
                {prettify_filter_data(key, value)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Reviews({ vehicle }) {
  return <></>;
}

function Details({ vehicle, features }) {
  return (
    <div className={styles.details}>
      {features ? (
        <Features vehicle={vehicle} />
      ) : (
        <Reviews vehicle={vehicle} />
      )}
    </div>
  );
}

function BookForm({ vehicle }) {}

function VehicleDetails() {
  const vehicleId = useParams().id;
  const [vehicle, setVehicle] = useState(null);
  const [buttonState, setButtonState] = useState("features");

  useEffect(() => {
    fetchCamper(vehicleId).then((response) => {
      setVehicle(response.data);
    });
  }, [vehicleId]);
  if (!vehicle) {
    return (
      <ReactLoading
        type="spin"
        color="#000"
        className={styles.loadingSpinner}
      />
    );
  }

  return (
    <div className={styles.vehicleDetailsPage}>
      <Header vehicle={vehicle} />
      <Pictures vehicle={vehicle} />
      <Description vehicle={vehicle} />
      <div>
        <SubpageChoserButtons state={buttonState} setState={setButtonState} />
        <HorizontalLine />
        <Details
          vehicle={vehicle}
          features={buttonState === "features" ? true : false}
        />
        <BookForm vehicle={vehicle} />
      </div>
    </div>
  );
}

export default VehicleDetails;
