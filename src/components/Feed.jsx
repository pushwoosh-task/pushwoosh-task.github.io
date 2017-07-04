import React from 'react';
import {connect} from 'react-redux';

import StoryList from './StoryList.jsx';
import onMount from '../on-mount-hoc.jsx';
import {fetchStories} from '../actions/stories.js';
import {getStories} from '../selectors/stories.js';

const mapStateToProps = state => ({
  stories: getStories(state)
});

export default 
  onMount(fetchStories)(
    connect(mapStateToProps)(
      StoryList
  ));