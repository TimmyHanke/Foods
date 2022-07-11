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
    let classes = "fa-star ";
    classes += this.state.star === true ? "fa-regular" : "fa-solid";

    return <i style={styles} className={classes} onClick={this.handleStar}></i>;
  }
}

export default Star;
