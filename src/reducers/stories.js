import {Map, List} from 'immutable';
import makeReducer from '../make-reducer.js';

const reducers = {
  SET_STORY: (stories, {id, value}) =>
    stories.setIn(['items', id], Map(value)),

  SET_STORIES: (stories, {list}) =>
    stories.set('list', List(list))
};

const initState = Map({
  items: Map(), 
  list: List()
});

export default makeReducer(reducers, initState);