import React from "react";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames/bind";

interface NavbarState {
  isVisible: boolean;
}

export class Navbar extends React.Component<unknown, NavbarState> {
  constructor(props: Readonly<unknown>) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  handleClick() {
    this.setState((prev: NavbarState) => {
      return {
        isVisible: !prev.isVisible,
      };
    });
  }

  render() {
    const navbarMenuClasses = classNames({
      "navbar-menu": true,
      "is-active": this.state.isVisible,
    });

    const navbarBurgerClasses = classNames({
      "navbar-burger": true,
      burger: true,
      "is-active": this.state.isVisible,
    });

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Better Skill Capped
          </Link>

          <div
            role="button"
            className={navbarBurgerClasses}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
            onClick={this.handleClick.bind(this)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </div>

        <div id="navbar" className={navbarMenuClasses}>
          <div className="navbar-start">
            <NavLink to="/" className="navbar-item" activeClassName="is-active" exact={true}>
              Home
            </NavLink>
            <NavLink to="/about" className="navbar-item" activeClassName="is-active">
              About
            </NavLink>
            <NavLink to="/courses" className="navbar-item" activeClassName="is-active">
              Courses
            </NavLink>
            <NavLink to="/videos" className="navbar-item" activeClassName="is-active">
              Videos
            </NavLink>
            <NavLink to="/bookmarks" className="navbar-item" activeClassName="is-active">
              Bookmarks
            </NavLink>
            <NavLink to="/stats" className="navbar-item" activeClassName="is-active">
              Stats
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
