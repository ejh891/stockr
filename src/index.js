import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import 'typeface-roboto';

import Router from './Router';
import { colors } from './settings/theme';
import getStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import './polyfills';
import './index.css';

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: colors.primary,
        },
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={muiTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Provider store={getStore()}>
                <Router />
            </Provider>
        </MuiPickersUtilsProvider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

registerServiceWorker();
