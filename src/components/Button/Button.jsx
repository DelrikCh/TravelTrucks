import styles from "./Button.module.css";

function Button({ text, className = "", onClick, ...props }) {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
}

export default Button;
