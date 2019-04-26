import React, { Component } from "react";

class BriefInfo extends Component {
  constructor() {
    super();
    this.state = {
      currentPlan: "Free Trial Plan",
      subscriberID: "ADB33475CW"
    };
  }
  render() {
    return (
      <div>
        <div className={"ui text"}>
          <div className={"ui stripe segment aligned"}>
            <h3 className={"ui header"}>Current Plan</h3>
            <p>{this.state.currentPlan}</p>
            <h3 className={"ui header"}>Subscriber ID</h3>
            <p>{this.state.subscriberID}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default BriefInfo;
