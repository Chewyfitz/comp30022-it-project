import React, { Component } from 'react'
import './Page.css'
//import ImagePicker from 'react-image-picker'

//COMPONENTS
import PageLayout from './PageLayout'

//import images from local
import img1 from '../photolist/temp_images/1.png'
import img2 from '../photolist/temp_images/2.png'
import img3 from '../photolist/temp_images/3.png'
import img4 from '../photolist/temp_images/4.png'
import img5 from '../photolist/temp_images/5.png'
import img6 from '../photolist/temp_images/6.png'
import img7 from '../photolist/temp_images/7.png'
import img8 from '../photolist/temp_images/8.png'
import img9 from '../photolist/temp_images/9.png'
import img10 from '../photolist/temp_images/10.png'
import img11 from '../photolist/temp_images/11.png'
import img12 from '../photolist/temp_images/12.png'
import img13 from '../photolist/temp_images/13.png'
//import axios from 'axios'
const imageList = [img1, img2, img3, img4, img5, img6]
const imageList2 = [img7, img8, img9, img10, img11, img12]


class PageView extends Component {

  render() {
    return (
      <div className='album-format container'>      
        
        {/* <PageLayout pageSide={"Album Name"}/> */}

        <div className="container page-left">
            
          <PageLayout />

        </div>   

        {/* <ImagePicker images={imageList2.map((image, i) => ({src: image, value: i}))} /> */}
        <div className="container page-right">
          
          <PageLayout />
          
        </div>  


        {/* Pagination */}
        <nav class="pagination pagination-location">
          <li class="page-item disabled">
            <a class="page-link pagination-disabled" href="#" tabindex="-1" aria-disabled="true">Previous</a>
          </li>
          <li class="page-item"><a class="page-link pagination-button" href="#">1</a></li>
          <li class="page-item active" aria-current="page">
            <a class="page-link pagination-selected" href="#">2 <span class="sr-only">(current)</span></a>
          </li>
          <li class="page-item"><a class="page-link pagination-button" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link pagination-button" href="#">Next</a>
          </li>
        </nav>
      </div>
    )
  }
}
export default PageView; 