import React, { Component } from "react";
import axiosAuth from '../../../utils/axios'

const serverApiUrl = "http://localhost:3000/api/subscribers/";
const $ = window.$;

class AddYourNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      phoneNumber: ''
    };
  }

  componentWillMount() {
    this.checkMyNumber();
  }

  addMyNumber = () => {
    this.setState({
      saved: true
    });
    axiosAuth()
      .patch(`${serverApiUrl}me`, { my_number: this.state.phoneNumber})
      .then(response => {
        console.log(`updated phone number: ${JSON.stringify(response.data)}`);
      });
  }

  checkMyNumber = () => {
    axiosAuth()
    .get(`${serverApiUrl}me`)
    .then(response => this.setState({
      phoneNumber: response.data.my_number
    }));  
  }

  render() {
    let currentElement;
    if (this.state.saved === false)
      currentElement = (
        <div className={"ui stripe segment signup aligned"}>
          <h3 className={"ui header"}>Your Number</h3>
          <p>
            Before being able to test, you need to tell us your mobile number so
            we can recognize the call is from you
          </p>
          <div className={"ui middle aligned stackable grid"}>
            <div className={"ten wide column"}>
              <div className={"ui input fluid large"}>
                <input
                  type={"text"}
                  placeholder={"(999) 999-9999"}
                  value={this.state.phoneNumber || ''}
                  onChange={e => { this.setState({ phoneNumber: e.target.value });}}
                />
              </div>
            </div>
            <div className={"six wide right floated column"}>
              <button
                className={"ui medium button left"}
                id={"button"}
                onClick={this.addMyNumber}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      );
    else
      currentElement = (
        <div
          className={"ui stripe segment signup aligned custom-anim-move-to-account"}
          onClick={() => {$(".custom-anim-move-to-account").slideUp(700);}}
        >
          <h3 className={"ui header"}>
            The following number is successfully saved
          </h3>
          <h4>{this.state.phoneNumber}</h4>
          <br />
          <p>You can edit it by going to your account</p>
        </div>
      );
    let style = {
      display: 'block'
    };
    return (
      <div>
        <div className={"ui text"} style={style}>
          {currentElement}
        </div>
      </div>
    );
  }
}

export default AddYourNumber;
