import React, { Component } from 'react';
import axios from 'axios';
import {subscriberApiUrl, gitOauthClientID, gitOauthClientSecret} from '../../constant';

const request = require('superagent');

class GithubCallBack extends Component{
    constructor(){
        super();
        this.signupWithGithub = this.signupWithGithub.bind(this);
    }
    componentDidMount(){
        let data = window.location.href;
        let _this = this;
        console.log(data);
        data = data.split('callback?')[1];
        data = data.split('&')[0];
        data = data.split('=')[1];
        console.log('code is ',data);

        var req = new XMLHttpRequest();
        req.open('POST',
        'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
        true);
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send('code=' + data +
            '&client_id=' + gitOauthClientID +
            '&client_secret='+gitOauthClientSecret);

        req.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200)
            {
                console.log(req.responseText);
                let txt = JSON.parse(req.responseText);
                let access_token = txt.access_token;
                console.log(access_token);
                if(access_token){
                    let signData = {
                        // email : id,
                        // name : name
                    }
                    request
                        .get('https://api.github.com/user')
                        .set('Authorization', 'token '+access_token)
                        .then(function(res){
                            console.log('first return data is ',res);
                            let id = res.body.login;
                            let name = res.body.name;
                            console.log(id,name);
                            signData.name = id;
                            
                            request
                                .get('https://api.github.com/user/emails')
                                .set('Authorization', 'token '+access_token)
                                .then(function(res){
                                    console.log('return data is ',res);
                                    let emails = res.body;
                                    console.log('second return data is',emails);
                                    signData.email = emails[0].email;
                                    console.log('sign data is ', signData);
                                    _this.signupWithGithub(signData);
                                })
                        });                    
                }
            }
        }
    }
    signupWithGithub(res){
        res.social = 'github';
        axios.request({
            method : 'post',
            url : subscriberApiUrl+'signup_with_third_party',
            data : res
        }).then(response => {
            console.log('data is',response);
            console.log('data is',response.data);
            if(response.data.status === "successed" || response.data.status === "exist")
            {
                sessionStorage.setItem('cpaas-email',res.email);
                sessionStorage.setItem('cpaas-name',res.name);
                this.props.history.push('/dashboard');
            }
        }).catch(err => {
            console.log(err);
        })
    }
    render(){
        return(
            <div>
                Github Callback
            </div>
        )
    }
}

export default GithubCallBack;