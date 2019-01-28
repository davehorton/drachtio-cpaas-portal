import React, { Component } from "react";

import NumberItem from "./number_item";
import ModalReleaseNumbers from "./modal_release_nums";
import { AssociateApp } from "./associate_app";

const $ = window.$;

const styleNumList = {
  marginBottom: "2rem"
};

const styleButton = {
  margin: "1rem"
};

class NumberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAll: false,
      numberList: [],
      showModalReleaseNumbers: false,
      releaseList: []
    };
  }

  componentWillMount() {
    this.completeNumberList();
  }

  completeNumberList = () => {
    let list = this.props.list;
    let numberList = [];
    for (let i in list) {
      let item = {};
      item.id = list[i].id;
      item.number = list[i].e164;
      item.associatedApp = list[i].application_id;
      item.otherTags = "";
      item.checked = false;
      numberList.push(item);
    }
    this.setState({
      numberList: numberList
    });
  };

  componentDidMount() {
    $(".ui.checkbox").checkbox();
  }

  isOnlyOneNumberSelected = () => {
    const selected = this.state.numberList.filter(num => {
      return num.checked;
    });
    if (selected.length === 1) {
      return true;
    } else {
      return false;
    }
  };

  selectAll = () => {
    let tmpNumberList = [];

    for (let i in this.state.numberList) {
      let item = this.state.numberList[i];
      if (this.state.selectedAll === false) {
        this.setState({ selectedAll: true });
        item.checked = true;
      } else {
        this.setState({ selectedAll: false });
        item.checked = false;
      }
      tmpNumberList.push(item);
    }
    this.setState({
      numberList: tmpNumberList
    });
  };

  itemCheckboxChanged = e => {
    let tmpNumberList = this.state.numberList;
    for (let i in tmpNumberList) {
      if (e.number === tmpNumberList[i].number) {
        tmpNumberList[i].checked = e.checked;
      }
    }
    this.setState({ numberList: tmpNumberList });
  };

  onReleaseNumbers = () => {
    console.log("release numbers");
    let list = [];
    for (let i in this.state.numberList) {
      let item = this.state.numberList[i];
      if (item.checked === true) list.push(item);
    }

    this.setState({
      showModalReleaseNumbers: true,
      releaseList: list
    });
  };

  getSelectedNumber = () => {
    const selected = this.state.numberList.find(num => {
      return num.checked;
    });
    if (selected) {
      return this.props.list.find(num => {
        return num.id === selected.id;
      });
    }
    return;
  };

  render() {
    console.log("state", this.state);
    let numberItems = this.state.numberList.map((item, i) => {
      return (
        <NumberItem
          data={item}
          key={i}
          onCheckboxChanged={this.itemCheckboxChanged}
        />
      );
    });

    let modalReleaseNumbers;
    if (this.state.showModalReleaseNumbers === true)
      modalReleaseNumbers = (
        <ModalReleaseNumbers list={this.state.releaseList} />
      );
    return (
      <div className={"number-list"}>
        <div className={"ui text"}>
          <div className={"ui stripe segment aligned"} style={styleNumList}>
            <div className={"ui middle aligned"}>
              <button
                className={"ui button right floated large"}
                style={styleButton}
                id={"button"}
                onClick={this.onReleaseNumbers}
                disabled={
                  !this.state.numberList.find(num => {
                    return num.checked;
                  })
                }
              >
                Release
              </button>
              {
                <AssociateApp
                  disabled={!this.isOnlyOneNumberSelected()}
                  selectedNumber={this.getSelectedNumber()}
                  updateList={this.props.updateList}
                />
              }
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className={"number-list-item"}>
              <div className={"ui middle aligned stackable grid"}>
                <div className={"five wide column"}>
                  <div className={"inline field"}>
                    <label className={"boxcontainer"}>
                      <input
                        type="checkbox"
                        checked={this.state.selectedAll}
                        onClick={this.selectAll}
                      />
                      <span className={"checkmark"} />
                      <label
                        style={{ fontSize: "14px", color: "gray" }}
                        className="phonenumber"
                      >
                        Phone Number
                      </label>
                    </label>
                  </div>
                </div>
                <div className={"six wide column"}>
                  <p style={{ fontSize: "14px", color: "gray" }}>
                    Associated App
                  </p>
                </div>
                <div className={"five wide column"}>
                  <p style={{ fontSize: "14px", color: "gray" }}>
                    Other Tags(?)
                  </p>
                </div>
              </div>
            </div>
            {numberItems}
          </div>
        </div>
        {modalReleaseNumbers}
      </div>
    );
  }
}

export default NumberList;
