import React from 'react';
import {connect} from 'react-redux';

import StoryList from './StoryList.jsx';
import {getFavorites} from '../selectors/stories.js';
import onMount from '../on-mount-hoc.jsx';
import {setPage} from '../actions/paginator.js';

const mapStateToProps = state => ({
  stories: getFavorites(state),
  count: state.get('favorites').size || 0
});

export default 
  onMount(() => setPage(0))(
  connect(mapStateToProps)(
    StoryList
  ));