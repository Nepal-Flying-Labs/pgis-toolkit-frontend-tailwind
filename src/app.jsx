/* eslint-disable no-nested-ternary */
import React from 'react';
import { hot } from 'react-hot-loader';
import { initDomToCode } from 'dom-to-code';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '@Components/common/PrivateRoute';
import Toast from '@Components/common/Toast';
import indexRoutes from './routes';
import './assets/css/tailwind.css';

function generateRoutes(routes) {
  return (
    <Switch>
      {routes.map(route =>
        Array.isArray(route.component) ? (
          <Route
            path={route.path}
            key={route.name}
            exact={route.exact ?? false}
          >
            {generateRoutes(route.component)}
          </Route>
        ) : route.authenticated ? (
          <PrivateRoute
            component={route.component}
            exact={route.exact ?? false}
            path={route.path}
            key={route.name}
          />
        ) : (
          <Route
            component={route.component}
            exact={route.exact ?? false}
            path={route.path}
            key={route.name}
          />
        ),
      )}
    </Switch>
  );
}

function App() {
  return (
    <div className="naxatw-font-primary">
      {process.env.NODE_ENV === 'development' && initDomToCode()}
      <Toast />
      {generateRoutes(indexRoutes)}
    </div>
  );
}

export default hot(module)(App);
