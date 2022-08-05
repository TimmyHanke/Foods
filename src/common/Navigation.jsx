import React from "react";
import Input from "./Input";

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="mx-2">Intensive Foods</div>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-2">
          <Input label={"Foods"} path={"/"} />
          <Input label={"Customers"} path={"customers"} />
          <Input label={"Orders"} path={"orders"} />
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
