import React, { Component } from 'react';
//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'

//import "../PhotoPreview.css";

class PhotoPreview extends Component {
  render() {
    return (
        <div>  
            <Navbar pageName={"Photo Preview"}/>
            <div class="carousel-item">
              <img src="la.jpg" alt="Los Angeles"/>
              <div class="carousel-caption">
                <p>We had such a great time in LA!</p>
              </div>
            </div>
        </div>
    );
  }
}
export default PhotoPreview;