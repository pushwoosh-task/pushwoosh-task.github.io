export const setStory = (id, value) => ({
  type: 'SET_STORY',
  id,
  value
});

export const setStories = list => ({
  type: 'SET_STORIES',
  list
});


export const fetchStories = () => dispatch => 
  dispatch({
    type: 'FETCH',
    url: '/newstories.json',
    success: resp => setStories(resp)
  });


export const fetchStory = id => (dispatch, getState) => {
  if(getState().getIn(['stories', 'items', id])){
    return;
  }
  
  return dispatch({
    type: 'FETCH',
    url: `/item/${id}.json`,
    success: resp => setStory(id, resp)
  });
};

export const setPage = page => ({
  type: 'SET_PAGE',
  page
});