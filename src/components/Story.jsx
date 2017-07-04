import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import onMount from '../on-mount-hoc.jsx';
import {fetchStory} from '../actions/stories.js';
import {add as addToFavorite} from '../actions/favorites.js';

export const Story = ({isLoaded, title, time, url, like}) => {
  if(!isLoaded) return null;

  return (
    <div className="story">
      <div className="title">{title}</div>
      <a href={url}>{url}</a>
      <div className="time">{time}</div>
      <div className="btn btn-default like" onClick={like}>Add to favorite</div>
    </div>);
};

Story.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  title: PropTypes.string,
  time: PropTypes.number,
  url: PropTypes.string,
  like: PropTypes.func.isRequired
};

const mapStateToProps = (state, {id}) => {
  const story = state.getIn(['stories', 'items', id]);
  
  const props = {isLoaded: !!story};

  if(story){
    ['title', 'time', 'url'].forEach(key => {props[key] = story.get(key);});
  }
  return props;
};

const mapDispatchToProps = (dispatch, {id}) => ({
  like: () => dispatch(addToFavorite(id))
});

export default 
  onMount(({id}) => fetchStory(id))(
    connect(mapStateToProps, mapDispatchToProps)(
      Story
    )
  );