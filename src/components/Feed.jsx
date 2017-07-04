import React from 'react';
import {connect} from 'react-redux';

import StoryList from './StoryList.jsx';
import onMount from '../on-mount-hoc.jsx';
import {fetchStories} from '../actions/stories.js';
import {getStories} from '../selectors/stories.js';
import {setPage} from '../actions/paginator.js';

const mapStateToProps = state => ({
  stories: getStories(state),
  count: state.getIn(['stories', 'list']).size || 0
});

export default 
  onMount(() => setPage(0))(
  onMount(fetchStories)(
  connect(mapStateToProps)(
    StoryList
  )));