import {createSelector} from 'reselect';

const pageSize = 20;

export const getStories = createSelector([
    state => state.getIn(['stories', 'page']),
    state => state.getIn(['stories', 'list'])
  ],
  (page, stories) => stories.slice(page*pageSize, page*pageSize + pageSize).toArray()
);

export const getFavorites = createSelector([
    state => state.getIn(['stories', 'page']),
    state => state.get('favorites')
  ],
  (page, stories) => stories.slice(page*pageSize, page*pageSize + pageSize).toArray()
);