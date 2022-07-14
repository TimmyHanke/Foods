import React, { Component } from "react";

class Pagination extends Component {
  state = {
    page1: true,
    page2: false,
    page3: false,
  };
  handlePagination = () => {
    if (this.state.page1 === false) {
      this.setState({ page1: true, page2: false, page3: false });
    }
  };
  handlePagination2 = () => {
    if (this.state.page2 === false) {
      this.setState({ page2: true, page1: false, page3: false });
    }
  };
  handlePagination3 = () => {
    if (this.state.page3 === false) {
      this.setState({ page3: true, page1: false, page2: false });
    }
  };
  render() {
    const styles = {
      cursor: "pointer",
    };
    const { page1, page2, page3 } = this.state;
    let classes1 = "page-item ";
    classes1 += page1 === true ? " active " : " disabled";
    let classes2 = "page-item ";
    classes2 += page2 === true ? " active " : " disabled";
    let classes3 = "page-item ";
    classes3 += page3 === true ? " active " : " disabled";

    return (
      <div>
        <nav aria-label="...">
          <ul style={styles} class="pagination pagination-sm">
            <li className={classes1} onClick={this.handlePagination}>
              <span className="page-link">1</span>
            </li>
            <li className={classes2} onClick={this.handlePagination2}>
              <span className="page-link">2</span>
            </li>
            <li className={classes3} onClick={this.handlePagination3}>
              <span className="page-link">3</span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;
