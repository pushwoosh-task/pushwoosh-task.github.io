import {setAll as setFavorites} from './actions/favorites.js';

const listener = store => {
  let previousFavorites;
  
  return () => {
    const favorites = store.getState().get('favorites');
    if(favorites !== previousFavorites){ 
      window.localStorage.setItem(
        'favorites', 
        JSON.stringify(favorites.toArray())
      );
    }
    previousFavorites = favorites;
  };
};

export default store => {
  if(!window.localStorage){
    return;
  }

  const favorites = window.localStorage.getItem('favorites');

  if(favorites){
    store.dispatch(setFavorites(JSON.parse(favorites)));
  }

  store.subscribe(listener(store));  
};
