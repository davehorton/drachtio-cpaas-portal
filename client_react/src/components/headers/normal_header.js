import React , { Component } from 'react';
import { Link } from 'react-router-dom';

class NormalHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            activeTab : this.props.activeTab
        }
    }

    componentWillMount(){
        console.log('mounted',this.state.activeTab);
    }
    render(){
        let classNavDocs = "item ";
        let classNavSignUp = "item ";
        let classNavLogIn = "item ";

        if(this.state.activeTab === "docs") classNavDocs += "active";
        else if(this.state.activeTab === "signup") classNavSignUp += "active";
        else if(this.state.activeTab === "login") classNavLogIn += "active";
        return(
            <div className={"ui large top fixed huge menu transition visible"} style={{display:"flex"}}>
                <div className={"ui container"}>
                    <Link to="/" className={"item"}>CPAAS</Link>
                    <div className={"right menu"}>
                        <Link to="/documentation" className={classNavDocs}>Documentation</Link>
                        <Link to="/login" className={classNavLogIn}>Log In</Link>
                        <Link to="/signup" className={classNavSignUp}>Sign Up</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NormalHeader;