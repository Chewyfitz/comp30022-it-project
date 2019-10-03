import React, { Component } from 'react';

//TOOLS
import { BrowserRouter } from 'react-router-dom'

//COMPONENTS
import Navbar from './components/layout/navbar/Navbar'
import SubNavbar from './components/layout/navbar/SubNavbar'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <SubNavbar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;