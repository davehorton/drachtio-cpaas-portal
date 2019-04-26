import React, { Component } from "react";

class TriggerApp extends Component {
  constructor() {
    super();
    this.state = {
      currentApps: "Application_Name"
    };
  }
  render() {
    return (
      <div>
        <div className={"ui text"}>
          <div className={"ui stripe segment aligned"}>
            <h3 className={"ui header"}>
              Calls from your mobile phone will trigger this app:
            </h3>
            <p>{this.state.currentApps}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TriggerApp;
