import {List} from 'immutable';

const reducers = {
  ADD_TO_FAVORITE: (favorites, {id}) => 
    favorites.unshift(id),

  SET_FAVORITES: (favorites, {list}) =>
    List(list)
};

export default (favorites = List(), action) => 
  action.type in reducers? reducers[action.type](favorites, action): favorites;