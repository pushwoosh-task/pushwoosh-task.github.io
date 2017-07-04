/*eslint-env node*/
import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import {createHashHistory} from 'history';

import reducer from './reducer.js';
import App from './components/App.jsx';
import fetch from './fetch-middleware.js';
import setupFavoritesStorage from './favorites-storage.js';

const history = createHashHistory();

let middleware = applyMiddleware(routerMiddleware(history), thunk, fetch);

if(process.env.NODE_ENV == 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){ 
  middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware);
}

const store = createStore(reducer, middleware);
setupFavoritesStorage(store); //save favorites to localStorage

if(process.env.NODE_ENV == 'development'){ 
  window.store = store;
}

render(
  <App store={store} history={history} />,
  document.getElementById('app')
);
