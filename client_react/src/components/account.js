import React, { Component } from "react";

import LoggedInHeader from "./headers/logged_in_header";
import SidebarMain from "./sidebar/sidebar_main";

import BriefInfo from "./account/brief_info";
import OutBound from "./account/outbound";
import APIToken from "./account/api_token";
import TriggerApp from "./account/trigger_app";
import DemoCode from "./account/demo_code";

class Account extends Component {
  render() {
    return (
      <div className={"bg-color-gray"}>
        <LoggedInHeader />
        <div className={"ui grid"}>
          <div className={"four wide column"} style={{ padding: "0" }}>
            <SidebarMain page={"account"} />
          </div>
          <div className={"ten wide column"} style={{ padding: "0" }}>
            <div className={"account"}>
              <h1>Account</h1>
              <BriefInfo />
              <OutBound />
              <APIToken />
              <TriggerApp />
              <DemoCode />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
