import React, { Component } from "react";

import LoggedInHeader from "./headers/logged_in_header";
import SidebarMain from "./sidebar/sidebar_main";
import axios from "axios";
import NoCurrentApplication from "./appplications/no_current_applications";
import { CreateApplication } from "./appplications/create_application";

const serverApiUrl = "http://localhost:3000/api/applications";

class Applications extends Component {
  constructor() {
    super();
    this.state = {
      myApps: [],
      showApplications: false,
      createApp: false
    };
  }


  getMyApps = () => {
    axios
      .get(
        serverApiUrl,
        { email: sessionStorage.getItem("cpaas-email") },
        { headers: { Authorization: sessionStorage.getItem("cpaas-access-token") } }
      )
      .then(response => {
        const data = response.data;
        console.log('My Apps', data)
        if (data && data.length !== 0) {
          this.setState({
            myApps: data,
            // Commented out while the Create Application components are built
            // showApplications: true
          });
        }
      });
  }

  renderCreateAppComponent = () => {
    this.setState({ createApp: true })
  }

  componentDidMount() {
    this.getMyApps();
  }

  render() {
    let currentElement;
    const { showApplications, createApp } = this.state;
    if (!showApplications && !createApp)
      currentElement = (
        <>
          <h1>Applications</h1>
          {/* <i className="big circular icon plus" id="plus-icon"/> */}
          <NoCurrentApplication
            renderCreateAppComponent={this.renderCreateAppComponent}
          />
        </>
      );
    else if (createApp) {
      currentElement = (
        <>
          <h3 onClick={()=> {this.setState({ createApp: false})}} className="link back">
          <i className="icon chevron left"/>Applications
          </h3>
          {/* <i className="big circular icon plus" id="plus-icon"/> */}
          <CreateApplication
          />
        </>
      );
    }
    else {
      currentElement = (
        <>
          <h3>Your Applications here</h3>
        </>
      )
    }
    return (
      <div className={"bg-color-gray"}>
        <LoggedInHeader />
        <div className={"ui grid"}>
          <div className={"four wide column"} style={{ padding: "0" }}>
            <SidebarMain page={"apps"} />
          </div>
          <div className={"ten wide column"} style={{ padding: "0" }}>
            <div className={"phone-num"}>{currentElement}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Applications;
