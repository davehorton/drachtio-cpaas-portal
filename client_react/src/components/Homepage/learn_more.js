import React, { Component } from "react";
import { Link } from "react-router-dom";
import WhiteImage from "../../white-image.png";

class LearnMore extends Component {
  render() {
    return (
      <div className={"ui vertical stripe"}>
        <div className={"ui middle aligned stackable grid container"}>
          <div className={"six wide column"}>
            <h1 className={"ui header"}>Open-source Technology</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <Link to="/#">Learn More(?)</Link>
          </div>
          <div className={"eight wide right floated column"}>
            <img
              src={WhiteImage}
              className={"ui large bordered rounded image"}
              alt={"learn more"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LearnMore;
