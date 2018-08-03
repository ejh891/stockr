/* eslint-disable no-underscore-dangle */ // allow dangling underscore in var name because we have no control over it

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

let _store;
export default function getStore() {
  if (_store === undefined) {
    _store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunk),
    );
  }

  return _store;
}
