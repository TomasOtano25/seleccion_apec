import React from "react";

const MySelection = ({ selection }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Grupo</th>
          <th scope="col">Asignatura</th>
          <th scope="col">Profesor</th>
        </tr>
      </thead>
      <tbody>
        {selection.map((item, index) => (
          <tr key={index}>
            <th scope="row">{item.group}</th>
            <th>{`${item.code} - ${item.name}`}</th>
            <th>{item.teacher}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MySelection;
