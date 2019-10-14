import React, { Component } from 'react';
//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'

//import "../PhotoPreview.css";

class PhotoPreview extends Component {
  render() {
    return (
        <div className="searchpage">  
            <Navbar pageName={"Search Page"}/>
            {/* <PhotoCarousell />
            <div className="container description">
                textbox
            </div> */}
        </div>
    );
  }
}
export default PhotoPreview;