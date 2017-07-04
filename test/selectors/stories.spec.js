import {createStore} from 'redux';
import {expect} from 'chai';

import reducer from '../../src/reducer.js';
import {getStories} from '../../src/selectors/stories.js';
import {setStories} from '../../src/actions/stories.js';
import {setPage, setPageSize} from '../../src/actions/paginator.js';

const makeSeq = (a, b) => 
  Array.from(Array(b - a))
  .map((_, i) => i + a);

describe('stories selector', function() {
  it('get page', () => {
    const store = createStore(reducer);
    store.dispatch(setStories(makeSeq(0, 7)));
    store.dispatch(setPageSize(3));

    store.dispatch(setPage(0));
    expect(getStories(store.getState())).to.eql(makeSeq(0, 3));

    store.dispatch(setPage(1));
    expect(getStories(store.getState())).to.eql(makeSeq(3, 6));
    
    store.dispatch(setPage(2));
    expect(getStories(store.getState())).to.eql(makeSeq(6, 7));
  });
});