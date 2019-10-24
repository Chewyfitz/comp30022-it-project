import React, { Component } from 'react';

//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import AlbumPhotoList from '../components/layout/album/AlbumPhotoList'
import Sidebar from '../components/layout/navbar/Sidebar'

import "../App.css";

class AlbumOverview extends Component {

  render() {
    return (
        <div className="mainpage">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/> 
            <div id="page-wrap">
                <Navbar pageName={"Album Overview"}/>
                <AlbumPhotoList />
            </div>
        </div>
    );
  }
}
export default AlbumOverview;