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
import Logout from "./common/Logout";
import auth from "./services/authService";
import ProtectedRoute from "./common/ProtectedRoute";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }
  render() {
    const { user } = this.state;
    return (
      <>
        <Navigation user={user} />
        <div className="container mt-4">
          <Switch>
            <ProtectedRoute path="/foods/:id" component={FoodForm} />
            <Route
              path="/foods"
              render={(props) => <Foods {...props} user={user} />}
            />
            <Route path="/foods" component={Foods} />
            <Route path="/orders" component={Orders} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/customers" component={Customers} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <Redirect exact from="/" to="/foods" />
            <Redirect exact to="/not-found" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
