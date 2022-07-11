import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React, { Component } from "react";
import FakeFoods, { getFoods } from "../fakeFoodService";
import Star from "./Star";

class Foods extends Component {
  state = {
    foods: getFoods(),
  };

  handleDelete = (id) => {
    let foods = this.state.foods.filter((food) => food._id !== id);

    this.setState({ foods });
  };

  render() {
    const { length: count } = this.state.foods;

    if (count === 0) {
      return <p>There are no foods in the database</p>;
    }
    return (
      <div>
        <p>Showing {count} foods in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category.name}</td>
                <td>{food.numberInStock}</td>
                <td>{food.price}</td>
                <td>
                  <Star />
                </td>
                <td>
                  {
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(food._id)}
                    >
                      delete
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Foods;
