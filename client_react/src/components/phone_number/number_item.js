import React, { Component } from "react";

class NumberItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  changeCheck = () => {
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
              <label className={"boxcontainer"}>
                <input type="checkbox" checked={this.state.data.checked} onChange={this.changeCheck}/>
                <span className={"checkmark"}></span>
                <p className="phonenumber">{this.state.data.number}</p>
            </label>
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
