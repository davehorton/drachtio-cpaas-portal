import React, { Component } from "react";
import googleDialogPink from "../../images/googleDialogPink.png";
import googleDialogGray from "../../images/googleDialogGray.png";
import webCallbackGray from "../../images/webCallbackGray.png";
import webCallbackPink from "../../images/webCallbackPink.png";

export class CreateApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptiontion: 0
    };
  }

  onSelect = option => {
    this.setState({ selectedOption: option });
  };

  render() {
    const { selectedOption } = this.state;
    const iconStyle = {
      position: "absolute",
      left: "45%",
      right: "45%",
      top: "15%",
      bottom: "75%",
      color: selectedOption === 3 ? "#d91c5c" : "#CCCCCC"
    };
    return (
      <>
        <h1 style={{ fontFamily: "Work Sans" }}>Create a new application</h1>
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
                        selectedOption === 1 ? webCallbackPink : webCallbackGray
                      }
                      alt="callback icon"
                      style={callbackStyle}
                    />
                  </div>
                  <h4 style={titleStyle}>Web Callback</h4>
                  <p>
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
                      src={
                        selectedOption === 2
                          ? googleDialogPink
                          : googleDialogGray
                      }
                      alt="google dialog icon"
                      style={dialogStyle}
                    />
                  </div>
                  <h4 style={titleStyle}>Google Dialogflow</h4>
                  <p>
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
                  <div style={{ height: '30%' }}>
                  <img
                    src={
                      selectedOption === 3 ? googleDialogPink : googleDialogGray
                    }
                    alt="google dialog icon"
                    style={dialogStyle}
                  />
                  <i className="icon plus" style={iconStyle} />
                  <img
                    src={
                      selectedOption === 3 ? webCallbackPink : webCallbackGray
                    }
                    alt="callback icon"
                    style={callbackStyle}
                  />
                  </div>
                  <h3 style={titleStyle}>
                    Google Dialogflow <br /> + Web callback
                  </h3>
                  <p style={{ paddingTop: "20px" }}>
                    Incoming calls will be connected to your dialogflow project,
                    and augmented call control will be enabled via your web
                    callback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"ui stripe segment aligned"} style={{ height: "64px" }}>
          <button
            className={"ui button large"}
            id={"button"}
            style={buttonStyle}
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
  left: "85%",
  right: "30.42%",
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
  width: "261px"
};

const selectedAppStyle = {
  height: "280px",
  width: "261px",
  color: "#d91c5c",
  borderColor: "#d91c5c",
  borderRadius: "8px"
};

const titleStyle = {
  fontFamily: "Work Sans",
  fontWeight: "bold",
  lineHeight: "32px",
  height: "32px",
  fontSize: "20px"
};

const callbackStyle = {
  margin: "20px 15px 10px 15px",
  height: "36px",
  width: "58px"
};

const dialogStyle = {
  margin: "20px 15px 0px 15px"
};
