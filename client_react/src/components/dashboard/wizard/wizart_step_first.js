import React, { Component } from 'react';
import axios from 'axios';

const serverApiUrl = "http://localhost:3000/api/subscribers/";

class WizardStepFirst extends Component{
    constructor(){
        super();
        this.state = {
            phoneNum : ""
        }
        this.addMyNumber = this.addMyNumber.bind(this);
    }
    addMyNumber(){
        axios.request({
            method : 'post',
            url : serverApiUrl + 'add-my-number',
            data : {
                email : sessionStorage.getItem('cpaas-email'),
                number : this.state.phoneNum
            }
        }).then(response => {
            console.log(response.data);
        })
        this.props.onForward();
    }
    render(){
        return(
            <div className={'wizard-step'}>
                <h1>Step 1</h1>
                <br/>
                <div className={'ui text'}>
                    <div className={'ui stripe segment aligned'}>
                        <h3>Befure being able to test, you need to tell us your mobile number so we can recognize the call is from you.</h3>
                        <br/>
                        <div className={'ui large input'}>
                            <input type={'text'} placeholder={'(999) 999-9999'} value={this.state.phoneNum} onChange={(e)=>{
                                this.setState({
                                    phoneNum : e.target.value
                                })
                            }}/>
                        </div>
                    </div>

                    <div className={'ui stripe segment aligned'}>
                        <button className={'ui button right floated large'} onClick={this.addMyNumber}>Continue</button>
                        <br/><br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default WizardStepFirst;