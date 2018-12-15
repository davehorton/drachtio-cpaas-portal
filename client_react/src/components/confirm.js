import React, { Component } from "react";
import NormalHeader from "./headers/normal_header";

class Confirmation extends Component {
  constructor() {
    super();
    this.state = {
      pwdVisible: false,
      email: "",
      pwd: ""
    };
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#ddd"
        }}
      >
        <NormalHeader activeTab={""} />
        <div className={"ui text container"} style={{ marginTop: "5rem" }}>
          <div className={"ui stripe segment signup center aligned"}>
            <h1>Confirmation</h1>
            <br />
            <p className={"custom-icon check large"}>
              <span />
            </p>
            <p>You will soon receive an email.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirmation;
