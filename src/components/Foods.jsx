import React, { Component } from "react";
import _, { filter, includes } from "lodash";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import ListGroup from "../common/ListGroup";
import { paginate } from "../utils/paginate";
import Foodstable from "./Foodstable";
import Form from "../common/Form";
import SearchBox from "../common/SearchBox";
import http from "../httpService";
import config from "../config.json";
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
    searchQuery: "",
    serverFoods: [],
  };

  async componentDidMount() {
    const serverCategories = await http.get(config.apiEndpointCategories);
    const serverFoods = await http.get(config.apiEndpointFoods);

    this.setState({
      foods: serverFoods.data,
      categories: [DEFAULT_CATEGORY, ...serverCategories.data],
    });
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
    this.setState({
      selectedCategory: category,
      selectedPage: 1,
      searchQuery: "",
    });

  handleDelete = async (id) => {
    let foods = this.state.foods.filter((food) => food._id !== id);
    this.setState({ foods });
    await http.delete(config.apiEndpointFoods + id);
  };

  handleSearch = (searchQuery) =>
    this.setState({ searchQuery, selectedCategory: DEFAULT_CATEGORY });

  getPaginatedFoods() {
    const {
      pageSize,
      selectedPage,
      searchQuery,
      selectedCategory,
      sortColumn,
      foods: allFoods,
    } = this.state;

    let filteredFoods = allFoods;

    if (selectedCategory._id) {
      filteredFoods = allFoods.filter(
        (f) => f.category._id === selectedCategory._id
      );
    } else if (searchQuery) {
      filteredFoods = allFoods.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sortedFoods = _.orderBy(
      filteredFoods,
      [sortColumn.path],
      [sortColumn.order]
    );
    const foods = paginate(sortedFoods, selectedPage, pageSize);
    return { foods, filteredCount: filteredFoods.length };
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
            <Link to="/foods/new" className="btn btn-primary">
              New Food
            </Link>
            <p>Showing {filteredCount} foods in the database</p>

            <SearchBox value={this.state.search} onChange={this.handleSearch} />

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
