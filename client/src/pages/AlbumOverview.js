import React, { Component } from 'react';

//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import AlbumPhotoList from '../components/layout/album/AlbumPhotoList'
import Sidebar from '../components/layout/navbar/Sidebar'
import makeAlbumList from '../components/layout/photolist/tmpimglist';
import { getImagesfromAlbum } from '../components/api/api'

import "../App.css";

class AlbumOverview extends Component {
	constructor(props){
		super(props);
		this.state = {newList: []};
		var finalImageList = [];
		getImagesfromAlbum(window.location.pathname.slice(7), localStorage.getItem("uid")).then((imageList) => {
			console.log("found imagelist    ", imageList);
			for(var url in imageList){
				finalImageList.push({src: imageList[url],
									width: 1,
									height: 1})
			}
		console.log("finalImageList = ", finalImageList);
		this.setState({newList: finalImageList});
    })
	
	
		/*this.setState({newList: makeAlbumList(window.location.pathname.slice(7))});
		console.log(makeAlbumList(window.location.pathname.slice(7)));
		console.log("newList  ", this.state.newList);*/
	}
	renderAlbumPhotoList(List) {
		if(List.length>0){
			console.log("test");
			console.log(List);
			console.log(List.length==0);
			return(AlbumPhotoList);
	}
	}
  render() {
    return (
        <div className="mainpage">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/> 
            <div id="page-wrap">
                <Navbar pageName={"Album Overview"}/>
				{
					  this.renderAlbumPhotoList(this.state.newList)
					}
            </div>
        </div>
    );
	  }

}
export default AlbumOverview;