import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRoute({ path, component: Component }) {
  const history = useHistory();
  const token = localStorage.getItem('userToken');
  const landingPage = useSelector(state => state.authentication.landingPage);
  const pathLength = path.split('/').length;
  const landingLength = landingPage?.page.split('/').length;

  const getRedirectRoute = () => {
    if (token) {
      history.goBack();
    }
  };

  return landingPage ? (
    <Route
      path={path}
      render={props =>
        token && landingLength <= pathLength ? (
          <Component {...props} />
        ) : (
          getRedirectRoute()
        )
      }
    />
  ) : (
    <Route
      path={path}
      render={props =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};
