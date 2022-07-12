import React, { Component } from "react";

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
    let classes = "fa-star fa-";
    classes += this.state.star === true ? "regular" : "solid";

    return <i style={styles} className={classes} onClick={this.handleStar}></i>;
  }
}

export default Star;
