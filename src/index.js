import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';

import Router from './Router';
import getStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import './polyfills';

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#0099fe',
        },
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={muiTheme}>
        <Provider store={getStore()}>
            <Router />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

registerServiceWorker();
