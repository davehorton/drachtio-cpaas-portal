import React, { Component } from 'react';
import axios from 'axios';

const serverApiUrl = 'http://localhost:3000/api/phone_numbers/';

const $ = window.$;

class ModalReleaseNumbers extends Component{
    constructor(props){
        super(props);
        this.state={
            numberList : this.props.list
        }
        this.releaseNumbers = this.releaseNumbers.bind(this);
    }
    releaseNumbers(){
        let list = this.state.numberList;
        if(list){
            for(let i in list){
                console.log(serverApiUrl+list[i].id);
                if(!sessionStorage.getItem('cpaas-token')) this.props.history.push('/');
                axios.delete(
                    serverApiUrl+list[i].id,
                    {
                        headers : {
                            authorization : "bearer " + sessionStorage.getItem('cpaas-token')
                        },
                    }
                ).then(res => {
                    console.log(res.data);
                })
            }
        }
    }
    componentDidMount(){
        let _this = this;
        $('.ui.modal')
            .modal({
                inverted : true,
                closable : false,
                destroy_on_hide : true,
                onDeny : function(){
                    console.log('cancel');
                    window.location.reload();
                },
                onApprove : function(){
                    console.log('confirm');
                    _this.releaseNumbers();
                    window.location.reload();
                }
            })
            .modal('show');
        console.log('phone numbers to release are below ',this.state.numberList);
    }
    render(){
        let numberListElem = this.state.numberList.map((item, i) =>{
            return <h3 key={i}>{item.number}</h3>;
        })
        return(
            <div className={'ui modal tiny'}>
                <div className={'content'} style={{textAlign:'center'}}>
                    <h2>Do you really want to release the following numbers?</h2>
                    {numberListElem}
                    <br/>
                    <div className={'actions'}>
                        <div className={'ui button deny'}>Cancel</div>
                        <div className={'ui button approve'}>Confirm</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalReleaseNumbers;