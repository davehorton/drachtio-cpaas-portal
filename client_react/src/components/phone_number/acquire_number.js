import React, { Component } from "react";

const style = {
  padding: "3rem"
};

class AcquireNumber extends Component {
  render() {
    let bNumberExist = <p style={{display: "none"}}/>;
    if (this.props.numberExist === false)
      bNumberExist = <p>You currently have no phone number</p>;
    return (
      <div>
        <div className={"ui text"}>
          <div className={"ui stripe segment aligned"} style={style}>
            {bNumberExist}
            <button
              className={"ui button large"}
              id={"button"}
              onClick={this.props.onRequestAcquire}
              style={{top: "40%", bottom: "40%"}}
            >
              Acquire a phone number
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AcquireNumber;
