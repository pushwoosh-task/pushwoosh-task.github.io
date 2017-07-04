
export const add = id => ({
  type: 'ADD_TO_FAVORITE',
  id
});

export const setAll = list => ({
  type: 'SET_FAVORITES',
  list
});