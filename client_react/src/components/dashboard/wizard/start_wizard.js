import React, { Component } from 'react';
import axios from 'axios';

const serverApiUrl = "http://localhost:3000/api/subscribers/";

class StartWizard extends Component{
    componentDidMount(){
        if(!sessionStorage.getItem('cpaas-token')) this.props.history.push('/');
        axios.request({
            method : 'post',
            headers : {
                authorization : "bearer " + sessionStorage.getItem('cpaas-token')
            },
            url : serverApiUrl + 'get-my-number',
            data : {
                email : sessionStorage.getItem('cpaas-email')
            }
        }).then(response => {
            let number = response.data.number;
            if(number !== "")
                this.props.onSkip();
        }).catch(err => {
            console.log(err);
        })
    }
    render(){
        return(
            <div>
                <h1>Dashboard</h1>
                <br/>
                <div className={'ui text'}>
                    <div className={'ui stripe segment signup center aligned'}>
                        <h2>OnBoarding or Wizard Content</h2>
                        <br/>1-<br/>2-<br/>3-<br/>4-<br/><br/><br/>
                        <button className={'ui button left floated'} onClick={this.props.onSkip}>
                            Skip
                        </button>
                        <button className={'ui button right floated'} onClick={this.props.onStart}>
                            Start
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default StartWizard;