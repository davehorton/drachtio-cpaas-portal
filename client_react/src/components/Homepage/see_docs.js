import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WhiteImage from '../../white-image.png';

class SeeDocs extends Component{
    render(){
        return(
            <div className={'ui vertical stripe'}>
                <div className={'ui middle aligned stackable grid container'}>
                    <div className={'eight wide column'}>
                        <img src={WhiteImage} className={'ui large bordered rounded image'} alt={"See Docs"}/>
                    </div>
                    <div className={'six wide right column'}>
                        <h1 className={'ui header'}>
                            Ease of use of API
                        </h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        <Link to="/#">See Documentation</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default SeeDocs;