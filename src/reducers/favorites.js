import {OrderedSet} from 'immutable';
import makeReducer from '../make-reducer.js';

const reducers = {
  ADD_TO_FAVORITE: (favorites, {id}) => 
    favorites.add(id),

  SET_FAVORITES: (favorites, {list}) =>
    OrderedSet(list)
};

export default makeReducer(reducers, OrderedSet());
