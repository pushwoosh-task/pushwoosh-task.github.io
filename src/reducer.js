import {Map} from 'immutable';

import stories from './reducers/stories.js';
import favorites from './reducers/favorites.js';

export const combineReducers = reducers => (state = Map(), action) =>
  Object.keys(reducers).reduce((newState, key) =>
    newState.set(key, reducers[key](newState.get(key), action)), state);


export default combineReducers({
  stories,
  favorites
});

