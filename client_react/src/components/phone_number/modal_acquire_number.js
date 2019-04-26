import React, { Component } from "react";

const $ = window.$;

export class ModalAcquireNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number
    };
  }

  componentDidMount() {
    $(".ui.modal")
      .modal({
        inverted: true,
        closable: false,
        destroy_on_hide: true,
        onDeny: function() {
          console.log("cancel");
          window.location.reload();
        },
        onApprove: function() {
          console.log("confirm");
          this.onAcquireNumber();
          window.location.reload();
        }
      })
      .modal("show");
    console.log("phone numbers to release are below ", this.state.number);
  }

  render() {
    return (
      <div className={"ui modal tiny"}>
        <div className={"content"} style={{ textAlign: "center" }}>
          <h2>Are you sure you want to acquire the following number?</h2>
          <h3>{this.state.number}</h3>
          <br />
          <div className={"actions"}>
            <div className={"ui button deny"}>Cancel</div>
            <div className={"ui button approve"} id={"button"}>Confirm</div>
          </div>
        </div>
      </div>
    );
  }
}