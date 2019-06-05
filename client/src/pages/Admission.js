import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import Axios from "axios";
/*Campos
nombre completo
email universitario
cedula
direccion
career (metodo getCareer)
*/

const SelectField = ({
  label,
  options,
  field,
  form: { touched, errors, setFieldValue }
}) => {
  return (
    <div className="form-group">
      <label htmlFor={field.name}>{label}</label>
      <Select
        options={options}
        name={field.name}
        value={
          options ? options.find(option => option.value === field.value) : ""
        }
        onChange={option => setFieldValue(field.name, option.value)}
        onBlur={field.onBlur}
      />
      {touched[field.name] && errors[field.name] && (
        <div style={{ color: "red", marginTop: ".5rem" }}>
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const AdmissionSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre es muy corto.")
    .max(128, "El nombre es muy largo.")
    .required("El nombre es un campo requerido."),
  email: Yup.string()
    .email("El valor debe ser un email valido.")
    .required("El email es un campo obligatorio."),
  sex: Yup.string().required("Debe seleccionar un sexo."),
  countryOrigin: Yup.string().required("Debe seleccionar un pais de origen."),
  ownEmail: Yup.string().email("El valor debe ser un email valido."),
  phone: Yup.string()
    .matches(phoneRegExp, "El número de celular o teléfono no es valido.")
    .required("El número de celular o teléfono es un campo obligatorio.")
});

const AdmissionPage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    Axios.get("https://restcountries.eu/rest/v2/all?fields=translations")
      .then(res => {
        const countries = res.data
          .map(country => {
            return {
              value: country.translations.es,
              label: country.translations.es
            };
          })
          .filter(country => country.value);
        console.log(countries);
        setCountries(countries);
      })
      .catch();
  }, []);

  return (
    <>
      <div className="pt-5 pb-5" style={{ backgroundColor: "#007bff" }}>
        <div className="container">
          <div className="card p-3 rounded-0">
            <h4>Admision - Registro</h4>
            <Formik
              initialValues={{
                name: "",
                email: "",
                identificationCard: "",
                sex: "",
                countryOrigin: "",
                ownEmail: "",
                phone: ""
              }}
              validationSchema={AdmissionSchema}
              onSubmit={({ sex, countryOrigin }, { setStatus }) => {
                console.log(sex + " " + countryOrigin);
                setStatus();
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Nombre Completo *</label>
                    <Field
                      name="name"
                      type="text"
                      className={
                        "form-control " +
                        (errors.name && touched.name ? "is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="matricula@unapec.edu.do"
                      className={
                        "form-control " +
                        (errors.email && touched.email ? "is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="identificationCard">Cédula</label>
                    <Field
                      name="identificationCard"
                      type="text"
                      className={"form-control"}
                    />
                    <ErrorMessage
                      name="identificationCard"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Direccion</label>
                    <Field
                      name="address"
                      type="text"
                      className={"form-control"}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <Field
                    label="Genero *"
                    name="sex"
                    component={SelectField}
                    options={[
                      { value: "M", label: "M" },
                      { value: "F", label: "F" }
                    ]}
                  />

                  <Field
                    label="Pais de origen *"
                    name="countryOrigin"
                    component={SelectField}
                    options={countries}
                  />

                  <div className="form-group">
                    <label htmlFor="ownEmail">Email Personal</label>
                    <Field
                      name="ownEmail"
                      type="email"
                      className={
                        "form-control " +
                        (errors.ownEmail && touched.ownEmail
                          ? "is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="ownEmail"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      Número de celular o teléfono *
                    </label>
                    <Field
                      name="phone"
                      type="text"
                      className={
                        "form-control " +
                        (errors.phone && touched.phone ? "is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Save
                    </button>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionPage;
