import sprite from "../assets/svg/sprite.svg";

const SVGProvider = ({ id, ...props }) => {
  return (
    <svg {...props}>
      <use xlinkHref={`${sprite}#${id}`} />
    </svg>
  );
};

export default SVGProvider;
