import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import FoodForm from "../components/FoodForm";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  render() {
    const { columns, data } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={column.path || column.key}>
                {this.renderCell(item, column) === item.name ? (
                  <Link
                    to={
                      "FoodForm/" +
                      item._id +
                      "/" +
                      item.name +
                      "/" +
                      item.category.name +
                      "/" +
                      item.numberInStock +
                      "/" +
                      item.price
                    }
                  >
                    {this.renderCell(item, column)}
                  </Link>
                ) : (
                  this.renderCell(item, column)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
