import {createSelector} from 'reselect';

const paginatorState = [
  state => state.getIn(['paginator', 'page']),
  state => state.getIn(['paginator', 'size'])
];


export const getStories = createSelector([
    ...paginatorState,
    state => state.getIn(['stories', 'list'])
  ],
  (page, pageSize, stories) => 
    stories
    .slice(page*pageSize, page*pageSize + pageSize)
    .toArray()
);

export const getFavorites = createSelector([
    ...paginatorState,
    state => state.get('favorites')
  ],
  (page, pageSize, stories) => 
    stories
    .reverse()
    .slice(page*pageSize, page*pageSize + pageSize)
    .toArray()
);