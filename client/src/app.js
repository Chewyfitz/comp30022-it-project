import React, { Component } from 'react';

//TOOLS
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//PAGES
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import AlbumPreview from './pages/AlbumPreview'
import PhotoPreview from './pages/PhotoPreview'
import LoginPage from './pages/auth/LoginPage'

//ROUTES
import PrivateRoute from './components/auth/PrivateRoute'
import LoginPageRoute from './components/auth/LoginPageRoute'

import "./App.css";
import backgroundpic from './components/layout/photolist/images/fav.jpg'



class App extends Component {
	
	render() {
    // note that the router formatting is necessary to make the authenticated routing work, rather than having it as a component=
	// in order to disable Private Router (to access pages without needing to be logged in), edit the PrivateRoute file as directed in the file
	return (
      <div className="App main-format">
        <div id="background">
          <img src={backgroundpic} class="stretch" alt="" />
        </div>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path='/'> 
				<MainPage />
			</PrivateRoute> 
			
			<PrivateRoute exact path='/search'> 
				<SearchPage />
			</PrivateRoute> 
			
			<PrivateRoute path='/album'> 
				<AlbumPreview />
			</PrivateRoute> 
			
			<PrivateRoute exact path='/photo'> 
				<PhotoPreview />
			</PrivateRoute> 
            
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