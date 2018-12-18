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
    // let classDashboard = "item";
    // let classAccount = "item";
    // let classPhoneNum = "item ";
    // let classApps = "item";
    let classDashboard = "";
    let classAccount = "";
    let classPhoneNum = " ";
    let classApps = "";
    console.log("PROPS", this.props);
    switch (this.props.page) {
      case "dashboard":
        classDashboard += " active";
        break;
      case "account":
        classAccount += " active";
        break;
      case "phone_num":
        classPhoneNum += " active";
        break;
      case "apps":
        classApps += " active";
        break;
      default:
        break;
    }
    return (
      <div className={"ui left vertical menu sidebar-left"} style={{ fontSize: "16px" }}>
        <ul>
          <div className={classDashboard} style={{ boxDirection: "none" }}>
            <Link to={"dashboard"} className={"sidebar-text"} id={`${classDashboard === "" ? "" : "active-panel"}`}>
              <i className="icon tachometer alternate side-icons" style={{ marginRight: "12px" }} />
              Dashboard
            </Link>
          </div>
          <div className={classAccount}>
            <Link to={"account"} className={"sidebar-text"} id={`${classAccount === "" ? "" : "active-panel"}`}>
              <i className="icon sliders horizontal side-icons" style={{ marginRight: "12px" }} />
              Account
            </Link>
          </div>
          <div className={classPhoneNum}>
            <Link to={"phone_num"} className={"sidebar-text"} id={`${classPhoneNum === "" ? "" : "active-panel"}`}>
              <i className="icon phone side-icons" style={{ marginRight: "12px" }} />
              Phone Numbers
            </Link>
          </div>
          <div className={classApps}>
            <Link to={"apps"} className={"sidebar-text"} id={`${classApps === "" ? "" : "active-panel"}`}>
              <i className="icon th large side-icons" style={{ marginRight: "12px" }} />
              Applications
            </Link>
          </div>
        </ul>
      </div>
    );
  }
}

export default SidebarMain;
