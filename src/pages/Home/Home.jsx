import styles from "./Home.module.css";

import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

function Text() {
  return (
    <div className={styles.text}>
      <span className={styles.textTitle}>Campers of your dreams</span>
      <span className={styles.textDescription}>
        You can find everything you want in our catalog
      </span>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog");
  };

  return (
    <div className={styles.home}>
      <Text />
      <Button text="View Now" className={styles.button} onClick={handleClick} />
    </div>
  );
}

export default Home;
