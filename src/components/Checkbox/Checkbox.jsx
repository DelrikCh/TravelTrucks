import { useState, useEffect } from "react";

import styles from "./Checkbox.module.css";
import SvgProvider from "../../services/SVGProvider";

function Checkbox({ text, icon, checked: initialChecked, onChange }) {
  const [checked, setChecked] = useState(initialChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    // If provided
    if (onChange) {
      onChange(newChecked);
    }
  };

  useEffect(() => {
    setChecked(initialChecked);
  }, [initialChecked]);

  return (
    <button
      onClick={handleToggle}
      className={`${styles.button} ${checked && styles.buttonActive}`}
    >
      <SvgProvider id={icon} width="32" height="32" />
      <span className={styles.buttonText}>{text}</span>
    </button>
  );
}

export default Checkbox;
