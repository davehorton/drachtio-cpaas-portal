import React, { Component } from 'react';
import WhiteImage from '../../white-image.png';

class Functionality extends Component{
    render(){
        return(
            <div className={'ui vertical stripe'}>
                <div className={'ui middle aligned stackable grid container'}>
                    <div className={'six wide column'}>
                        <h1 className={'ui header'}>
                            Breadth of functionality
                        </h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div>
                    <div className={'eight wide right floated column'}>
                        <img src={WhiteImage} className={'ui large bordered rounded image'} alt={"Breadth of Functionality"}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Functionality;