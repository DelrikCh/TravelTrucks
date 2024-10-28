import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./VehicleDetails.module.css";
import { fetchCamper } from "../../services/apiService";
import { get_filters, prettify_filter_data } from "../../services/helpers";
import VehicleRatingLocation from "../../components/VehicleRatingLocation/VehicleRatingLocation";
import FilterItems from "../../components/FilterItems/FilterItems";
import SVGProvider from "../../services/SVGProvider";
import { Formik, Form, Field } from "formik";
import Button from "../../components/Button/Button";

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

function RatingStars({ rating }) {
  const faded_stars = 5 - rating;
  return (
    <ul className={styles.ratingStarsList}>
      {[...Array(rating)].map((_, index) => (
        <li key={index}>
          <SVGProvider id="rating" className={styles.ratingStars} />
        </li>
      ))}
      {[...Array(faded_stars)].map((_, index) => (
        <li key={rating + index}>
          <SVGProvider id="rating" className={styles.ratingFadedStars} />
        </li>
      ))}
    </ul>
  );
}

function Review({ name, rating, description }) {
  return (
    <div>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewPhoto}>{name[0]}</div>
        <div className={styles.reviewNameRating}>
          <span className={styles.reviewName}>{name}</span>
          <RatingStars rating={rating} />
        </div>
      </div>
      <p className={styles.reviewDescription}>{description}</p>
    </div>
  );
}

function Reviews({ vehicle }) {
  return (
    <ul className={styles.reviews}>
      {vehicle.reviews.map((review, index) => (
        <li key={index}>
          <Review
            name={review.reviewer_name}
            rating={review.reviewer_rating}
            description={review.comment}
          />
        </li>
      ))}
    </ul>
  );
}

function Details({ vehicle, features }) {
  return (
    <div>
      {features ? (
        <Features vehicle={vehicle} />
      ) : (
        <Reviews vehicle={vehicle} />
      )}
    </div>
  );
}

function BookFormImpl({ vehicleId }) {
  const minDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const initialValues = {
    name: "",
    email: "",
    date: minDate.toISOString().split("T")[0],
    comment: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    // Date should be at tomorrow from now, we can't really book a campervan for today
    date: Yup.date()
      .min(
        minDate,
        `Invalid date. The booking date should be ${
          minDate.toISOString().split("T")[0]
        } or later`
      )
      .typeError("Invalid date format")
      .required("Required"),
    comment: Yup.string(),
  });

  // TODO: Remove Stub once backend is implemented
  const backendStub = {
    send: (values, vehicleId) => {
      console.log("Booking request sent", values, vehicleId);
    },
  };

  const validateValues = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (err) {
      // If validation fails, create an object to hold the error messages
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      // Return the validation errors
      return validationErrors;
    }
  };

  const handleSubmit = async (values, { resetForm, setErrors }) => {
    // Validate the values before proceeding with submission
    const validationErrors = await validateValues(values);
    if (validationErrors) {
      // Set the errors in Formik if there are validation issues
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((message) => {
        toast.error(message); // Show each error as a toast notification
      });
      return; // Prevent form submission
    }

    // Proceed with the successful form submission logic
    toast.success("Your booking request has been sent!");
    backendStub.send(values, vehicleId);
    resetForm();
  };

  return (
    <div>
      <ToastContainer />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.bookFormImpl}>
          <Field
            type="text"
            name="name"
            placeholder="Name*"
            className={styles.bookField}
          />

          <Field
            type="text"
            name="email"
            placeholder="Email*"
            className={styles.bookField}
          />

          <Field
            type="date"
            name="date"
            placeholder="Booking date*"
            className={styles.bookField}
            min={minDate}
          />

          <Field
            as="textarea"
            name="comment"
            placeholder="Comment"
            className={`${styles.bookField} ${styles.bookFieldComment}`}
          />
          <Button text="Send" type="submit" className={styles.bookFormButton} />
        </Form>
      </Formik>
    </div>
  );
}

function BookForm({ vehicleId }) {
  return (
    <div className={styles.bookForm}>
      <div className={styles.bookFormHeader}>
        <h3 className={styles.bookFormTitle}>Book your campervan now</h3>
        <span className={styles.bookFormText}>
          Stay connected! We are always ready to help you.
        </span>
      </div>
      <BookFormImpl vehicleId={vehicleId} />
    </div>
  );
}

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
        <div className={styles.belowHorizontalLine}>
          <Details
            vehicle={vehicle}
            features={buttonState === "features" ? true : false}
          />
          <BookForm vehicleId={vehicle.id} />
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails;
