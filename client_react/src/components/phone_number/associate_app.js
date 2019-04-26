import React from "react";
import axios from "axios";

import { AppItem } from "./app_item";

const serverApiUrl = "http://localhost:3000/api";
const $ = window.$;

export class AssociateApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myApps: []
    };
  }

  onAssociateApp = () => {
    $(".ui.floating.dropdown").dropdown("show");
    if (this.props.isModalStyle) {
      this.getMyNumbers();
    }
  };

  getMyNumbers = () => {
    axios
      .post(
        serverApiUrl + "/phone_numbers/get-my-numbers",
        {
          email: sessionStorage.getItem("cpaas-email")
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("cpaas-access-token")
          }
        }
      )
      .then(response => {
        let data = response.data.list;
        const number = data.find(num => num.e164 === this.props.selectedNumber);
        this.setState({ number });
      });
  };

  getMyApps = () => {
    axios
      .get(
        `${serverApiUrl}/applications`,
        { email: sessionStorage.getItem("cpaas-email") },
        {
          headers: {
            Authorization: sessionStorage.getItem("cpaas-access-token")
          }
        }
      )
      .then(response => {
        const myApps = response.data;
        console.log("My Apps", myApps);
        if (myApps && myApps.length !== 0) {
          this.setState({ myApps });
        }
      });
  };

  associateAppWithNumber = id => {
    console.log("props", this.props, "STATE", this.state);
    const num = this.props.isModalStyle
      ? this.state.number
      : this.props.selectedNumber;
    axios
      .patch(
        `${serverApiUrl}/phone_numbers`,
        { email: sessionStorage.getItem("cpaas-email") },
        {
          headers: {
            Authorization: sessionStorage.getItem("cpaas-access-token")
          },
          data: {
            application_id: id,
            e164: num.e164,
            id: num.id,
            is_shared: num.is_shared,
            subscriber_id: num.subscriber_id,
            telecomId: num.telecomId,
            telecom_id: num.telecom_id
          }
        }
      )
      .then(response => {
        const data = response.data;
        console.log("phone numbers", data);
      });
    this.props.updateList();
  };

  componentDidMount() {
    this.getMyApps();
  }

  render() {
    const { isModalStyle } = this.props;
    const appOptions = this.state.myApps.length ? (
      this.state.myApps.map(app => {
        return (
          <div
            className="item"
            style={{
              width: "320px",
              height: app.dialogflow_id && app.callback_url ? "120px" : "80px"
            }}
            onClick={() => this.associateAppWithNumber(app.id)}
            key={app.id}
          >
            <span style={appName}>{app.name}</span>
            <br />
            <AppItem app={app} />
          </div>
        );
      })
    ) : (
      <div className="item" style={{ width: "280px" }}>
        You have no apps
      </div>
    );

    return (
      <button
        className={
          isModalStyle
            ? "ui button large fluid"
            : "ui dropdown button right floated large"
        }
        style={isModalStyle ? {} : styleButton}
        id={"button"}
        onClick={this.onAssociateApp}
        disabled={this.props.disabled}
      >
        Associate an App
        <div
          className="ui floating right floated dropdown"
          style={isModalStyle ? modalStyles : menuStyles}
        >
          <div className="menu">{appOptions}</div>
        </div>
      </button>
    );
  }
}

const styleButton = {
  margin: "1em",
  top: "10%",
  bottom: "10%"
};

const menuStyles = {
  position: "absolute",
  left: "0%",
  fontFamily: "Working Sans",
  top: "40%",
  bottom: "38.2%",
  marginTop: "20px",
  boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.12), 0px 0px 8px rgba(0, 0, 0, 0.12)",
  borderRadius: "4px"
};

const modalStyles = {
  position: "absolute",
  left: "4%",
  fontFamily: "Working Sans",
  top: "40%",
  bottom: "38.2%",
  marginTop: "20px",
  boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.12), 0px 0px 8px rgba(0, 0, 0, 0.12)",
  borderRadius: "4px"
};

const appName = {
  fontFamily: "Work Sans",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "24px",
  fontSize: "16px",
  color: "#565656"
};
