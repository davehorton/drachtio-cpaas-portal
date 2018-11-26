import React, { Component } from 'react';

class ContactUs extends Component{
    render(){
        return(
            <div className={'ui vertical stripe'}>
                <div className={'ui middle aligned stackable grid container'}>
                    <div className={'six wide column'}>
                        <h1 className={'ui header'}>
                            Contact us for more information
                        </h1>
                    </div>
                    <div className={'eight wide right floated column'}>
                        <div className={'ui segment'}>
                            <h1>CONTACT FORM</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactUs;