import React, { Component } from "react";

import LoggedInHeader from "./headers/logged_in_header";
import SidebarMain from "./sidebar/sidebar_main";

class Applications extends Component {
  render() {
    return (
      <div className={"bg-color-gray"}>
        <LoggedInHeader />
        <div className={"ui grid"}>
          <div className={"four wide column"} style={{ padding: "0" }}>
            <SidebarMain page={"apps"} />
          </div>
          <div className={"ten wide column"} style={{ padding: "0" }}>
            <div className={"applications"}>
              <h1>Applications</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Applications;
