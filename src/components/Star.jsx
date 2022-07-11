import React, { Component } from "react";
import Foods from "./Foods";

class Star extends Component {
  state = {
    star: true,
  };
  handleStar = () => {
    if (this.state.star === true) {
      this.setState({ star: false });
    } else this.setState({ star: true });
  };
  render() {
    const styles = {
      cursor: "pointer",
    };
    if (this.state.star === true) {
      return (
        <i
          style={styles}
          className="fa-regular fa-star"
          onClick={this.handleStar}
        ></i>
      );
    } else
      return (
        <i
          style={styles}
          className="fa-solid fa-star"
          onClick={this.handleStar}
        ></i>
      );
  }
}

export default Star;
