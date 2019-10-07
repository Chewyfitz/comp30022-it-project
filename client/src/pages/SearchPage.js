import React, { Component } from 'react';

//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import SubNavbar from '../components/layout/navbar/SubNavbar'
import PhotoList from '../components/layout/photolist/PhotoList'

import "../App.css";

class SearchPage extends Component {
  render() {
    return (
        <div className="searchpage">  
            <Navbar pageName={"Search Page"}/>
            <SubNavbar />
            <PhotoList />
        </div>
    );
  }
}
export default SearchPage;