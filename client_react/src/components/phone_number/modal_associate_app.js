import React, { Component } from "react";

const $ = window.$;

const customStyle = {
  marginTop: "1rem",
  marginBottom: "1rem"
};
class ModalAssociateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appList: [
        {
          name: "Google DialogFlow-Project 1"
        },
        {
          name: "Google DialogFlow-Project 2"
        },
        {
          name: "Google DialogFlow-Project 3"
        }
      ]
    };
  }
  componentDidMount() {
    // let _this = this;
    $(".ui.modal").modal({
      inverted: true,
      closable: false,
      destroy_on_hide: true,
      onDeny: function() {
        // _this.props.onCancel();
        console.log("cancel");
        return true;
      },
      onApprove: function() {
        // _this.props.onConfirm();
        console.log("confirm");
        return true;
      }
    });

    $(".ui.radio.checkbox").checkbox();
  }
  render() {
    let appListElem = this.state.appList.map((item, i) => {
      return (
        <div className={"field"} key={i}>
          <div className={"ui radio checkbox"} style={customStyle}>
            <input
              type={"radio"}
              name={"app"}
              tabIndex={"0"}
              className={"hidden"}
            />
            <label>{item.name}</label>
          </div>
        </div>
      );
    });
    return (
      <div className={"ui modal associate-app tiny"}>
        <div className={"content"} style={{ textAlign: "center" }}>
          <h2>Select the app you want to associate</h2>
          <div className={"grouped fields"}>{appListElem}</div>
          <br />
          <div className={"actions"}>
            <div className={"ui button large deny"}>Cancel</div>
            <div className={"ui button large approve"}>Confirm</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAssociateApp;
