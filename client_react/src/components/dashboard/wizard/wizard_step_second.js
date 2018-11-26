import React, { Component } from 'react';

class WizardStepSecond extends Component{
    render(){
        return(
            <div className={'wizard-step'}>
                <h3 className={'link back'} onClick={this.props.onBackword}><i className={'chevron left icon'}/>Step 1</h3>
                <h1>Step 2</h1>
                <br/>
                <div className={'ui text'}>
                    <div className={'ui stripe segment aligned'}>
                        <h3>You need to have a simple application set up to respond to the incoming call or use the one below. You can later change or edit the test app.</h3>
                        <br/>
                        <div className={'ui vertical'}>
                            <div className={'ui middle aligned grid container'}>
                                <div className={'eight wide column btn-custom'}>
                                    <h3>Use the Template App</h3>
                                </div>
                                <div className={'eight wide right floated column btn-custom'}>
                                    <h3>Create my Own</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'ui stripe segment aligned'}>
                        <button className={'ui button right floated large'} onClick={this.props.onForward}>Continue</button>
                        <br/><br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default WizardStepSecond;