import React, { Component } from "react";
import Navigation from "./common/Navigation";
import Foods from "./components/Foods";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import FoodForm from "./components/FoodForm";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <div className="container mt-4">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/Register" component={RegisterForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/orders" component={Orders} />
            <Route path="/foods/new" component={FoodForm} />
            <Route
              path="/FoodForm/:id/:name/:category/:numberInStock/:price"
              component={FoodForm}
            />
            <Route path="/not-found" component={NotFound} />
            <Route path="/Foods" component={Foods} />
            <Route exact path="/" component={Foods} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
