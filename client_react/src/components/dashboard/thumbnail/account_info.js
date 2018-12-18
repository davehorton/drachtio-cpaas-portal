import React, { Component } from "react";
import axiosAuth from '../../../utils/axios'

const serverApiUrl = "http://localhost:3000/api/subscribers/";
class AccountInfo extends Component {
  constructor() {
    super();
    this.state = {
      info: {
        email: "",
        subscriberID: "",
        current_plan: ""
      }
    };
    this.getAccountInfo = this.getAccountInfo.bind(this);
  }

  componentWillMount() {
    this.getAccountInfo();
  }

  getAccountInfo() {
    axiosAuth()
      .get(`${serverApiUrl}me`)
      .then(response => this.setState({info: response.data}));
  }

  render() {
    return (
      <div>
        <div className={"ui text"}>
          <div className={"ui stripe segment signup aligned"}>
            <h2 className={"ui header"}>Account Information</h2>
            <br />
            <div className={"ui vertical"}>
              <div className={"ui middle aligned stackable grid"}>
                <div className={"five wide column"}>
                  <p>
                    email : <b>{this.state.info.email}</b>
                  </p>
                </div>
                <div className={"five wide column"}>
                  <p>
                    SubscriberID : <b>{this.state.info.subscriberID}</b>
                  </p>
                </div>
                <div className={"five wide column"}>
                  <p>
                    Current Plan : <b>{this.state.info.current_plan}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountInfo;
