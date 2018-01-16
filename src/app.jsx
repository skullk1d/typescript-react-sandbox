/**
 * @overview Application entry point.
 */

// Global application styles
import 'src/app.scss';

// React
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

// Our app
import reducers from './store/reducers';

import App from './app/App';
import About from './app/about';
import Home from './app/home';

const initialState = {}; // Manages global state for app

const createStoreWithMiddleware = compose(
	applyMiddleware(
		thunk,
		promiseMiddleware(),
		routerMiddleware(browserHistory)
	)
)(createStore);

const store = createStoreWithMiddleware(reducers, initialState);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='about' component={About}/>
        <Route path='home' component={Home}/>
        <Redirect from='*' to='/home'/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
