import React from 'react';
import { Switch , Route } from 'react-router-dom';

import Homepage from '../components/homepage';
import SignUpPage from '../components/signuppage';
import LogInPage from '../components/loginpage';
import Dashboard from '../components/dashboard';
import Account from '../components/account';
import PhoneNumbers from '../components/phone_numbers';
import Applications from '../components/applications';
import Confirmation from '../components/confirm';
import GithubCallback from '../components/oauth/github_callback';
import VerifyForm from '../components/verify';

const MainRouter = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/signup" component={SignUpPage}/>
            <Route exact path="/login" component={LogInPage}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/account" component={Account}/>
            <Route exact path="/phone_num" component={PhoneNumbers}/>
            <Route exact path="/apps" component={Applications}/>
            <Route exact path="/confirm" component={Confirmation}/>
            <Route exact path='/auth/github/:data' component={GithubCallback}/>
            <Route exact path='/verify/:id' component={VerifyForm}/>
        </Switch>
    </main>
)

export default MainRouter;