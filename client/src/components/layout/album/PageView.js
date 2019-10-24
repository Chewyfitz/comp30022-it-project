import React, { Component } from 'react'
import './Page.css'
import photos from '../photolist/tmpimglist'
//import ImagePicker from 'react-image-picker'

//COMPONENTS
import PageLayout from './PageLayoutTest'

function PageView({currentPhotos}) {
    
  //slice photos into 2 separate lists
  const leftPagePhotos = currentPhotos.slice(0, Math.floor((currentPhotos.length)/2));
  const rightPagePhotos = currentPhotos.slice(Math.floor((currentPhotos.length)/2), currentPhotos.length);

  return (
    
    <div className='album-format'>        

      <div className= "album-page-left">
        
        <PageLayout className="album" photolist={leftPagePhotos}/>

      </div>   

      {/* <ImagePicker images={imageList2.map((image, i) => ({src: image, value: i}))} /> */}
      <div className=" album-page-right">
        
        <PageLayout photolist={rightPagePhotos}/>
        
      </div>  


    </div>
  )

}
export default PageView; 