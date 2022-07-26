import React, { Component } from "react";

class Star extends Component {
  render() {
    const styles = {
      cursor: "pointer",
    };

    let classes = "fa-star fa-";
    classes += this.props.isFavorite ? "solid" : "regular";

    return (
      <i style={styles} className={classes} onClick={this.props.onStar}></i>
    );
  }
}

export default Star;
