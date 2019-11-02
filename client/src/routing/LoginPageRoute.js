import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";


// A wrapper for <Route> that redirects away from the login
// screen if you're authenticated

export default function LoginPageRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !localStorage.getItem('loginToken') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
