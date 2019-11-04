import React, { Component } from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";


// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated

class PrivateRoute extends Component {
    render() {
        const {component: Component, ...props} = this.props;
        // console.log(props);
        return(
            <Route
                {...props}
                render={props => (
                    localStorage.getItem('loginToken') ?
                    <Component {...props} /> :
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: this.props.location },
                        }} />
                )}
            />
        )
    }
}

export default PrivateRoute;