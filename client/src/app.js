import React, { Component } from 'react';

//TOOLS
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//PAGES
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import AlbumPreview from './pages/AlbumPreview'

import "./App.css";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App main-format">

          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/search' component={SearchPage} />
            <Route exact path='/album' component={AlbumPreview} />
          </Switch>       

        </div>
      </BrowserRouter>

    );
  }
}


export default App;