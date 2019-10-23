import React, { Component } from 'react';

//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import SubNavbar from '../components/layout/navbar/SubNavbar'
import UnAlbumPhotoList from '../components/layout/photolist/UnAlbumPhotoList'

import "../App.css";

class SearchPage extends Component {
  render() {
    return (
        <div className="searchpage">  
            <Navbar pageName={"Search Page"}/>
            <SubNavbar />
            <UnAlbumPhotoList />
        </div>
    );
  }
}
export default SearchPage;