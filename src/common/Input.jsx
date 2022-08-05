import React from "react";
import { Link, NavLink } from "react-router-dom";

function Input({ label, path }) {
  return (
    <div>
      <li className="nav-item" />
      <NavLink className="nav-link" to={path}>
        {label}
      </NavLink>
    </div>
  );
}

export default Input;
