import React from "react";
import "./CustomRadioBtn.css";

const CustomRadioBtn = ({
  name,
  id,
  value,
  onChange,
  checked,
  text,
  labelClass,
}) => {
  return (
    <label htmlFor={id} className={`radio-label ${labelClass}`}>
      <input
        className="radio-input"
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className="custom-radio" />
      {text}
    </label>
  );
};

export default CustomRadioBtn;
