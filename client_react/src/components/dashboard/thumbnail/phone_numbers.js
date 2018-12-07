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
        console.log('dashboard numbers get number');
        console.log('my token is ',sessionStorage.getItem('cpaas-access-token'))
        axios.post(serverApiUrl+'get-my-numbers', {
          email : sessionStorage.getItem('cpaas-email')
        }, {
          headers: {
            'Authorization': sessionStorage.getItem('cpaas-access-token')
          }
        }).then(response => {
            console.log('get numbers successed');
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