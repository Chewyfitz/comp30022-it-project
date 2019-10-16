import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";


// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
	  //in order to disable, replace the next line with true
        localStorage.getItem('loginToken') 
		? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
