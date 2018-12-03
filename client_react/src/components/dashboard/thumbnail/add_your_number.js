import React, { Component } from 'react';
import axios from 'axios';

const serverApiUrl = "http://localhost:3000/api/subscribers/";
const $ = window.$;
class AddYourNumber extends Component{
    constructor(props){
        super(props);
        this.state = {
            saved : false,
            phoneNum : "",
            myNumber : ""
        }
        this.addMyNumber = this.addMyNumber.bind(this);
        this.checkMyNumber = this.checkMyNumber.bind(this);
    }

    componentWillMount(){
        this.checkMyNumber();
    }

    addMyNumber(){
        this.setState({
            saved : true 
        });
        if(!sessionStorage.getItem('cpaas-token')) this.props.history.push('/');
        axios.request({
            method : 'post',
            headers : {
                authorization : "bearer " + sessionStorage.getItem('cpaas-token')
            },
            url : serverApiUrl + 'add-my-number',
            data : {
                email : sessionStorage.getItem('cpaas-email'),
                number : this.state.phoneNum
            }
        }).then(response => {
            console.log(response.data);
        }).catch(err =>{
            console.log(err);
        })
    }

    checkMyNumber(){
        if(!sessionStorage.getItem('cpaas-token')) this.props.history.push('/');
        axios.request({
            method : 'post',
            headers : {
                authorization : "bearer " + sessionStorage.getItem('cpaas-token')
            },
            url : serverApiUrl + 'get-my-number',
            data : {
                email : sessionStorage.getItem('cpaas-email'),
                number : this.state.phoneNum
            }
        }).then(response => {
            this.setState({
                myNumber : response.data.number
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        let currentElement;
        if(this.state.saved === false)
            currentElement = (
                <div className={'ui stripe segment signup aligned'}>
                    <h3 className={'ui header'}>Your Number</h3>
                    <p>Before being able to test, you need to tell us your mobile number so we can recognize the call is from you</p>
                    <div className={'ui middle aligned stackable grid'}>
                        <div className={'ten wide column'}>
                            <div className={'ui input fluid large'}>
                                <input type={"text"} placeholder={'(999) 999-9999'} value={this.state.phoneNum} onChange={(e) => { this.setState({phoneNum : e.target.value})}}/>
                            </div>
                        </div>
                        <div className={'six wide right floated column'}>
                            <button className={'ui button left fluid'} onClick={this.addMyNumber}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            );
        else
            currentElement = (
                <div className={'ui stripe segment signup aligned custom-anim-move-to-account'} onClick={
                    () => {
                        $('.custom-anim-move-to-account').slideUp(700);
                    }
                }>
                    <h3 className={'ui header'}>The following number is successfully saved</h3>
                    <h4>{this.state.phoneNum}</h4>
                    <br/>
                    <p>You can edit it by going to your account</p>
                </div>
            );
        let style = {
            display : 'none'
        };
        if(this.state.myNumber === "")
            style = {
                display : 'block'
            }

        return(
            <div>
                <div className={'ui text hidden'} style={style}>
                    {currentElement}
                </div>
            </div>
        )
    }
}

export default AddYourNumber;