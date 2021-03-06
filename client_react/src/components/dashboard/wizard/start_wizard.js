import React, { Component } from "react";
import axiosAuth from '../../../utils/axios'

const serverApiUrl = "http://localhost:3000/api/subscribers/";

class StartWizard extends Component {
  componentDidMount() {
    axiosAuth()
      .get(`${serverApiUrl}me`)
      .then(response => {
        // TODO: once we want to implement wizard, check if 
        // this is the first login or something....for now skip
        this.props.onSkip();
      });
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <br />
        <div className={"ui text"}>
          <div className={"ui stripe segment signup center aligned"}>
            <h2>OnBoarding or Wizard Content</h2>
            <br />
            1-
            <br />
            2-
            <br />
            3-
            <br />
            4-
            <br />
            <br />
            <br />
            <button
              className={"ui button left floated"}
              onClick={this.props.onSkip}
            >
              Skip
            </button>
            <button
              className={"ui button right floated"}
              onClick={this.props.onStart}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default StartWizard;
