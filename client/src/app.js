import React, { Component } from 'react';

//TOOLS
import { BrowserRouter, Switch } from 'react-router-dom'

//PAGES
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import AlbumView from './pages/AlbumView'

//ROUTES
import PrivateRoute from './routing/PrivateRoute'
import LoginPageRoute from './routing/LoginPageRoute'


import "./App.css";

class App extends Component {
	
	render() {
    // note that the router formatting is necessary to make the authenticated routing work, rather than having it as a component=
	  // in order to disable Private Router (to access pages without needing to be logged in), edit the PrivateRoute file as directed in the file
	return (
      <div className="App main-format">

        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path='/' component={MainPage}/>
            
            <PrivateRoute path='/album/:albumId/:view' component={AlbumView} /> 
                  
            <LoginPageRoute exact path='/login'>
              <LoginPage />
            </LoginPageRoute>

          </Switch>       
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
