import React, { Component } from "react";
import Link from "react-router-dom/Link";

class DemoCode extends Component {
  constructor() {
    super();
    this.state = {
      demoCodeIsOK: false,
      demoCode: ""
    };

    this.checkDemoCode = this.checkDemoCode.bind(this);
  }

  checkDemoCode(e) {
    this.setState({ demoCode: e.target.value });
    this.setState({
      demoCodeIsOK: true
    });
  }

  render() {
    let iconClass = "";
    if (this.state.demoCodeIsOK === true && this.state.demoCode !== "")
      iconClass = "icon link check circle large";
    return (
      <div>
        <div className={"ui text"}>
          <div className={"ui stripe segment aligned"}>
            <h3 className={"ui header"}>Demo Code</h3>
            <div className={"ui input fluid large icon"}>
              <input
                type={"text"}
                placeholder={"Type your Demo Code Here"}
                value={this.state.demoCode}
                onChange={this.checkDemoCode}
              />
              <i className={iconClass} />
            </div>
            <br />
            <Link to={"#"}>Don't have a Demo Code? Request One</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default DemoCode;
