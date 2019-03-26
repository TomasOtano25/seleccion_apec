import React, { useEffect } from "react";
import Select from "react-select";

const normalize = data => {
  let options = [];
  data.map(item => {
    options.push({ value: item.id, label: item.name });
  });
  return options;
};

const Dropdown = props => {
  return (
    <>
      <Select
        onChange={props.handleOnChange}
        options={normalize(props.options)}
      />
    </>
  );
};

export default Dropdown;
