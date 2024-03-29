import React from "react";
import { Link } from "react-router-dom";
import Input from "./Input";

function Navigation({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="navbar-nav mt-3">
        <ul className="disabled">
          <Link to="/" className="nav-link">
            Intensinve Foods
          </Link>
        </ul>
      </div>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-2">
          <Input label={"Foods"} path={"/"} />
          <Input label={"Customers"} path={"/customers"} />
          <Input label={"Orders"} path={"/orders"} />
          {!user && (
            <>
              <Input label={"Login"} path={"/login"} />
              <Input label={"Register"} path={"/register"} />
            </>
          )}
          {user && (
            <>
              <Input label={user.name} path={"/profile"} />
              <Input label={"Logout"} path={"/logout"} />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
