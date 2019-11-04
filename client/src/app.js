import React, { Component } from 'react';

//TOOLS
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//PAGES
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import AlbumPreview from './pages/AlbumPreview'
import PhotoPreview from './pages/PhotoPreview'
import LoginPage from './pages/LoginPage'

//ROUTES
import PrivateRoute from './components/auth/PrivateRoute'
import LoginPageRoute from './components/auth/LoginPageRoute'
import AlbumOverview from './pages/AlbumOverview'
import AlbumView from './pages/AlbumView'

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
            
            <PrivateRoute exact path='/search' component={SearchPage} />
            
            <PrivateRoute path='/album/:albumId/:view' component={AlbumView} /> 

            <PrivateRoute exact path='/photo' component={PhotoPreview} /> 
                  
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
