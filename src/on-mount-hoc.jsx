/*
  HOC for dispacthing action on mount
  Example: 
    const SmartUserComp = dataConnect(fetchUser)(UserComp)
    
  SmartUserComp will dispatch fetchUser() action on mount
*/
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const onMount = actionCreator => Inner => {
  class Wrapper extends PureComponent{
    static propTypes = {
      __onMount: PropTypes.func.isRequired
    }

    componentWillMount(){
      this.props.__onMount();
    }

    render(){
      const {__onMount, ...props} = this.props;  //eslint-disable-line no-unused-vars
      return <Inner {...props}/>;
    }
  }

  const mapDispatchToProps = (dispatch, props) => ({
    __onMount: () => dispatch(actionCreator(props))
  });

  return connect(null, mapDispatchToProps)(Wrapper);
};

export default onMount;