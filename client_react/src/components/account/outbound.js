import React, { Component } from "react";

class OutBound extends Component {
  constructor() {
    super();
    this.state = {
      currentMin: 469,
      limitMin: 600
    };
  }
  render() {
    return (
      <div>
        <div className={"ui text"}>
          <div className={"ui stripe segment aligned"}>
            <h3 className={"ui header"}>Free Outbound Minutes</h3>
            <p className={"word minute"}>
              <span>{this.state.currentMin}</span>
              min /&nbsp;
              <span>{this.state.limitMin}</span>
              min
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default OutBound;
