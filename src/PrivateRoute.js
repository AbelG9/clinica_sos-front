import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext'

function PrivateRoute({ component: Component, ...rest }) {
  const { state } = useContext(AuthContext)

  return(
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('AuthStatus') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;