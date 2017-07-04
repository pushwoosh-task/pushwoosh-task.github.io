import {expect} from 'chai';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Map, List} from 'immutable';
import mockResponses from '../mock-responses.js';

import reducer from '../../src/reducer.js';
import {fetchStories, fetchStory, setStory} from '../../src/actions/stories.js';
import fetch from '../../src/fetch-middleware.js';


describe('stories actions', () => {
  let store;
  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk, fetch));
    return mockResponses();
  });

  it('fetchStories', () => 
    store.dispatch(fetchStories())
    .then(() => {
      expect(store.getState().getIn(['stories', 'list']))
      .to.eql(List(require('../mocks/newstories.json')));
    })
  );

  it('fetchStory', () => 
    store.dispatch(fetchStory('1'))
    .then(() => {
      expect(store.getState().getIn(['stories', 'items']))
      .to.eql(Map({
        1: Map(require('../mocks/item/1.json'))
      }));
    })
  );

  it('fetchStory does not get story twice', () => {
    store.dispatch(setStory('1', require('../mocks/item/1.json')));
    expect(store.dispatch(fetchStory('1'))).to.be.not.ok;
  });
});