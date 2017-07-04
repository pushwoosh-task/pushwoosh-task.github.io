import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';

import Menu from './Menu.jsx';
import Feed from './Feed.jsx';
import Favorites from './Favorites.jsx';

const App = ({store, history}) => 
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
      <Menu />
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route path="/favorites" component={Favorites} />
        </Switch>
      </div>
    </ConnectedRouter>  
  </Provider>;

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default App;