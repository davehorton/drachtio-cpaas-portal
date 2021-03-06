import React, { Component } from "react";

import LoggedInHeader from "./headers/logged_in_header";
import SidebarMain from "./sidebar/sidebar_main";
import AcquireNumber from "./phone_number/acquire_number";
import WizardAcquireNumber from "./phone_number/wizard_acquire_number";
import NumberList from "./phone_number/number_list";
import axios from "axios";

const serverApiUrl = "http://localhost:3000/api/phone_numbers/";

class PhoneNumbers extends Component {
  constructor() {
    super();
    this.state = {
      numberList: [],
      showAcquireWizard: false
    };
  }

  startAcquireNumber = () => {
    console.log("start acquiring number");
    this.setState({
      showAcquireWizard: true
    });
  };

  getMyNumbers = () => {
    axios
      .post(
        serverApiUrl + "get-my-numbers",
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
        if (data && data.length !== 0) {
          this.setState({
            myNumbers: data
          });
        }
      });
  };

  componentDidMount() {
    this.getMyNumbers();
  }

  updateList = () => {
    window.location.reload();
  };

  render() {
    let bNumberExist;
    let currentElement;
    let numberListComponent;
    if (this.state.myNumbers && this.state.myNumbers.length !== 0) {
      bNumberExist = true;
      numberListComponent = (
        <NumberList list={this.state.myNumbers} updateList={this.updateList} />
      );
    } else {
      bNumberExist = false;
    }

    if (this.state.showAcquireWizard === false)
      currentElement = (
        <div>
          <h1>Phone Numbers</h1>
          {/* <i className="big circular icon plus" id="plus-icon"/> */}
          {numberListComponent}
          <AcquireNumber
            numberExist={bNumberExist}
            onRequestAcquire={this.startAcquireNumber}
            updateList={this.updateList}
          />
        </div>
      );
    else {
      currentElement = (
        <WizardAcquireNumber
          onBackward={() => {
            this.setState({ showAcquireWizard: false });
          }}
          onConfirmSkipped={() => {
            console.log("force update");
            this.setState({ showAcquireWizard: false });
            window.location.reload();
          }}
          updateList={this.updateList}
        />
      );
    }
    return (
      <div className={"bg-color-gray"}>
        <LoggedInHeader />
        <div className={"ui grid"}>
          <div className={"four wide column"} style={{ padding: "0" }}>
            <SidebarMain page={"phone_num"} />
          </div>
          <div className={"ten wide column"} style={{ padding: "0" }}>
            <div className={"phone-num"}>{currentElement}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneNumbers;
