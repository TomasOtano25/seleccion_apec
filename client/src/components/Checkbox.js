import React from "react";

const Checkbok = ({ selected, type = "checkbox", value, onChange }) => {
  return (
    <input
      type={type}
      value={value}
      checked={parseInt(value) === parseInt(selected) ? true : false}
      onChange={onChange}
    />
  );
};

export default Checkbok;
