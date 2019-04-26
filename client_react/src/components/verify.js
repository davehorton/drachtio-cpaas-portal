import React, { Component } from "react";
import NormalHeader from "../components/headers/normal_header";
import axios from "axios";
const serverApiUrl = "http://localhost:3000/api/subscribers/";

class VerifyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.match.params.id,
      urlExist: ""
    };
    console.log("verify url is ", this.state.url);
    this.checkURL = this.checkURL.bind(this);
    this.continue = this.continue.bind(this);
  }

  componentWillMount() {
    this.checkURL();
  }

  checkURL() {
    axios
      .request({
        method: "post",
        url: serverApiUrl + "verify-url",
        data: {
          url: this.state.url
        }
      })
      .then(response => {
        let res = response.data.status;
        console.log(res);
        this.setState({
          urlExist: res.exist,
          data: res.data
        });
      });
  }

  continue() {
    sessionStorage.setItem("cpaas-email", this.state.data.email);
    this.props.history.push("/dashboard");
  }

  render() {
    let currentComponent;
    if (this.state.urlExist === true)
      currentComponent = (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#ddd",
            paddingTop: "10%"
          }}
        >
          <NormalHeader activeTab={""} />
          <div className={"ui text container"} style={{ marginTop: "5rem" }}>
            <div className={"ui stripe segment signup center aligned"}>
              <h1>Account activated</h1>
              <br />
              <p>Let's proceed with the configuration</p>
              <br />
              <div className={"ui button fluid"} onClick={this.continue}>
                Continue
              </div>
            </div>
          </div>
        </div>
      );
    else
      currentComponent = (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#ddd",
            paddingTop: "10%"
          }}
        >
          <NormalHeader activeTab={""} />
          <div className={"ui text container"} style={{ marginTop: "5rem" }}>
            <div className={"ui stripe segment signup center aligned"}>
              <h1>Sorry, Account not activated</h1>
            </div>
          </div>
        </div>
      );
    return <div>{currentComponent}</div>;
  }
}

export default VerifyForm;
