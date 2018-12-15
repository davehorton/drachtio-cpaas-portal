import React, { Component } from "react";

class NumberItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
    this.changeCheck = this.changeCheck.bind(this);
  }

  changeCheck() {
    let item = this.state.data;
    if (this.state.data.checked === false) item.checked = true;
    else item.checked = false;
    this.setState({ data: item });
    this.props.onCheckboxChanged(item);
  }

  render() {
    return (
      <div className={"number-list-item"}>
        <div className={"ui middle aligned stackable grid"}>
          <div className={"five wide column"}>
            <div className={"inline field"}>
              <div className={"ui checkbox"} onClick={this.changeCheck}>
                <input
                  type={"checkbox"}
                  tabIndex={"0"}
                  className={"hidden"}
                  checked={this.state.data.checked}
                  onChange={() => {}}
                />
                <label>{this.state.data.number}</label>
              </div>
            </div>
          </div>
          <div className={"six wide column"}>
            <p>{this.state.data.associatedApp}</p>
          </div>
          <div className={"five wide column"}>
            <p>{this.state.data.otherTags}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NumberItem;
