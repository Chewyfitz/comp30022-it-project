import React, { Component } from 'react'
import './Page.css'
//import ImagePicker from 'react-image-picker'

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


const PageLayout = () => {


    return (
        <div>
            <div class="row text-center text-lg-left image-layout-container">

                <div class="col-lg-3 col-md-4 col-6 ">
                    <a href='/photo' class="d-block mb-4 h-100 ">
                        <img class="img-fluid img-thumbnail image-album-container" src={img1} alt=""/>
                    </a>
                </div>
                <div class="col-lg-3 col-md-4 col-6">
                    <a href='/photo' class="d-block mb-4 h-100 image-thumbnail-container">
                        <img class="img-fluid img-thumbnail image-album-container" src={img2} alt=""/>
                    </a>
                </div>
            </div>  
            
            <div class="row text-center text-lg-left image-layout-container">

                <div class="col-lg-3 col-md-4 col-6">
                    <a href='/photo' class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail image-album-container" src={img7} alt=""/>
                    </a>
                </div>
                <div class="col-lg-3 col-md-4 col-6">
                    <a href='/photo' class="d-block mb-4 h-100 image-thumbnail-container">
                            <img class="img-fluid img-thumbnail image-album-container" src={img4} alt=""/>
                    </a>
                </div>
            </div> 

            <div class="row text-center text-lg-left image-layout-container">

                <div class="col-lg-3 col-md-4 col-6">
                    <a href='/photo' class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail image-album-container" src={img5} alt=""/>
                    </a>
                </div>
                <div class="col-lg-3 col-md-4 col-6">
                    <a href='/photo' class="d-block mb-4 h-100 image-thumbnail-container">
                            <img class="img-fluid img-thumbnail image-album-container" src={img6} alt=""/>
                    </a>
                </div>
            </div>  
        </div>    
    )
  }

export default PageLayout; 