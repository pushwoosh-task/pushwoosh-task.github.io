import React from 'react';
import PropTypes from 'prop-types';

import Story from './Story.jsx';
import Paginator from './Paginator.jsx';

const StoryList = ({stories, count}) => 
  <div>
    {stories.map(storyId => 
      <Story key={storyId} id={storyId} />
    )}
    <Paginator count={count} />
  </div>;

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

export default StoryList;