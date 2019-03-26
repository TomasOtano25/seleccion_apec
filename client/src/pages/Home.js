import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import { Api } from "../utils/Api";
import Dropdown from "../components/Dropdown";
import Sections from "../components/Sections";
import "./Home.css";

import MySelection from "../components/MySelection";

const HomePage = () => {
  const [user, setUser] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState({});
  const [sections, setSections] = useState([]);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    Api.get("users/me")
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    Api.get("subjects")
      .then(res => {
        setSubjects(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });

    Api.get("sections/selection").then(res => {
      setSelection(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const handleOnChangeSubject = selectOptions => {
    if (subject.value === selectOptions.value) {
      return;
    }

    Api.get(`sections/${selectOptions.value}`).then(res => {
      setSubject(selectOptions);
      setSections(res.data.data);
    });
  };

  return (
    <>
      <Header />
      <div className="nav-bar">
        <div className="container">
          <ul className="pt-2 pb-2">
            <li>
              <Link to="/">Inscripcion</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <h1>{JSON.stringify(user)}</h1> */}
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="card rounded-0">
              <div className="card-header">
                <h4> Asignatura </h4>
              </div>
              <div className="card-body">
                <Dropdown
                  handleOnChange={handleOnChangeSubject}
                  options={subjects}
                />
              </div>
            </div>
            <Sections sections={sections} />
            <div className="card rounded-0 mt-3">
              <div className="card-header">
                <div className="d-flex">
                  <h4> Mi Seleccion </h4>

                  <a className="btn btn-sm btn-primary" href="">
                    Imprimir
                  </a>
                </div>
              </div>
              <MySelection selection={selection} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card rounded-0">
              <div className="card-header">Recomendacion</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
