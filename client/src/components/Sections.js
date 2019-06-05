import React, { useState } from "react";
import Checkbok from "./Checkbox";
import { Api } from "../utils/Api";

const Sections = props => {
  const [selected, setSelected] = useState(undefined);

  const toogleCheckboxChange = e => {
    if (selected === undefined) {
      setSelected(e.target.value);

      Api.post("sections/", {
        sectionId: e.target.value,
        subjectId: props.subject.value
      }).then(res => {
        console.log(res);
      });

      console.log(props.subject.value);
      console.log(e.target.value);
      return;
    }

    //eslint-disable-next-line
    let messagebox = confirm("¿Esta seguro que desea cambiar de seccion?");
    if (messagebox !== true) {
      return;
    }

    setSelected(e.target.value);
  };

  return (
    <div className="card rounded-0 mt-3">
      <div className="card-header">
        <h4> Secciones </h4>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">#</th>
            <th scope="col">Grupo</th>
            <th scope="col">Profesor</th>
          </tr>
        </thead>
        <tbody>
          {props.sections.map(section => (
            <tr key={section.id}>
              <th scope="row">
                <div className="form-check">
                  <Checkbok
                    selected={selected}
                    value={section.id}
                    onChange={toogleCheckboxChange}
                  />
                  {/* <input
                  className="form-check-input"
                  type="checkbox"
                  value={section.id}
                  onChange={toogleCheckboxChange}
                /> */}
                </div>
              </th>
              <th>{section.id}</th>
              <td>{section.group}</td>
              <td>{section.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sections;
