import React, { Component } from "react";
import { Link } from "react-router-dom";

class FoodForm extends Component {
  render() {
    return (
      <div>
        <h1>Food Form - {this.props.match.params.id} </h1>
        <Link to="foods">
          <button type="button" class="btn btn-primary">
            Save
          </button>
        </Link>
      </div>
    );
  }
}

export default FoodForm;
