import React, { Component } from 'react';
//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'


//import images from local
import img1 from '../components/layout/photolist/temp_images/1.png'
import img2 from '../components/layout/photolist/temp_images/2.png'
import img3 from '../components/layout/photolist/temp_images/3.png'

//import axios from 'axios'
const imageList = [img1, img2, img3]
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