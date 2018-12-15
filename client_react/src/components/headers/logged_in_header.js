import React, { Component } from "react";
import { Link } from "react-router-dom";

const $ = window.$;

class LoggedInHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab,
      userName: ""
    };
    this.tryLogout = this.tryLogout.bind(this);
  }

  componentDidMount() {
    let email = sessionStorage.getItem("cpaas-email");
    let name = sessionStorage.getItem("cpaas-name");
    console.log(email, name);
    if (name === null || name === "") {
      this.setState({
        userName: email
      });
    } else
      this.setState({
        userName: name
      });
    $(".ui.dropdown").dropdown();
  }

  tryLogout() {
    console.log("try to log out");
    sessionStorage.removeItem("cpaas-email");
    sessionStorage.removeItem("cpaas-name");
    // this.props.history.push('/');
    window.location.href = "/";
  }
  render() {
    let classNavDocs = "item ";

    if (this.state.activeTab === "docs") classNavDocs += "active";
    return (
      <div
        className={"ui large top huge menu transition visible"}
        style={{ display: "flex" }}
      >
        <div className={"ui container"}>
          <Link to="/" className={"item"}>
            CPAAS
          </Link>
          <div className={"right menu"}>
            <Link to="/documentation" className={classNavDocs}>
              Documentation
            </Link>
            <div className={"ui item dropdown"}>
              <div className={"text"}>{this.state.userName}</div>
              <i className={"dropdown icon"} />
              <div className={"menu"}>
                <div className={"item"} onClick={this.tryLogout}>
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoggedInHeader;
