import styles from "./VehicleRatingLocation.module.css";
import SVGProvider from "../../services/SVGProvider";

function VehicleRatingLocation({ rating, reviews, location }) {
  return (
    <div className={styles.info}>
      <SVGProvider id="rating" className={styles.reviews} />
      <p className={styles.rating}>
        {rating}({reviews} Reviews)
      </p>
      <SVGProvider id="location" className={styles.locationIcon} />
      <p className={styles.location}>{location}</p>
    </div>
  );
}

export default VehicleRatingLocation;
