import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {routerMiddleware, push} from 'react-router-redux';

import reducer from '../../src/reducer.js';
import App from '../../src/components/App.jsx';
import Feed from '../../src/components/Feed.jsx';
import Favorites from '../../src/components/Favorites.jsx';


describe('App component', () => {
  let store, history, app;

  beforeEach(() => {
    history = createMemoryHistory();
    store = createStore(
      reducer, 
      applyMiddleware(routerMiddleware(history), thunk)
    );
    
    app = mount(<App store={store} history={history} />);
  });

  it('Feed on main page', () => {
    expect(app.find(Feed)).to.have.length(1);
  });

  it('Favorites on /favorites page', () => {
    store.dispatch(push('/favorites'));
    expect(app.find(Favorites)).to.have.length(1);
  });
});