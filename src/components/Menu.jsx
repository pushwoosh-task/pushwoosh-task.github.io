import React from 'react';
import {NavLink} from 'react-router-dom';

const Menu = () => 
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <ul className="nav navbar-nav">
        <li><NavLink exact to={'/'}>Hacker News</NavLink></li>
        <li><NavLink to={'/favorites'}>Favorites</NavLink></li>
      </ul>
    </div>
  </nav>;

export default Menu;