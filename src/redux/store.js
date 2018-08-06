/* eslint-disable no-underscore-dangle */ // allow dangling underscore in var name because we have no control over it

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as searchReducer, reduxSearch } from 'redux-search'

import reducer from './reducer';

const rootReducer = combineReducers({
  search: searchReducer,
  main: reducer,
});

const enhancer = compose(
  applyMiddleware(thunk),
  reduxSearch({
    resourceIndexes: {
      availableSymbolMap: ['symbol', 'name'],
    },
    resourceSelector: (resourceName, state) => {
      return state.main[resourceName];
    },
  }),
);

let _store;
export default function getStore() {
  if (_store === undefined) {
    _store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      enhancer,
    );
  }

  return _store;
}
