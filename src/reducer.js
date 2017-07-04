import {Map} from 'immutable';

import stories from './reducers/stories.js';
import favorites from './reducers/favorites.js';
import paginator from './reducers/paginator.js';

export const combineReducers = reducers => (state = Map(), action) =>
  Object.keys(reducers).reduce((newState, key) =>
    newState.update(key, state => reducers[key](state, action)), state);


export default combineReducers({
  stories,
  favorites,
  paginator
});

