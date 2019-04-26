import React, { Component } from "react";
import axiosAuth from '../../../utils/axios'

const serverApiUrl = "http://localhost:3000/api/subscribers/";
class PhoneNumbers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberList: []
    };
    this.getMyNumbers = this.getMyNumbers.bind(this);
  }

  componentWillMount() {
    this.getMyNumbers();
  }

  getMyNumbers() {
    axiosAuth()
      .get(`${serverApiUrl}me/phoneNumbers`)
      .then(response => this.setState({numberList: response.data}));
  }

  render() {
    let numberListComponent;
    if (this.state.numberList) {
      numberListComponent = this.state.numberList.map((item, i) => {
        return <p key={i}>{item.e164}</p>;
      });
    } else {
      numberListComponent = <p>You have no Phone Number.</p>;
    }
    return (
      <div>
        <div className={"ui text"}>
          <div className={"ui stripe segment signup aligned"}>
            <h3 className={"ui header"}>Phone Numbers</h3>
            <div>{numberListComponent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneNumbers;
