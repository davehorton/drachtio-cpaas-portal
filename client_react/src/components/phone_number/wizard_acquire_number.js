import React, { Component } from 'react';
import axios from 'axios';

const $ = window.$;
const serverApiUrl = 'http://localhost:3000/api/phone_numbers/';

class WizardAcquireNumber extends Component{
    constructor(){
        super();
        this.state = {
            showNumbers : false,
            availableNumbers : [],
            numberConfirmed : false,
            acquiredNumber : 'asdf',
            currentStateSelect : ''
        }

        this.onAcquireNumber = this.onAcquireNumber.bind(this);
        this.getAvailableNumbers = this.getAvailableNumbers.bind(this);
        this.onAreaCodeChanged = this.onAreaCodeChanged.bind(this);

        this.getAvailableNumbers();
    }

    onAcquireNumber(num){
        this.setState({
            numberConfirmed : true,
            acquiredNumber : num.number
        });
        axios.request({
            method : 'post',
            url : serverApiUrl+'acquire-number',
            data : {
                email: sessionStorage.getItem('cpaas-email'),
                number : num.number
            }
        })
        .then(function(res){
            console.log(res)
        })
    }

    getAvailableNumbers(){
        axios.get(serverApiUrl+'available-phone-numbers')
            .then(response=>{
                let list = response.data.list;
                if(list === undefined || list.length === 0){

                }
                else{
                    this.setState({
                        numberData : list
                    })
                    console.log('data saved ',this.state.numberData);
                    
                    //get Area List
                    //get State List
                    let areaList = [];
                    let stateList = [];
                    for(let i in list){
                        let item = list[i];
                        stateList.push(item.state);
                        for(let j in item.areaCode){
                            areaList.push(item.areaCode[j].areaCode)
                        }
                    }
                    console.log(areaList);
                    this.setState({
                        areaList : areaList,
                        stateList : stateList
                    })
                }
            })
    }
    componentDidMount(){
        $('.ui.dropdown').dropdown();
    }

    onAreaCodeChanged(e){
        let areaCode = e.target.value;
        let availableNumbers = [];
        let currentStateSelect;
        for(let i in this.state.numberData){
            let item = this.state.numberData[i];
            for(let j in item.areaCode){
                if(item.areaCode[j].areaCode === areaCode){
                    console.log('item is ',item.state)
                    currentStateSelect = item.state;
                    availableNumbers = item.areaCode[j].numbers;
                    break;
                }
            }
        }
        this.setState({
            availableNumbers : availableNumbers,
            currentStateSelect : currentStateSelect
        })
        console.log(currentStateSelect);
        $('#select-state').val(currentStateSelect);
    }
    render(){
        let AreaSelect;
        let StateSelect;

        // console.log('current select is ',this.state.currentStateSelect);
        if(this.state.areaList)
        {
            AreaSelect = this.state.areaList.map(
                (item, i) => {
                    return<option key={i} value={item}>{item}</option>
                }
            );
        }

        if(this.state.stateList)
        {
            StateSelect = this.state.stateList.map(
                (item,i) => {
                    return<option key={i} value={item}>{item}</option>
                }
            )
        }

        let numberList = "";
        if(this.state.showNumbers === true && this.state.availableNumbers)
        {
            numberList = this.state.availableNumbers.map((number,i)=>{
                return(
                    <div key={i} className={'phone-item'}>
                        <div className={'ui middle aligned stackable grid'}>
                            <div className={'eight wide column'}>
                                <p>{number}</p>
                            </div>
                            <div className={'eight wide column'}>
                                <button className={'ui button right floated'} onClick={() => {this.onAcquireNumber({number})}}>
                                    Acquire
                                </button>
                            </div>
                        </div>
                    </div>
                )
            });
        }

        const fullNumberList = (
            <div>
                <h3 onClick={this.props.onBackword} style={{cursor:"pointer"}}><i className={'icon chevron left'}/>Phone Numbers</h3>
                <h1>Acquire a Phone Number</h1>
                <div className={'ui text'}>
                    <div className={'ui stripe segment aligned'} style={{paddingTop:"3rem"}}>
                        <div style={{paddingLeft:"2rem",paddingRight:"2rem"}}>
                            <p>Select an Area Code or State</p>
                            <div className={'ui middle grid'} style={{paddingBottom:"3rem"}}>
                                <div className={'five wide column'}>
                                    <select className={'ui search dropdown fluid'} onChange={this.onAreaCodeChanged}>
                                        <option value="">Area Code</option>
                                        {AreaSelect}
                                    </select>
                                </div>
                                <div className={'six wide column'}>
                                    <select id="select-state" className={'ui search dropdown fluid'} value={this.state.currentStateSelect} onChange={()=>{}}>
                                        <option value="">State</option>
                                        {StateSelect}
                                    </select>
                                </div>
                                <div className={'five wide column'}>
                                    <button className={'ui button large fluid'} onClick={()=>{this.setState({showNumbers : true})}}>
                                        See available numbers
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={'availables'}>
                            {numberList}
                        </div>
                    </div>
                </div>
            </div>
        );

        const confirmMessage = (
            <div>
                <h1>Confirmation Message</h1>
                <div className={'ui stripe segment center aligned'} style={{padding:"3rem",paddingLeft:"20%",paddingRight:"20%",paddingTop:"6rem"}}>
                    <div>
                        <p className={'custom-icon check large'}><span></span></p>
                        <p>You acquired the following number</p>
                        <h3>{this.state.acquiredNumber}</h3>
                        <br/><br/>
                        <div className={'ui middle grid'}>
                            <div className={'eight wide column'}>
                                <button className={'ui button large fluid'} onClick={this.props.onConfirmSkipped}>Skip</button>
                            </div>
                            <div className={'eight wide column'}>
                                <button className={'ui button large fluid'}>Associate an App</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        let currentElement;
        if(this.state.numberConfirmed === false)
            currentElement = fullNumberList;
        else
            currentElement = confirmMessage;
        return(
            <div>
                {currentElement}
            </div>
        )
    }
}

export default WizardAcquireNumber;