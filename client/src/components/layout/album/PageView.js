import React, { Component } from 'react'
import axios from 'axios'
import './Page.css'
import photos from '../photolist/tmpimglist'
//import ImagePicker from 'react-image-picker'
// import './PagePhotos.css'
import {withRouter} from 'react-router-dom';

//COMPONENTS
import PageLayout from './PageLayout'

function PageView({currentPhotos}) {
    
  //slice photos into 2 separate lists
  const leftPagePhotos = currentPhotos.slice(0, Math.floor((currentPhotos.length)/2));
  const rightPagePhotos = currentPhotos.slice(Math.floor((currentPhotos.length)/2), currentPhotos.length);   
      
	constructor(props){
		super(props);
		this.state = { pageLeft: 1,
				  pageRight: 2,
				  albumID: this.props.location.pathname }
		console.log(this.state);
		console.log("printed state from constructor above");
	}
	componentDidMount(){
		console.log(this.state);
		axios({method: "get",
			//url: 'https://robbiesapiteam.herokuapp.com/api/album=${this.state.albumID}/page=${this.state.pageLeft}',
			url: `https://itprojecttestapi.herokuapp.com/api/album=${this.state.albumID}/page=${this.state.pageLeft}`, 
			params: {loginToken: localStorage.getItem("loginToken"),
					uid: localStorage.getItem("uid")}
			})
			.then(res => { // then print response status
				console.log(res.statusText);
				console.log(res.data);
				try {
					const imageList = res.data.pageLeft;
					const imageList2 = res.data.pageRight;
				} catch(err){
					console.log(err);
				}
			})
	}

  render() {
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
export default withRouter(PageView); 
