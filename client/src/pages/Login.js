import React, { useState } from "react";
import "./Login.css";
import Api from "../utils/Api";
import { userService } from "../services/UserService";

const LoginPage = props => {
  userService.logout();

  const [email, setEmail] = useState("");

  const handleOnSubmit = event => {
    event.preventDefault();

    Api.post("users/login", { email: email })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/");
      })
      .catch();
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form
            className="login100-form validate-form"
            onSubmit={handleOnSubmit}
          >
            <span className="login100-form-title">Login</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                value={email}
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true" />
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
