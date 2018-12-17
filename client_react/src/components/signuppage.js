import React, { Component } from "react";
import NormalHeader from "./headers/normal_header";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login-component";
import GitHubLogin from "github-login";
import { subscriberApiUrl, githubClientID, googleOauthID, redirectUri } from "../constant";
import google_handler from "../utils/google_handler";
import github_handler from "../utils/github_handler";

var bcrypt = require("bcryptjs");

class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      pwdVisible: false,
      email: "",
      pwd: ""
    };
    this.changePwdVisible = this.changePwdVisible.bind(this);
    this.tryToSignUp = this.tryToSignUp.bind(this);
    this.signFailureWithGithub = this.signFailureWithGithub.bind(this);
  }

  loginSuccess({ accessToken, email, social, socialId }) {
    sessionStorage.setItem("cpaas-access-token", accessToken);
    sessionStorage.setItem("cpaas-email", email);
    sessionStorage.setItem("cpaas-social", social);
    sessionStorage.setItem("cpaas-social-id", socialId);
    this.props.history.push("/dashboard");
  }

  changePwdVisible() {
    if (this.state.pwdVisible === false) this.setState({ pwdVisible: true });
    else this.setState({ pwdVisible: false });
  }

  tryToSignUp() {
    console.log("try to sign up");
    console.log(this.state.email, this.state.pwd);

    console.log(subscriberApiUrl);

    let signData = {
      email: this.state.email,
      pwd: bcrypt.hashSync(this.state.pwd, 10)
    };

    console.log(signData);
    axios
      .request({
        method: "post",
        url: subscriberApiUrl + "signup",
        data: signData
      })
      .then(response => {
        console.log(response.data);
        this.props.history.push("/confirm");
      })
      .catch(err => {
        console.log(err);
      });
  }

  signFailureWithGithub(err) {
    console.log("failure with github: " + JSON.stringify(err));
  }

  render() {
    let typePwd = "";
    let iconEye;
    if (this.state.pwdVisible === false) {
      typePwd = "password";
      iconEye = "eye link icon";
    } else {
      iconEye = "eye slash link icon";
      typePwd = "text";
    }
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#ddd"
        }}>
        <NormalHeader activeTab={"signup"} />
        <div className={"ui text container"} style={{ marginTop: "5rem" }}>
          <h1 id={"login-signup"} className={"ui center aligned header"}>
            Sign Up
          </h1>
          <div className={"ui stripe segment signup center aligned"}>
            <GoogleLogin
              socialId={googleOauthID}
              className="btn-continue-with-google"
              scope="profile email"
              fetchBasicProfile={true}
              responseHandler={google_handler.bind(null, this.loginSuccess.bind(this))}>
              <i className={"google-icon"} /> Continue with Google
            </GoogleLogin>
            <GitHubLogin
              clientId={githubClientID}
              className={"btn-continue-with-github"}
              scope="read:user"
              redirectUri={redirectUri}
              onSuccess={github_handler.bind(null, this.loginSuccess.bind(this))}
              onFailure={this.signFailureWithGithub}>
              <i id={"github-icon"} className={"github icon"} /> Continue with Github
            </GitHubLogin>
            <br />
            <div className={"ui horizontal divider"}>OR</div>
            <br />
            <div className={"ui form"}>
              <div className={"ui input fluid large"}>
                <input
                  type={"email"}
                  placeholder={"Email address"}
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </div>
              <br />
              <div className={"ui fluid icon input large"}>
                <input
                  type={typePwd}
                  placeholder={"Password"}
                  value={this.state.pwd}
                  onChange={e => {
                    this.setState({ pwd: e.target.value });
                  }}
                />
                <i style={{ color: "#d91c5c" }} className={iconEye} onClick={this.changePwdVisible} />
              </div>
              <br />
              <div id={"login-continue-button"} className={"ui button huge fluid primary"} onClick={this.tryToSignUp}>
                Continue
              </div>
            </div>
            <br />
            &nbsp;&nbsp;
            <h4 className={"no-already-account"}>Already have an account?</h4>
            <Link to="/login">
              <h4 className={"create-login-account"}>Log In</h4>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
