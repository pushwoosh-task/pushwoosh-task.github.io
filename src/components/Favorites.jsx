import React from 'react';
import {connect} from 'react-redux';

import StoryList from './StoryList.jsx';
import {getFavorites} from '../selectors/stories.js';

const mapStateToProps = state => ({
  stories: getFavorites(state)
});

export default connect(mapStateToProps)(StoryList);