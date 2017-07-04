import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PageNumber from './PageNumber.js';
import {decPage, incPage} from '../actions/paginator.js';

const makeSeq = (a, b) => 
  Array.from(Array(b - a))
  .map((_, i) => i + a);

const Paginator = ({count, size, active, decPage, incPage}) => { 
  const pageRange = 5;
  
  const maxPossiblePage = Math.floor(count/size) + (count%size ? 1: 0);

  const maxPage = Math.min(maxPossiblePage, active + pageRange);
  const minPage = Math.max(0, active - pageRange);

  return (
    <nav className="pages">
      <ul className="pagination">
        {
          active !=0 ? 
          <li><a className="prevPage" onClick={decPage}>prev</a></li>: 
          null
        }
        {
          makeSeq(minPage, maxPage).map(page => 
            <li 
              key={page}
              className={`${active == page? 'active': ''}`}
            >
              <PageNumber>{page}</PageNumber>
            </li>)
        }
        {
          active != maxPossiblePage - 1 ? 
          <li><a className="nextPage" onClick={incPage}>next</a></li>: 
          null
        }
      </ul>
    </nav>);
};

Paginator.propTypes = {
  active: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  decPage: PropTypes.func.isRequired,
  incPage: PropTypes.func.isRequired
};

const mapStateToProps = (state, {count}) => ({
  count,
  active: state.getIn(['paginator', 'page']),
  size: state.getIn(['paginator', 'size'])
});

const mapDispatchToProps = dispatch => ({
  decPage: () => dispatch(decPage()),
  incPage: () => dispatch(incPage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);