import React, { Component } from 'react';
//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import AlbumCarousel from '../components/layout/Carousel'
import "../App.css";

class PhotoPreview extends Component {
  render() {
    return (
        <div>  
            <Navbar pageName={"Photo Preview"}/>
            <AlbumCarousel />
        </div>
    );
  }
}
export default PhotoPreview;