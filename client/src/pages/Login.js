import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Login.css";
import Api from "../utils/Api";
import { userService } from "../services/UserService";

const phoneRegExp = /^[\w]+@unapec\.edu\.do$/;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Debe proveer un email valido")
    .matches(phoneRegExp, "Debe terminar con @unapec.edu.do")
    .required("El email es obligatorio")
});

const LoginPage = props => {
  userService.logout();

  const handleOnSubmit = ({ email }, { setStatus, setSubmitting }) => {
    setStatus();
    Api.post("users/login", { email: email })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/");
      })
      .catch(err => {
        setSubmitting(false);
        setStatus("Email invalido");
      });
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="mb-4">
            <img
              src="https://cdn.unapec.edu.do/portal-dynamic/Documentos/descargas/logo_principal/logo-unapec_color.png"
              width={275}
              height="auto"
            />
          </div>
          <Formik
            data-testid="formik"
            initialValues={{ email: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleOnSubmit}
            render={({ errors, status, touched, isSubmitting }) => (
              <Form className="login100-form validate-form">
                <span className="login100-form-title">Iniciar sesión</span>
                <div
                  className={
                    "wrap-input100 validate-input " +
                    (errors.email && touched.email ? "alert-validate" : "")
                  }
                  data-validate={errors.email}
                >
                  <Field
                    className="input100"
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fas fa-envelope" aria-hidden="true" />
                  </span>
                </div>

                {!isSubmitting ? (
                  <div className="container-login100-form-btn">
                    <button
                      type="submit"
                      className="login100-form-btn"
                      disabled={isSubmitting}
                      data-testid="submit-button"
                    >
                      <span>Login</span>
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  </div>
                )}
                {status && (
                  <div className="alert alert-danger mt-3 rounded-0">
                    {status}
                  </div>
                )}
              </Form>
            )}
          />

          <div className="mt-2">
            <Link to="/admission">Registrar</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
