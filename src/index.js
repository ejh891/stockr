import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Router from './Router';
import getStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import './polyfills';

const muiTheme = createMuiTheme({
    palette: {
        primary: '#38454f',
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
