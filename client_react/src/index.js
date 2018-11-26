import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import MainRouter from './router';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <MainRouter />
    </BrowserRouter>
    , document.getElementById('root'));
serviceWorker.unregister();
