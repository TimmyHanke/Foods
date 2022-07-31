import React, { Component } from "react";
import Star from "../common/Star";
import Table from "../common/Table";

class foodstable extends Component {
  columns = [
    { label: "Name", path: "name" },
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
    {
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
    },
  ];
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
