import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import reducer from '../../src/reducer.js';
import {setStory, setStories} from '../../src/actions/stories.js';
import Feed from '../../src/components/Feed.jsx';

describe('Feed component', () => {
  it('show stories from store', () => {
    const store = createStore(reducer, applyMiddleware(thunk));

    const storiesMock = require('../mocks/newstories.json');
    store.dispatch(setStories(storiesMock));
    
    storiesMock.forEach(id => 
      store.dispatch(setStory(id, require(`../mocks/item/${id}.json`)))
    );

    const stories = mount(<Provider store={store}>
      <Feed />
    </Provider>);

    expect(stories.find('.story')).to.have.length(3);
  });
});