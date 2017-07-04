import React from 'react';
import PropTypes from 'prop-types';

import Story from './Story.jsx';

const StoryList = ({stories}) => 
  <div>
    {stories.map(storyId => 
      <Story key={storyId} id={storyId} />
    )}
  </div>;

StoryList.propTypes = {
  stories: PropTypes.array.isRequired
};

export default StoryList;