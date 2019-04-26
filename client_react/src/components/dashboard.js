import React, { Component } from "react";

import LoggedInHeader from "./headers/logged_in_header";
import SidebarMain from "./sidebar/sidebar_main";

import Wizard from "./dashboard/wizard";

import AddYourNumber from "./dashboard/thumbnail/add_your_number";
import AccountInfo from "./dashboard/thumbnail/account_info";
import PhoneNumbers from "./dashboard/thumbnail/phone_numbers";
import Applications from "./dashboard/thumbnail/applications";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      firstLogIn: true,
      showWizard: true,
      user: ""
    };
    this.wizardSkipped = this.wizardSkipped.bind(this);
  }

  componentDidMount() {
    let email = sessionStorage.getItem("cpaas-email");
    if (!email) {
      console.log("no session");
      this.props.history.push("/");
    } else {
      console.log("welcome", email);
      this.setState({
        user: email
      });
    }
  }
  wizardSkipped() {
    console.log("wizard skipped");
    this.setState({ showWizard: false });
    console.log(this.state);
  }

  logout() {
    this.props.history.push("/");
  }
  render() {
    let currentElement;
    if (this.state.showWizard === true)
      currentElement = (
        <Wizard
          onSkipped={this.wizardSkipped}
          onCompleted={() => {
            this.setState({ showWizard: false });
          }}
        />
      );
    else
      currentElement = (
        <div className={"thumbnails"}>
          <h1>Dashboard</h1>
          <AddYourNumber />
          <AccountInfo />
          <PhoneNumbers />
          <Applications />
        </div>
      );

    return (
      <div className={"bg-color-gray"}>
        <LoggedInHeader logout={this.logout.bind(this)} />
        <div className={"ui grid"}>
          <div className={"four wide column"} style={{ padding: "0" }}>
            <SidebarMain page={"dashboard"} />
          </div>
          <div className={"ten wide column"} style={{ padding: "0" }}>
            <div className={"dashboard"}>{currentElement}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
