import React, { Component } from 'react';

//TOOLS
import { BrowserRouter } from 'react-router-dom'

//COMPONENTS
import Navbar from './components/layout/navbar/Navbar'
import SubNavbar from './components/layout/navbar/SubNavbar'
import Sidebar from './components/layout/navbar/Sidebar'

import "./App.css";

class App extends Component {
  render() {
    return (

      <div className="RootElement">
        <div className="App">
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
            
          <div className="navbar-margins" id="page-wrap">
            <Navbar />
            <SubNavbar />
          </div> 
            
        </div>
      </div>

    );
  }
}
//first component: which class we want to render to DOM
//second component: where we want to render it
//ReactDOM.render(<App />, document.getElementById('root'))

export default App;