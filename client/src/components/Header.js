import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Unapec
          </a>
          <Link className="btn btn-primary" to="/login">
            Logout
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
