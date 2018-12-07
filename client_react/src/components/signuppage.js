import React, {Component} from 'react';
import NormalHeader from './headers/normal_header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login-component';
import GitHubLogin from 'github-login';
import {serverApiUrl,subscriberApiUrl, githubOauthID, googleOauthID} from '../constant';
import google_handler from './oauth/google_handler';

var bcrypt = require('bcryptjs');

class SignUpPage extends Component{
    constructor(){
        super();
        this.state={
            pwdVisible : false,
            email : "",
            pwd : ""
        }
        this.changePwdVisible = this.changePwdVisible.bind(this);
        this.tryToSignUp = this.tryToSignUp.bind(this);
        this.signWithGithub = this.signWithGithub.bind(this);
        this.signFailureWithGithub = this.signFailureWithGithub.bind(this);
    }

    loginSuccess({accessToken, email, social, socialId}) {
        sessionStorage.setItem('cpaas-access-token',accessToken);        
        sessionStorage.setItem('cpaas-email',email);        
        sessionStorage.setItem('cpaas-social',social);        
        sessionStorage.setItem('cpaas-social-id',socialId);
        this.props.history.push('/dashboard');  
    }

    changePwdVisible(){
        if(this.state.pwdVisible === false) this.setState({pwdVisible:true});
        else this.setState({pwdVisible:false});
    }

    tryToSignUp(){
        console.log('try to sign up');
        console.log(this.state.email,this.state.pwd);
        

        console.log(subscriberApiUrl);
 
        let signData = {
            email : this.state.email,
            pwd : bcrypt.hashSync(this.state.pwd,10)
        }

        console.log(signData);
        axios.request({
            method : 'post',
            url : subscriberApiUrl+'signup',
            data : signData
        }).then(response => {
            console.log(response.data);
            this.props.history.push('/confirm');
        }).catch(err => {
            console.log(err);
        })
    }

    signWithGithub(obj) {
        console.log('code from sign with github: ' + obj.code);

        //TODO: exchange code for access token
        //https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow
    }

    signFailureWithGithub(err) {
        console.log('failure with github: ' + JSON.stringify(err));
    }

    render(){
        let typePwd = "";
        let iconEye;
        if(this.state.pwdVisible === false){
            typePwd = "password";
            iconEye = "eye link icon";
        }
        else{
            iconEye = "eye slash link icon";
            typePwd = "text";
        }
        return(
            <div style={{position:"absolute",width:"100%",height:"100%",backgroundColor:"#ddd"}}>
                <NormalHeader activeTab={"signup"}/>
                <div className={'ui text container'} style={{marginTop:"5rem"}}>
                    <div className={'ui stripe segment signup center aligned'}>
                        <h1>Sign up</h1>
                        <GoogleLogin socialId={googleOauthID}
                            className="btn-continue-with-google"
                            scope="profile email"
                            fetchBasicProfile={true}    
                            responseHandler={google_handler.bind(null, this.loginSuccess.bind(this))}
                            buttonText="Continue With Google"><i className={'google icon'}/></GoogleLogin>

                        <GitHubLogin clientId="8a3fdde813112f0fdb0b"
                            className={'btn-continue-with-github'}
                            scope="user" 
                            redirectUri="http://localhost:3001"
                            buttonText="Continue With Github"
                            onSuccess={this.signWithGithub} 
                            onFailure={this.signFailureWithGithub}><i className={'github icon'}/></GitHubLogin>
                        <br/>
                        <div className={'ui horizontal divider'}>OR</div>
                        <br/>
                        <div className={'ui form'}>
                            <div className={'ui input fluid large'}>
                                <input type={"email"} placeholder={'Email address'} value={this.state.email} onChange={(e) => { this.setState({email : e.target.value})}}/>
                            </div>
                            <br/>
                            <div className={'ui fluid icon input large'}>
                                <input type={typePwd} placeholder={'Password'} value={this.state.pwd} onChange={(e) => {this.setState({pwd : e.target.value})}}/>
                                <i className={iconEye} onClick={this.changePwdVisible}></i>
                            </div>
                            <br/>
                            <div className={'ui button huge fluid primary'} onClick={this.tryToSignUp}>Continue</div>
                        </div>

                        <h3>Already have an account?</h3>
                        <Link to='/login'>Log in</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpPage;