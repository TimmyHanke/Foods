import React, { Component } from "react";
import Star from "../common/Star";
import Table from "../common/Table";
import { Link, useParams } from "react-router-dom";
import auth from "../services/authService";

class foodstable extends Component {
  columns = [
    {
      label: "Name",
      path: "food",
      content: (food) => <Link to={"/foods/" + food._id}>{food.name}</Link>,
    },
    { label: "Category", path: "category.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Price", path: "price" },
    {
      key: "favorite",
      content: (item) => (
        <Star
          onStar={() => this.props.onStar(item)}
          isFavorite={item.isFavorite}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (item) => (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => this.props.onDelete(item._id)}
      >
        delete
      </button>
    ),
  };

  constructor() {
    super();

    const user = auth.getCurrentUser();

    if (user?.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { foods, sortColumn, onSort } = this.props;
    return (
      <Table
        data={foods}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default foodstable;
