import React, { Component } from 'react';

const style = {
    padding:"3rem"
};

class AcquireNumber extends Component{
    render(){
        let bNumberExist;
        if(this.props.numberExist === false)
            bNumberExist = <p>You have no Number</p>;
        return(
            <div>
                <div className={'ui text'}>
                    <div className={'ui stripe segment aligned'} style={style}>
                        {bNumberExist}
                        <br/>
                        <button className={'ui button large'} onClick={this.props.onRequestAcquire}>
                            Acquire a phone number
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AcquireNumber;