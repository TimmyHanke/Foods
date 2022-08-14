import React, { Component } from "react";
import _, { filter, includes } from "lodash";
import { Link } from "react-router-dom";
import FakeFoods, { getFoods } from "../fakeFoodService";
import FakeCategory, { getCategories } from "../FakeCategoryService";
import Pagination from "../common/Pagination";
import FormInput from "../common/FormInput";
import ListGroup from "../common/ListGroup";
import { paginate } from "../utils/paginate";
import Foodstable from "./Foodstable";
import Form from "../common/Form";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Form {
  state = {
    foods: [],
    categories: [],
    selectedPage: 1,
    pageSize: 4,
    selectedCategory: DEFAULT_CATEGORY,
    sortColumn: { path: "name", order: "asc" },
    path: "",
    search: "",
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
  handleSort = (sortColumn) => this.setState({ sortColumn });

  handlePageChange = (page) => this.setState({ selectedPage: page });

  handleCategorySelect = (category) =>
    this.setState({ selectedCategory: category, selectedPage: 1 });

  handleDelete = (id) => {
    let foods = this.state.foods.filter((food) => food._id !== id);

    this.setState({ foods });
  };

  handleSearch = (e) => {
    this.state.selectedCategory = DEFAULT_CATEGORY;
    let search = e.target.value;
    this.setState({ search });
  };

  getPaginatedFoods() {
    const {
      pageSize,
      selectedPage,
      selectedCategory,
      sortColumn,
      foods: allFoods,
    } = this.state;

    let filteredFoods = selectedCategory._id
      ? allFoods.filter(
          (f) =>
            f.category._id === selectedCategory._id && this.state.search === ""
        )
      : allFoods;

    filteredFoods = filteredFoods.filter((f) =>
      f.name.toLowerCase().includes(this.state.search.toLowerCase())
    );

    const sortedFoods = _.orderBy(
      filteredFoods,
      [sortColumn.path],
      [sortColumn.order]
    );
    const foods = paginate(sortedFoods, selectedPage, pageSize);
    let main = allFoods;
    if (filteredFoods.length >= 1) {
      return { foods, filteredCount: filteredFoods.length };
    }
  }

  render() {
    const {
      pageSize,
      selectedPage,
      categories,
      selectedCategory,
      sortColumn,
      foods: allFoods,
    } = this.state;
    const { length: count } = allFoods;

    if (count === 0) return <p>There are no foods in the database</p>;

    const { foods, filteredCount } = this.getPaginatedFoods();

    if (filteredCount === 0) {
      this.setState({ selectedCategory: DEFAULT_CATEGORY });
    }
    return (
      <div>
        <div className="row m4-4">
          <div className="col-2">
            <ListGroup
              items={categories}
              selectedItem={selectedCategory}
              onItemSelect={this.handleCategorySelect}
            />
          </div>
          <div className="col">
            <Link to="/foods/new">
              <div className="btn btn-primary">New Food</div>
            </Link>
            <p>Showing {filteredCount} foods in the database</p>
            <FormInput
              foods={this.state.foods}
              type="form-control"
              onChange={this.handleSearch}
            />

            <Foodstable
              foods={foods}
              onStar={this.handleStar}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemCount={filteredCount}
              pageSize={pageSize}
              selectedPage={selectedPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Foods;
