import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

import onMount from '../on-mount-hoc.jsx';
import {fetchStory} from '../actions/stories.js';
import {add as addToFavorites} from '../actions/favorites.js';

const getUrlOrigin = url => 
  url? new URL(url).origin: '';

const formatTime = time =>
  moment(time*1000).format('DD.MM.YY HH:mm');

export const Story = ({isLoaded, title, time, url, like, liked}) => {
  if(!isLoaded) return null;

  return (
    <div className="story panel panel-default">
      <div className="panel-body">
        {
          !liked? 
          <div 
            className="btn btn-default like pull-right" 
            onClick={like}
          >
            <span className="glyphicon glyphicon-heart" />
          </div>:
          null
        }
        <a href={url} target="_blank" className="title">{title}</a>
        <br/>
        <a href={url} target="_blank" className="url">{getUrlOrigin(url)}</a>
        <div className="time">{formatTime(time)}</div>
      </div>
    </div>);
};

Story.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  title: PropTypes.string,
  time: PropTypes.number,
  url: PropTypes.string,
  like: PropTypes.func.isRequired,
  liked: PropTypes.bool
};

const mapStateToProps = (state, {id}) => {
  const story = state.getIn(['stories', 'items', id]);
  
  const props = {
    isLoaded: !!story,
    liked: state.get('favorites').has(id)
  };

  if(story){
    ['title', 'time', 'url'].forEach(key => {props[key] = story.get(key);});
  }

  return props;
};

const mapDispatchToProps = (dispatch, {id}) => ({
  like: () => dispatch(addToFavorites(id))
});

export default 
  onMount(({id}) => fetchStory(id))(
  connect(mapStateToProps, mapDispatchToProps)(
    Story
  ));