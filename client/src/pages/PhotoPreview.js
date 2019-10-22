import React, { Component } from 'react';
//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import Carousel from '../components/layout/Carousel'
import "../App.css";

class PhotoPreview extends Component {
  render() {
    return (
        <div>  
            <Navbar pageName={"Photo Preview"}/>
            <Carousel />
        </div>
    );
  }
}
export default PhotoPreview;