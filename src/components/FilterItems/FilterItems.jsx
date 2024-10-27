import SVGProvider from "../../services/SVGProvider";
import styles from "./FilterItems.module.css";

// filters in format { icon: string, text: string }[]
function FilterItems({ filters, className = "" }) {
  return (
    <ul className={`${styles.list} ${className}`}>
      {filters.map(({ icon, text }) => (
        <li className={styles.item} key={icon}>
          <SVGProvider id={icon} width="20" height="20" />
          <span className={styles.text}>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export default FilterItems;
