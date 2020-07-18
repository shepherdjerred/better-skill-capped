import React from "react";
import {Link} from "react-router-dom";

export function Navbar() {
  return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href=".">
            Better Skill Capped
          </a>

          <div
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
          >
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
          </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/home" className="navbar-item">
              Home
            </Link>
            <Link to="/courses" className="navbar-item">
              Courses
            </Link>
          </div>
        </div>
      </nav>
  );
}
