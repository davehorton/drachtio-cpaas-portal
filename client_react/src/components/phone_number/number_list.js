import React, { Component } from 'react';

import NumberItem from './number_item';
import ModalReleaseNumbers from './modal_release_nums';
import ModalAssociateApp from './modal_associate_app';

const $ = window.$;
const styleNumList = {
    marginBottom : "2rem",
}

const styleButton = {
    margin : '1rem'
}

class NumberList extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedAll : false,
            numberList : [
                {
                    number : "+1 (559) 545-0935",
                    associatedApp : "",
                    otherTags : "",
                    checked : false,
                },
                {
                    number : "+1 (559) 545-0938",
                    associatedApp : "Google DialogFlow Project 1",
                    otherTags : "",
                    checked : false,
                }
            ],

            showModalReleaseNumbers : false,
            releaseList : [],
            showModalAssociateApp : false,
        }

        this.selectAll = this.selectAll.bind(this);
        this.itemCheckboxChanged = this.itemCheckboxChanged.bind(this);
        this.onAssociateApp = this.onAssociateApp.bind(this);

        this.onReleaseNumbers = this.onReleaseNumbers.bind(this);
        this.completeNumberList = this.completeNumberList.bind(this);
    }
    componentWillMount(){
        this.completeNumberList();
    }
    completeNumberList(){
        let list = this.props.list;
        let numberList = [];
        for(let i in list){
            let item = {};
            item.id = list[i].id;
            item.number = list[i].e164;
            item.associatedApp = list[i].application_id;
            item.otherTags = "";
            item.checked = false;
            numberList.push(item);
        }
        this.setState({
            numberList : numberList
        })
    }
    componentDidMount(){
        $('.ui.checkbox').checkbox();
    }

    selectAll(){
        let tmpNumberList = [];

        for(let i in this.state.numberList){
            let item = this.state.numberList[i];
            if(this.state.selectedAll === false){
                this.setState({ selectedAll : true})
                item.checked = true;
            }
            else{
                this.setState({ selectedAll : false})
                item.checked = false;
            }  
            tmpNumberList.push(item);
        }
        this.setState({
            numberList : tmpNumberList
        })
    }

    itemCheckboxChanged(e){
        let tmpNumberList = this.state.numberList;
        for(let i in tmpNumberList){
            if(e.number === tmpNumberList[i].number){
                tmpNumberList[i].checked = e.checked;
            }
        }
        this.setState({numberList : tmpNumberList});
    }

    onAssociateApp(){
        console.log('associate app');
        this.setState({
            showModalAssociateApp : true
        })
    }

    onReleaseNumbers(){
        console.log('release numbers');
        let list = [];
        for(let i in this.state.numberList){
            let item = this.state.numberList[i];
            if(item.checked === true)
                list.push(item);
        }

        this.setState({
            showModalReleaseNumbers : true,
            releaseList : list
        })
    }

    render(){
        let numberItems = this.state.numberList.map((item, i) =>{
            return <NumberItem data={item} key={i} onCheckboxChanged={this.itemCheckboxChanged}/>
        });

        let modalReleaseNumbers = "";
        if(this.state.showModalReleaseNumbers === true)
            modalReleaseNumbers = <ModalReleaseNumbers list={this.state.releaseList}/>

        let modalAssociateApp = "";
        if(this.state.showModalAssociateApp === true)
            modalAssociateApp = <ModalAssociateApp />
        return(
            <div className={'number-list'}>
                <div className={'ui text'}>
                    <div className={'ui stripe segment aligned'} style={styleNumList}>
                        <div className={'ui middle aligned'}>
                            <button className={'ui button right floated large'} style={styleButton} onClick={this.onAssociateApp}>Associate an App</button>
                            <button className={'ui button right floated large'} style={styleButton} onClick={this.onReleaseNumbers}>Release Number</button>
                        </div>
                        <br/><br/><br/><br/>
                        <div className={'number-list-item'}>
                            <div className={'ui middle aligned stackable grid'}>
                                <div className={'five wide column'}>
                                    <div className={'inline field'}>
                                        <div className={'ui checkbox'} onClick={this.selectAll}>
                                            <input type={'checkbox'} tabIndex={'0'} className={'hidden'} checked={this.state.selectedAll} onChange={()=>{}}/>
                                            <label style={{fontSize:"14px",color:"gray"}}>Phone Number</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={'six wide column'}>
                                    <p style={{fontSize:"14px",color:"gray"}}>Associated App</p>
                                </div>
                                <div className={'five wide column'}>
                                    <p style={{fontSize:"14px",color:"gray"}}>Other Tags(?)</p>
                                </div>
                            </div>
                        </div>
                        {numberItems}
                    </div>
                </div>
                {modalReleaseNumbers}
                {modalAssociateApp}
            </div>
        )
    }
}

export default NumberList;