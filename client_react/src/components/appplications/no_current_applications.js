import React, { Component } from "react";

const style = {
  padding: "3rem",
  height: '387px',
};

const rectangleStyle = {
  position: 'absolute',
  left: '7%',
  right: '70%',
  top: '17%',
  bottom: '37.63%',
  background: '#D8D8D8',
  width: '243px',
  height: '243px'
}

const textStyle = {
  position: 'absolute',
  height: '32px',
  left: '45%',
  right: '10.42%',
  top: 'calc(50% - 32px/2 - 68.5px)',
  fontFamily: 'Work Sans',
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: '32px',
  fontSize: '24px',
  color: '#565656'
}

export const buttonStyle = {
  position: 'absolute',
  // left: '53.25%',
  left: '48%',
  right: '30.42%',
  top: 'calc(50% - 24px/2 + 45.5px)',
  fontFamily: 'Work Sans',
  // fontStyle: 'normal',
  // fontWeight: '500',
  // lineHeight: '24px',
  fontSize: '16px',
  width: '250px',
  // height: '24px'
//   color: #'FFFFFF';
}

class NoCurrentApplication extends Component {
  render() {
    return (
        <div className={"ui text"}>
          <div className={"ui stripe segment aligned"} style={style}>
            <div style={rectangleStyle}/>
            <div>
              <h3 style={textStyle}>You currently have no application</h3>
              <br />
              <button
                className={"ui button large"}
                id={"button"}
                style={buttonStyle}
                onClick={this.props.renderCreateAppComponent}
              >
                Create a new application
              </button>
            </div>
          </div>
        </div>
    );
  }
}

export default NoCurrentApplication;
