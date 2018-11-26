import React, { Component } from 'react';

import StartWizard from './wizard/start_wizard';
import WizardStepFirst from './wizard/wizart_step_first';
import WizardStepSecond from './wizard/wizard_step_second';
import WizardStepThird from './wizard/wizard_step_third';

class Wizard extends Component{
    constructor(props){
        super(props);
        this.onStart = this.onStart.bind(this);
        this.onSkip = this.onSkip.bind(this);
        this.state = {
            wizardStarted : false,
            currentStep : 1
        }

        this.onForward = this.onForward.bind(this);
        this.onBackword = this.onBackword.bind(this);
    }

    onForward(){
        if(this.state.currentStep < 3)
            this.setState({
                currentStep : this.state.currentStep + 1}
            );
        else if(this.state.currentStep === 3)
            this.props.onCompleted();
    }

    onBackword(){
        if(this.state.currentStep > 1)
            this.setState({
                currentStep : this.state.currentStep - 1}
            );
    }

    onStart(){
        this.setState({wizardStarted:true});
    }

    onSkip(){
        console.log('skip wizard');
        this.props.onSkipped();
    }

    render(){
        let currentElement;
        if(this.state.wizardStarted === false)
            currentElement = <StartWizard onStart={this.onStart} onSkip={this.onSkip}/>;
        else{
            if(this.state.currentStep === 1)
                currentElement = <WizardStepFirst onForward = {this.onForward} onBackword = {this.onBackword}/>
            else if(this.state.currentStep === 2)
                currentElement = <WizardStepSecond onForward = {this.onForward} onBackword = {this.onBackword}/>
            else if(this.state.currentStep === 3)
                currentElement = <WizardStepThird onForward = {this.onForward} onBackword = {this.onBackword}/>
        }
        return(
            <div className={'align center'}>
                {currentElement}
            </div>
        )
    }
}

export default Wizard;