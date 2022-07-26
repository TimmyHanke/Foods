import React, { Component } from "react";
import FakeFoods, { getFoods } from "../fakeFoodService";
import FakeCategory, { getCategories } from "../FakeCategoryService";
import Star from "../common/Star";
import Pagination from "../common/Pagination";
import ListGroup from "../common/ListGroup";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
  state = {
    foods: [],
    categories: [],
    pageSize: 4,
    selectedPage: 1,
    selectedCategory: DEFAULT_CATEGORY,
  };

  componentDidMount() {
    const categories = [DEFAULT_CATEGORY, ...getCategories()];
    this.setState({ foods: getFoods(), categories });
  }

  handleStar = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isFavorite = !foods[index].isFavorite;
    this.setState({ foods });
  };

  handlePageChange = (page) => this.setState({ selectedPage: page });

  handleCategorySelect = (category) =>
    this.setState({ selectedCategory: category });

  handleDelete = (id) => {
    let foods = this.state.foods.filter((food) => food._id !== id);

    this.setState({ foods });
  };

  render() {
    const { length: count } = this.state.foods;
    const { pageSize, selectedPage, categories, selectedCategory } = this.state;

    if (count === 0) {
      return <p>There are no foods in the database</p>;
    }
    return (
      <div className="row m4-4">
        <div className="col-2">
          <ListGroup
            items={categories}
            selectedItem={selectedCategory}
            onItemSelect={this.handleCategorySelect}
          />
        </div>
        <div className="col">
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
                    <Star
                      onStar={() => this.handleStar(food)}
                      isFavorite={food.isFavorite}
                    />
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

        <Pagination
          itemCount={count}
          pageSize={pageSize}
          selectedPage={selectedPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Foods;
