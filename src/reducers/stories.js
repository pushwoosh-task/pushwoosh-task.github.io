import {Map, List} from 'immutable';

const reducers = {
  SET_STORY: (stories, {id, value}) =>
    stories.setIn(['items', id], Map(value)),

  SET_STORIES: (stories, {list}) =>
    stories.set('list', List(list)),

  SET_PAGE: (stories, {page}) =>
    stories.set('page', page)

};

const initState = Map({
  items: Map(), 
  list: List(),
  page: 0
});

export default (stories = initState, action) => 
  action.type in reducers? reducers[action.type](stories, action): stories;