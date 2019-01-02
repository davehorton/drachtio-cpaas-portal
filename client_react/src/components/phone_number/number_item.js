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
              {/* <div className={"ui checkbox"} onClick={this.changeCheck}>
                <input
                  type={"checkbox"}
                  tabIndex={"0"}
                  className={"hidden"}
                  checked={this.state.data.checked}
                  onChange={() => {}}
                  style={{backgroundColor: '#d91c5c'}}
                />
                 <label className="boxcontainer">{this.state.data.number} 
                </label>
              </div> */}
              <label className={"boxcontainer"}>
                <input type="checkbox" checked={this.state.data.checked} onClick={this.changeCheck}/>
                {this.state.data.number} 
                <span className={"checkmark"}></span>
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
