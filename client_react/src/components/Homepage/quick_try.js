import React, { Component } from "react";
import Link from "react-router-dom/Link";

class QuickTry extends Component {
  render() {
    return (
      <div
        className={"ui vertical center aligned stripe"}
        style={{ backgroundColor: "#ddd" }}
      >
        <div className={"ui text container"}>
          <h1 className={"ui header"}>
            Build your first solution in less than 2min?
          </h1>
          <br />
          <Link to="/">
            <div className={"ui huge primary button"}>Try For Free</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default QuickTry;
