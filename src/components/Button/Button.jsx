import s from "./Button.module.css";

const Button = ({ cbOnClick }) => {
  return (
    <button className={s.Button} onClick={cbOnClick} type="button">
      More
    </button>
  );
};

export default Button;
