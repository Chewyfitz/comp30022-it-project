import React, { Component } from 'react';

//TOOLS
import { BrowserRouter } from 'react-router-dom'

//COMPONENTS
import Navbar from './components/layout/navbar/Navbar'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;