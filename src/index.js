import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import getStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import 'map.prototype.tojson';

ReactDOM.render(
    <Provider store={getStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
