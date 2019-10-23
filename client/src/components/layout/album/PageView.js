import React, { Component } from 'react'
import './Page.css'
import photos from '../photolist/tmpimglist'
//import ImagePicker from 'react-image-picker'

//COMPONENTS
import PageLayout from './PageLayoutTest'

//slice photos into 2 separate lists
const leftPagePhotos = photos.slice(0, Math.floor((photos.length)/2));
const rightPagePhotos = photos.slice(Math.floor((photos.length)/2), photos.length);


class PageView extends Component {

  render() {
    return (
      
      <div className='album-format'>      
        
        

        <div className=" album-page-left">
            
          <PageLayout photolist={leftPagePhotos}/>

        </div>   

        {/* <ImagePicker images={imageList2.map((image, i) => ({src: image, value: i}))} /> */}
        <div className=" album-page-right">
          
          <PageLayout photolist={rightPagePhotos}/>
          
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