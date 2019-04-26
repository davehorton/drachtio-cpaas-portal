import React from "react";
import Webcallback_Grey from "../../images/Assets_14JAN2019/Icons_Grey/Webcallback_Grey.png";
import GDF_Grey from "../../images/Assets_14JAN2019/Icons_Grey/GDF_Grey.png";

export class AppItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "See Url"
    };
  }

  toggleSeeUrl = () => {
    this.setState({});
  };

  render() {
    const app = this.props.app;
    if (app.dialogflow_id && !app.callback_url) {
      return (
        <>
          <img src={GDF_Grey} alt="gdf icon" style={gdfStyle} />
          <p style={typeText}>{`Dialogflow Project ${app.dialogflow_id}`}</p>
        </>
      );
    } else if (!app.dialogflow_id && app.callback_url) {
      return (
        <>
          <img
            src={Webcallback_Grey}
            alt="callback icon"
            style={webCallbackStyle}
          />
          <p
            style={typeText}
            onMouseOver={() => this.setState({ url: app.callback_url })}
            onMouseOut={() => this.setState({ url: "See Url" })}
          >
            {`Web Callback `}
            <b className="see-url">{this.state.url}</b>
          </p>
        </>
      );
    } else {
      return (
        <>
          <img src={GDF_Grey} alt="callback icon" style={gdfStyleBoth} />
          <p style={bothTextDFStyle}>
            {`Dialogflow Project ${app.dialogflow_id}`}
          </p>
          <br />
          <div style={lineStyle} />
          <img
            src={Webcallback_Grey}
            alt="callback icon"
            style={webCallbackStyleBoth}
          />
          <p
            style={bothTextWebStyle}
            onMouseOver={() => this.setState({ url: app.callback_url })}
            onMouseOut={() => this.setState({ url: "See Url" })}
          >
            {`Web Callback `}
            <b className="see-url">{this.state.url}</b>
          </p>
        </>
      );
    }
  }
}

const typeText = {
  position: "absolute",
  fontFamily: "Work Sans",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  color: "#565656",
  mixBlendMode: "normal",
  opacity: "0.7",
  top: "55%",
  bottom: "10%",
  left: "18%"
};

const gdfStyle = {
  height: "23px",
  width: "20px",
  position: "absolute",
  left: "7%",
  right: "75%",
  top: "65%",
  bottom: "10%"
};

const gdfStyleBoth = {
  height: "23px",
  width: "20px",
  position: "absolute",
  left: "7%",
  right: "75%",
  top: "42%",
  bottom: "10%"
};

const webCallbackStyle = {
  height: "17px",
  width: "26px",
  position: "absolute",
  left: "5%",
  right: "75%",
  top: "65%",
  bottom: "10%"
};

const webCallbackStyleBoth = {
  height: "17px",
  width: "26px",
  position: "absolute",
  left: "5%",
  right: "75%",
  top: "77%",
  bottom: "10%"
};

const bothTextDFStyle = {
  fontFamily: "Work Sans",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  color: "#565656",
  mixBlendMode: "normal",
  opacity: "0.7",
  position: "absolute",
  left: "18%",
  top: "35%"
};

const bothTextWebStyle = {
  fontFamily: "Work Sans",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  color: "#565656",
  mixBlendMode: "normal",
  opacity: "0.7",
  position: "absolute",
  left: "18%",
  top: "70%"
};

const lineStyle = {
  position: "absolute",
  border: "1px solid #D9D9D9",
  backgroundColor: "#D9D9D9",
  width: "1px",
  height: "12px",
  left: "9.4%",
  top: "58%"
};
