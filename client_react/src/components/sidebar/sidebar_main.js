import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidebarMain extends Component{
    constructor(props){
        super(props);
        this.state={
            activeTab : this.props.page
        }
    }

    componentWillMount(){
        console.log('side bar active tab is ',this.props.page);
    }
    render(){
        let classDashboard = 'item';
        let classAccount = 'item';
        let classPhoneNum = 'item';
        let classApps = 'item';
        switch(this.props.page){
            case 'dashboard' : classDashboard += ' active';
                break;
            case 'account' : classAccount += ' active';
                break;
            case 'phone_num' : classPhoneNum += ' active';
                break;
            case 'apps' : classApps += ' active';
                break;
            default:
                break;
        }
        return(
            <div className={'ui left vertical menu sidebar-left'} style={{fontSize:"16px"}}>
                <Link to={'dashboard'} className={classDashboard}>Dashboard</Link>
                <Link to={'account'} className={classAccount}>Account</Link>
                <Link to={'phone_num'} className={classPhoneNum}>Phone Numbers</Link>
                <Link to={'apps'} className={classApps}>Applications</Link>
            </div>
        )
    }
}

export default SidebarMain;