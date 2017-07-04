import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {List} from 'immutable';

import reducer from '../../src/reducer.js';
import {setStory} from '../../src/actions/stories.js';
import Story from '../../src/components/Story.jsx';

const storyMock = require('../mocks/item/1.json');

describe('Story component', () => {
  let store, story;

  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk));
    story = mount(<Provider store={store}>
        <Story id={'1'} />
      </Provider>);
  });

  it('show nothing if story not loaded', () => {
    expect(story.find('.story')).to.have.length(0);
  });

  it('show story from store', () => {
    store.dispatch(setStory('1', storyMock));

    expect(story.find('.story')).to.have.length(1);
    expect(story.find('.story .title').text()).to.eql(storyMock.title);
    expect(story.find('.story a').prop('href')).to.eql(storyMock.url);
    expect(story.find('.story .time')).to.have.length(1);
  });

  it('add to favorite on click', () => {
    store.dispatch(setStory('1', storyMock));
    
    story.find('.like').simulate('click');

    expect(store.getState().get('favorites')).to.eql(List(['1']));
  });

  describe('Story lifecycle', () => {
    let fetchCalled, store;

    const fetch = store => next => action => {
      if(action.type == 'FETCH' && action.url == '/item/1.json'){
        fetchCalled = true;
      }
      return next(action);
    };

    beforeEach(() => {
      fetchCalled = false;
      store = createStore(reducer, applyMiddleware(thunk, fetch));
    });
    
    it('load story on mount', () => {
      mount(<Provider store={store}>
          <Story id={'1'} />
        </Provider>);
     
      expect(fetchCalled).to.be.ok;
    });

    it('doesnt load story if it already in store', () => {
      store.dispatch(setStory('1', storyMock));
      
      mount(<Provider store={store}>
          <Story id={'1'} />
        </Provider>);
     
      expect(fetchCalled).to.be.not.ok;
    });
  });
});