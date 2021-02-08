import propTypes from "prop-types";
const Button = (props) => {
  return (
    <button onClick={props.onAdd} className="btn">
      {props.text}
    </button>
  );
};
Button.propTypes = {
  text: propTypes.string,
  onClick: propTypes.func,
};
export default Button;
