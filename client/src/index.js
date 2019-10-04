import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';


//renders app for you, gets app puts into html to get actually printed
ReactDOM.render(<App />, document.getElementById('root'));

function SideOpen(state = 'True', action) {
  switch (action.type) {
    case 'Open':
      return 'True'
    case 'Close':
      return 'False'
    default:
      return state
  }
}

let SideOpenStore = createStore(SideOpen)

export { SideOpenStore };

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}



const useStyles = makeStyles(theme => ({
	appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function router() {
	return (
	<Router>
      <div>
        

        <Route component={SideBar} />
		<div Style="width: 'calc(100%-${drawerWidth}px)' marginLeft: drawerWidth">
        <Route exact path="/" component={Home} />
        <Route path="/SignUp" component={SignUp} />
		<Route path="/Album" component={Album} />
			{//<PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
			// Use nested routers, authenticate for all pages.
			}
			</div>
		
      </div>
    </Router>
	);
}

//ReactDOM.render(<
//ReactDOM.render(<Album />, document.getElementById('root'));
ReactDOM.render(router(), document.getElementById('root'));