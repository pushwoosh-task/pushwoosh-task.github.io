import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import createHashHistory from 'history/createHashHistory';

import reducer from './reducer.js';
import App from './components/App.jsx';
import fetch from './fetch-middleware.js';
import {setAll as setFavorites} from './actions/favorites.js';
import favoritesListener from './favorites-listener.js';

const history = createHashHistory();

let middleware = applyMiddleware(routerMiddleware(history), thunk, fetch);

if(process.env.NODE_ENV == 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){ // eslint-disable-line no-undef
  middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware);
}

const store = createStore(
  reducer,
  middleware
);

if(window.localStorage){
  const favorites = window.localStorage.getItem('favorites');
  if(favorites){
    store.dispatch(setFavorites(JSON.parse(favorites)));
  }
}

store.subscribe(favoritesListener(store));  //save favorites to localStorage

if(process.env.NODE_ENV == 'development'){ // eslint-disable-line no-undef
  window.store = store;
}

render(
  <App store={store} history={history} />,
  document.getElementById('app')
);
