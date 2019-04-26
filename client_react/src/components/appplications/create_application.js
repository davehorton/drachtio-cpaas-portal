import React, { Component } from "react";
import GDF_Grey from "../../images/Assets_14JAN2019/Icons_Grey/GDF_Grey.png";
import GDF_Pink from "../../images/Assets_14JAN2019/Icons_Pink/GDF_Pink.png";
import Webcallback_Grey from "../../images/Assets_14JAN2019/Icons_Grey/Webcallback_Grey.png";
import Webcallback_Pink from "../../images/Assets_14JAN2019/Icons_Pink/Webcallback_Pink.png";
import GDF_Web_Grey from "../../images/Assets_14JAN2019/Icons_Grey/GDF_Web_Grey.png";
import GDF_Web_Pink from "../../images/Assets_14JAN2019/Icons_Pink/GDF_Web_Pink.png";

export class CreateApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 0
    };
  }

  onSelect = option => {
    this.setState({ selectedOption: option });
  };

  onNameChange = event => {
    this.setState({ appName: event.target.value });
  };

  onURLChange = event => {
    this.setState({ url: event.target.value });
  };

  render() {
    console.log("STATE", this.state);
    const { selectedOption } = this.state;
    return (
      <>
        <h1>Create a new application</h1>
        <div
          className={"ui stripe segment aligned"}
          style={{ height: "136px", padding: "3em" }}
        >
          <div
            className="ui left aligned container"
            style={{ fontSize: "20px", marginBottom: "20px" }}
          >
            Name your application
          </div>
          <div className="ui input" style={{ width: "95%" }}>
            <input
              type="text"
              placeholder="My App...."
              onChange={this.onNameChange}
            />
          </div>
        </div>
        <div className={"ui stripe segment aligned"} style={style}>
          <div
            className="ui left aligned container"
            style={{ fontSize: "20px", marginBottom: "20px" }}
          >
            Select your application type
          </div>
          <div className="ui vertically divided grid">
            <div className="three column row">
              <div className="column">
                <div
                  className="ui stripe segment center aligned"
                  style={selectedOption === 1 ? selectedAppStyle : appStyle}
                  onClick={() => this.onSelect(1)}
                >
                  <div style={{ height: "30%" }}>
                    <img
                      src={
                        selectedOption === 1
                          ? Webcallback_Pink
                          : Webcallback_Grey
                      }
                      alt="callback icon"
                      style={callbackStyle}
                    />
                  </div>
                  <h4 style={titleStyle}>Web Callback</h4>
                  <p style={textStyle}>
                    Incoming calls will connect to your web callback and allow
                    you to control the call
                  </p>
                </div>
              </div>
              <div className="column">
                <div
                  className="ui stripe segment center aligned"
                  style={selectedOption === 2 ? selectedAppStyle : appStyle}
                  onClick={() => this.onSelect(2)}
                >
                  <div style={{ height: "30%" }}>
                    <img
                      src={selectedOption === 2 ? GDF_Pink : GDF_Grey}
                      alt="google dialog icon"
                      style={dialogStyle}
                    />
                  </div>
                  <h4 style={titleStyle}>Google Dialogflow</h4>
                  <p style={textStyle}>
                    Incoming calls will be connected to your dialogflow project
                  </p>
                </div>
              </div>
              <div className="column">
                <div
                  className="ui stripe segment center aligned"
                  style={selectedOption === 3 ? selectedAppStyle : appStyle}
                  onClick={() => this.onSelect(3)}
                >
                  <div style={{ height: "30%" }}>
                    <img
                      src={selectedOption === 3 ? GDF_Web_Pink : GDF_Web_Grey}
                      alt="google dialog icon"
                      style={dialogStyle}
                    />
                  </div>
                  <h3 style={titleStyle}>
                    Google Dialogflow <br /> + Web callback
                  </h3>
                  <br />
                  <p style={textStyle}>
                    Incoming calls will be connected to your dialogflow project,
                    and augmented call control will be enabled via your web
                    callback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={"ui stripe segment aligned"}
          style={{ height: "136px", padding: "3em" }}
        >
          <div
            className="ui left aligned container"
            style={{ fontSize: "20px", marginBottom: "20px" }}
          >
            Web Callback URL
          </div>
          <div className="ui input" style={{ width: "95%" }}>
            <input
              type="text"
              placeholder="www.myurl.com"
              onChange={this.onURLChange}
            />
          </div>
        </div>
        <div className={"ui stripe segment aligned"} style={{ height: "64px" }}>
          <button
            className={"ui button large"}
            id={"button"}
            style={buttonStyle}
            disabled={this.state.selectedOption === 0}
          >
            Continue
          </button>
        </div>
      </>
    );
  }
}

export const buttonStyle = {
  position: "absolute",
  right: "2%",
  top: "calc(50% - 36px/2)",
  fontFamily: "Work Sans",
  fontSize: "16px",
  fontWeight: "normal",
  width: "125px",
  height: "36px"
};

const style = {
  padding: "3rem",
  height: "387px"
};

const appStyle = {
  height: "280px",
  width: "261px",
  borderWidth: "2px"
};

const selectedAppStyle = {
  height: "280px",
  width: "261px",
  color: "#d91c5c",
  borderColor: "#d91c5c",
  borderRadius: "2px",
  borderWidth: "2px"
};

const textStyle = {
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "normal",
  lineHeight: "20px"
};

const titleStyle = {
  fontFamily: "Work Sans",
  fontWeight: "bold",
  lineHeight: "32px",
  height: "32px",
  fontSize: "20px"
};

const callbackStyle = {
  margin: "35px 15px 10px 15px",
  height: "36px",
  width: "58px"
};

const dialogStyle = {
  margin: "25px 15px 0px 15px"
};
