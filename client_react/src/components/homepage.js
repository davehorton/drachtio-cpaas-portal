import React, {Component} from 'react';

import NormalHeader from './headers/normal_header';
import Gallery from './Homepage/gallery';
import LearnMore from './Homepage/learn_more';
import SeeDocs from './Homepage/see_docs';
import Functionality from './Homepage/functionality';
import GoogleDialogFlow from './Homepage/googleDF';
import WhyChooseUs from './Homepage/why_choose_us';
import QuickTry from './Homepage/quick_try';
import ContactUs from './Homepage/contact_us';

class Homepage extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <NormalHeader/>
                <Gallery/>
                <LearnMore/>
                <SeeDocs/>
                <Functionality/>
                <GoogleDialogFlow/>
                <WhyChooseUs/>
                <QuickTry/>
                <ContactUs/>
            </div>
        )
    }
}

export default Homepage;