import React from "react";
import axios from "axios";

const serverApiUrl = "http://localhost:3000/api";
const $ = window.$;

const styleButton = {
  margin: "1rem"
};

export class AssociateApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myApps: []
    };
  }

  onAssociateApp = () => {
    $(".ui.floating.dropdown").dropdown("show");
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
        const data = response.data;
        console.log("My Apps", data);
        if (data && data.length !== 0) {
          this.setState({ myApps: data });
        }
      });
  };

  associateAppWithNumber = id => {
    console.log("props", this.props);
    const num = this.props.selectedNumber;
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
        console.log("My Apps", data);
        // $('.ui.dropdown').dropdown({
        //   onAdd: () => {
        //     $('.dropdown').blur();
        //   }
        // });
      });
    this.props.updateList();
  };

  componentDidMount() {
    this.getMyApps();
  }

  render() {
    console.log("state", this.state, "PROPS", this.props);
    const appOptions = this.state.myApps.map(app => {
      return (
        <div
          className="item"
          style={{ width: "170px" }}
          onClick={() => this.associateAppWithNumber(app.id)}
          key={app.id}
        >
          {app.name}
        </div>
      );
    });

    return (
      <button
        className={"ui dropdown button right floated large"}
        style={styleButton}
        id={"button"}
        onClick={this.onAssociateApp}
        disabled={this.props.disabled}
      >
        Associate an App
        <div className="ui floating right floated dropdown" style={menuStyles}>
          <div className="menu">{appOptions}</div>
        </div>
      </button>
    );
  }
}

const menuStyles = {
  position: "absolute",
  left: "0%",
  fontFamily: "Working Sans",
  top: "40%",
  bottom: "38.2%",
  marginTop: "20px",
  boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.12), 0px 0px 8px rgba(0, 0, 0, 0.12)",
  borderRadius: "4px",
  zIndex: "10",
  opacity: "1.0"
};
