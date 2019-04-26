import React, { Component } from "react";

class WizardStepThird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNum: "(111) 222-3333"
    };
  }
  render() {
    return (
      <div className={"wizard-step"}>
        <h3 className={"link back"} onClick={this.props.onBackword}>
          <i className={"chevron left icon"} />
          Step 2
        </h3>
        <h1>Step 3</h1>
        <br />
        <div className={"ui text"}>
          <div className={"ui stripe segment aligned"}>
            <h3>You can now test by calling the following number</h3>
            <h1>{this.state.phoneNum}</h1>
            <br />
          </div>

          <div className={"ui stripe segment aligned"}>
            <button
              className={"ui button right floated large"}
              onClick={this.props.onForward}
            >
              Continue
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default WizardStepThird;
