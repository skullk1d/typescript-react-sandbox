import React from 'react';
import { Link } from 'react-router';

const menuItems = [
  { id: 'home', name: 'Home'},
  { id: 'about', name: 'About'},
  { id: 'feed', name: 'Feed'},
];

const Navigation = () => (
  <nav className='navbar navbar-expand-lg my-4'>
    <h1 className='navbar-brand mb-0'>My app</h1>
    <div className='collapse navbar-collapse'>
      <ul className='navbar-nav mr-auto'>
        {menuItems.map((item, i) =>
          <li className='nav-item' key={i}>
            <Link to={`/${item.id}`} className='nav-link' activeClassName='active'>{item.name}</Link>
          </li>
        )}
      </ul>
    </div>
  </nav>
);

export default Navigation;
