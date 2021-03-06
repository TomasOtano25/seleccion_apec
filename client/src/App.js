import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import AdmissionPage from "./pages/Admission";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <PrivateRoute path="/" exact component={HomePage} />
          <Route path="/admission" component={AdmissionPage} />
          <Route path="/login" component={LoginPage} />
        </Router>
      </>
    );
  }
}

export default App;
