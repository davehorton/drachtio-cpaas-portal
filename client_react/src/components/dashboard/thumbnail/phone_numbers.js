import React, { Component } from 'react';
import axios from 'axios';

const serverApiUrl = 'http://localhost:3000/api/phone_numbers/';
class PhoneNumbers extends Component{
    constructor(props){
        super(props);
        this.state = {
            numberList : []
        };
        this.getMyNumbers = this.getMyNumbers.bind(this);
    }

    componentWillMount(){
        this.getMyNumbers();
    }

    getMyNumbers(){
        axios.request({
            method : 'post',
            url : serverApiUrl+'get-my-numbers',
            data : {
                email : sessionStorage.getItem('cpaas-email')
            }
        }).then(response => {
            let data = response.data.list;
            console.log('number list ',data);
            if(data && data.length !== 0)
            {
                this.setState({
                    numberList : data
                })
            }
        })
    }

    render(){
        let numberListComponent;
        if(this.state.numberList){
            numberListComponent = this.state.numberList.map(
                (item, i) => {
                    return<p key={i}>{item.e164}</p>
                }
            )
        }
        else{
            numberListComponent = <p>You have no Phone Number.</p>
        }
        return(
            <div>
                <div className={'ui text'}>
                    <div className={'ui stripe segment signup aligned'}>
                        <h3 className={'ui header'}>Phone Numbers</h3>
                        <div>
                            {numberListComponent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PhoneNumbers;