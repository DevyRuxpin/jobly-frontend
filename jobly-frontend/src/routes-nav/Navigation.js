import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation() {
  const { currentUser, logout } = useAuth();

  function loggedInNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/companies">
              Companies
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/jobs">
              Jobs
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/" onClick={logout}>
              Log out {currentUser.username}
            </NavLink>
          </li>
        </ul>
    );
  }

  function loggedOutNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
      <nav className="Navigation navbar navbar-expand-md">
        <NavLink className="navbar-brand" to="/">
          Jobly
        </NavLink>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
  );
}

export default Navigation;
