import React, {Component} from 'react';
import NormalHeader from './headers/normal_header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login-component';
import {serverApiUrl,subscriberApiUrl, gitOauthClientID, googleOauthID} from '../constant';

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
        this.signWithGoogle = this.signWithGoogle.bind(this);
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
        if(!sessionStorage.getItem('cpaas-token')) this.props.history.push('/');
        axios.request({
            method : 'post',
            headers : {
                authorization : "bearer " + sessionStorage.getItem('cpaas-token')
            },
            url : subscriberApiUrl+'signup',
            data : signData
        }).then(response => {
            console.log(response.data);
            this.props.history.push('/confirm');
        }).catch(err => {
            console.log(err);
            this.props.history.push('/');
        })
    }

    signWithGoogle(googleUser){
        console.log(googleUser);
        let email = googleUser.w3.U3;
        if(!email){
            console.log('fail');
        }
        else{
            let _this = this;
            console.log('success');
            console.log('try to sign up with google account');
            let data = {
                email : email,
                social : "google"
            };
            if(!sessionStorage.getItem('cpaas-token')) this.props.history.push('/');
            axios.request({
                method : 'post',
                headers : {
                    authorization : "bearer " + sessionStorage.getItem('cpaas-token')
                },
                url : subscriberApiUrl+'signup_with_third_party',
                data : data
            }).then(response => {
                console.log('data is',response.data);
                if(response.data.status === "successed" || response.data.status === "exist")
                {
                    sessionStorage.setItem('cpaas-email',email);
                    console.log(_this)
                    _this.props.history.push('/dashboard');
                }
            }).catch(err => {
                console.log(err);
            })
        }
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
                            className={"btn-continue-with-google"}
                            scope={"profile email"}
                            fetchBasicProfile={false}
                            responseHandler={this.signWithGoogle}
                            buttonText="Continue With Google"><i className={'google icon'}/></GoogleLogin>

                        <a href={"https://github.com/login/oauth/authorize?client_id="+gitOauthClientID} className={'btn-continue-with-github'}><i className={'github icon'}></i> Continue with Github</a>
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