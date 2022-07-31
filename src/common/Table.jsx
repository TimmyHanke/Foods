import React from "react";
import TableBody from "../common/TableBody";
import TableHeader from "../common/TableHeader";

function Table({ columns, sortColumn, onSort, data }) {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;
