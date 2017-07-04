import {Map} from 'immutable';
import makeReducer from '../make-reducer.js';

const reducers = {
  SET_PAGE: (paginator, {page}) => 
    paginator.set('page', page),
  
  DEC_PAGE: paginator =>
    paginator.update('page', page => page - 1),
  
  INC_PAGE: paginator =>
    paginator.update('page', page => page + 1),

  SET_PAGE_SIZE: (paginator, {size}) =>
    paginator.set('size', size)
};

const initState = Map({
  page: 0, 
  size: 10
});

export default makeReducer(reducers, initState);