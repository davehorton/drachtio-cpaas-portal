import React, {Component} from 'react';
import NormalHeader from './headers/normal_header';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login-component';
import {subscriberApiUrl, gitOauthClientID, googleOauthID} from '../constant';

import axios from 'axios';


class LogInPage extends Component{
    constructor(){
        super();
        this.state={
            pwdVisible : false,
            email : "",
            pwd : ""
        }
        this.changePwdVisible = this.changePwdVisible.bind(this);
        this.tryToLogIn = this.tryToLogIn.bind(this);
        this.signWithGoogle = this.signWithGoogle.bind(this);
    }
    
    changePwdVisible(){
        if(this.state.pwdVisible === false) this.setState({pwdVisible:true});
        else this.setState({pwdVisible:false});
    }

    tryToLogIn(){
        console.log('try to log in');
        let serverApiUrl = subscriberApiUrl+"login";
        
        let loginData = {
            email : this.state.email,
            pwd : this.state.pwd
        }
        console.log('log in data is ',loginData);
        // Axios
        axios.get(serverApiUrl+'?email='+loginData.email+'&pwd='+loginData.pwd)
            .then(response=>{
                if(response.data.status === 'successed'){
                    console.log('log in successed');
                    sessionStorage.setItem('cpaas-email',loginData.email);
                    this.props.history.push('/dashboard');
                }
                else{
                    console.log('log in failed');
                }
            })
    }

    signWithGoogle(googleUser){
        let _this = this;
        console.log(googleUser);
        let email = googleUser.w3.U3;
        if(!email){
            console.log('fail');
        }
        else{
            console.log('success');
            console.log('try to sign up with google account');
            let data = {
                email : email,
                social : "google"
            };
            axios.request({
                method : 'post',
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
                <NormalHeader activeTab={"login"}/>
                
                <div className={'ui text container'} style={{marginTop:"5rem"}}>
                    <div className={'ui stripe segment signup center aligned'}>
                        
                        <h1>Login</h1>
                        
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
                            <div className={'ui button huge fluid primary'} onClick={this.tryToLogIn}>Login</div>
                        </div>

                        <h3>Don't have an account?</h3>
                        <Link to='/signup'>Create Account</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogInPage;