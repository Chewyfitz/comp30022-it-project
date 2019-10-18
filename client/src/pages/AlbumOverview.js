import React, { Component } from 'react';

//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import ALBUMIFY from '../components/layout/navbar/ALBUMIFY'
import AlbumPhotoList from '../components/layout/album/AlbumPhotoList'
import Sidebar from '../components/layout/navbar/Sidebar'

import "../App.css";

class MainPage extends Component {
  render() {
    return (
        <div className="mainpage">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/> 
            <div id="page-wrap">
                <Navbar pageName={"Album Overview"}/>
                <ALBUMIFY />
                <AlbumPhotoList />
            </div>
        </div>
    );
  }
}
export default MainPage;