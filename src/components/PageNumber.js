import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setPage} from '../actions/paginator.js';

/*
  children is 0-based page number
*/
const PageNumber = ({children, setPage, active}) => 
  <a 
    className={`page ${active ? 'active' : ''}`} 
    onClick={setPage}
  >{children + 1}</a>;

PageNumber.propTypes = {
  children: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  active: PropTypes.bool
};

const mapStateToProps = (state, {children}) => ({
  children,
  active: state.getIn(['paginator', 'page']) == children
});

const mapDispatchToProps = (dispatch, {children}) => ({
  setPage: () => dispatch(setPage(children))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageNumber);

