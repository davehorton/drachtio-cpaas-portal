import React, { Component } from "react";
import { Link } from "react-router-dom";

class SidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.page
    };
  }

  componentWillMount() {
    console.log("side bar active tab is ", this.props.page);
  }

  render() {
    const iconStyles = {
      marginRight: "16px",
      height: "20px",
      width: "20px"
    };

    const listItemStlyes = {
      borderLeftColor: "#d91c5c",
      borderLeftWidth: "16px",
      borderLeftStyle: "solid",
      paddingLeft: "25px"
    };

    let classDashboard = "";
    let classAccount = "";
    let classPhoneNum = "";
    let classApps = "";
    switch (this.props.page) {
      case "dashboard":
        classDashboard = "active";
        break;
      case "account":
        classAccount = "active";
        break;
      case "phone_num":
        classPhoneNum = "active";
        break;
      case "apps":
        classApps = "active";
        break;
      default:
        break;
    }
    return (
      <div
        className={"ui left vertical menu sidebar-left"}
        style={{ fontSize: "16px", width: "240px", height: "1000px" }}>
        <br />
        &nbsp;&nbsp;
        <div className={classDashboard} style={classDashboard === "" ? { paddingLeft: "35px" } : listItemStlyes}>
          <Link to={"dashboard"} className={"sidebar-text"} id={`${classDashboard === "" ? "" : "active"}`}>
            <i className="icon tachometer alternate side-icons" style={iconStyles} />
            Dashboard
          </Link>
        </div>
        <br />
        &nbsp;&nbsp;
        <div className={classAccount} style={classAccount === "" ? { paddingLeft: "35px" } : listItemStlyes}>
          <Link to={"account"} className={"sidebar-text"} id={`${classAccount === "" ? "" : "active"}`}>
            <i className="icon sliders horizontal side-icons" style={iconStyles} />
            Account
          </Link>
        </div>
        <br />
        &nbsp;&nbsp;
        <div className={classPhoneNum} style={classPhoneNum === "" ? { paddingLeft: "35px" } : listItemStlyes}>
          <Link to={"phone_num"} className={"sidebar-text"} id={`${classPhoneNum === "" ? "" : "active"}`}>
            <i className="icon phone side-icons" style={iconStyles} />
            Phone Numbers
          </Link>
        </div>
        <br />
        &nbsp;&nbsp;
        <div className={classApps} style={classApps === "" ? { paddingLeft: "35px" } : listItemStlyes}>
          <Link to={"apps"} className={"sidebar-text"} id={`${classApps === "" ? "" : "active"}`}>
            <i className="icon th large side-icons" style={iconStyles} />
            Applications
          </Link>
        </div>
      </div>
    );
  }
}

export default SidebarMain;
