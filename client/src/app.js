import React, { Component } from 'react';

//TOOLS
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//PAGES
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import AlbumPreview from './pages/AlbumPreview'
import PhotoPreview from './pages/PhotoPreview'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import AlbumOverview from './pages/AlbumOverview'
import AlbumPhotoList from './components/layout/album/AlbumPhotoList'

import "./App.css";
import backgroundpic from './components/layout/photolist/images/fav.jpg'

class App extends Component {

  render() {
    return (
      <div className="App main-format">
        <div id="background">
          <img src={backgroundpic} class="stretch" alt="" />
        </div>

        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/search' component={SearchPage} />
            <Route exact path='/album' component={AlbumPhotoList} />
            <Route exact path='/photo' component={PhotoPreview} />
            <Route exact path='/signup' component={SignIn} />
            <Route exact path='/signin' component={SignUp} />
          </Switch>       
        </BrowserRouter>
      
      </div>

    );
  }
}
export default App;