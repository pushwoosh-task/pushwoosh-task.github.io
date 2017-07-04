
export default store => {
  let previousFavorites;
  
  if(!window.localStorage){
    return () => {};
  }

  return () => {
    const favorites = store.getState().get('favorites');
    if(favorites !== previousFavorites){ 
      window.localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    previousFavorites = favorites;
  };
};