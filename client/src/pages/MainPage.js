import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { AddImagesToAlbum } from '../components/api/api'

//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import SubNavbar from '../components/layout/navbar/SubNavbar'
import UnAlbumPhotoList from '../components/layout/photolist/UnAlbumPhotoList'
import Sidebar from '../components/layout/navbar/Sidebar'
import PhotoUpload from '../components/layout/navbar/PhotoUpload'
import SignoutButton from '../components/auth/SignoutButton'

import "../App.css";

class MainPage extends Component {
  state = { CurrentPhotoList: [],
			AlbumList: [],
			FilteredAlbumList: [],
			searchText: '',
			renderDelete: false
			}
            
  callbackFunction = (childData) => {
      this.setState({CurrentPhotoList: childData})
	  console.log("callback called");
	  console.log(childData);
	  console.log(this.state);
  }
  renderDeleteCallback = () => {
	  this.setState({renderDelete: true});
  }
  
  componentDidMount() {
	axios({method: "get",
			url: `${process.env.REACT_APP_API_URL}/api/album/`,
			params: {user: localStorage.getItem("uid")}
			})
			.then(res => { // then print response status
				console.log(res.statusText);
				console.log(res.data);
				try {
					var newList = [];
					for(var key in res.data){
						if (res.data.hasOwnProperty(key)) {
							newList.push({name: res.data[key],
										albumId: key});
						}
					}
					this.setState({AlbumList: newList});
					this.setState({FilteredAlbumList: newList});
					//for(i=0;i<res.data.albums.length;i++){
					//	this.setState({AlbumList: res.data.albums[i]});
					//}
				} catch(err){
					console.log(err);
				}
			})
  	}
  
  SearchAlbums = (event) => {
	  console.log(event);
	  if(this.state.FilteredAlbumList){
		  this.setState({FilteredAlbumList: this.state.AlbumList.filter(function(album) {
						return Object.values(album)[0].toLowerCase().includes(event.target.value.toLowerCase());
						})
		  });	
		  
	  }
	  this.setState({searchText: event.target.value});
}
  CreateNewAlbum = () => {
	  if(this.state.searchText){
		  var newAlbumName=this.state.searchText;
		  console.log("creating album");
		  axios({method: "post",
			url: `${process.env.REACT_APP_API_URL}/api/album/`,
			params: {albumName: newAlbumName,
					user: localStorage.getItem("uid")}
					//uid: localStorage.getItem("uid")}
		})
		.then(res => { // then print response status
			console.log("res stuff");
				console.log(res.statusText);
				console.log(res.data);

				newAlbumName=res.data;

				//window.location.reload();

				if(this.state.CurrentPhotoList){
					AddImagesToAlbum(this.state.CurrentPhotoList, newAlbumName).then(res => {
						//window.location.reload();
						console.log("images be added bruh");
						console.log(res);
					});
				}
				else{
					console.log("else'd it");
					//window.location.reload();
				}
				this.setState({renderDelete: true});
				this.setState({AlbumList: this.state.AlbumList.concat(newAlbumName)});
				if(newAlbumName.toLowerCase().includes(this.state.searchText.toLowerCase())){
					this.setState({FilteredAlbumList: this.state.FilteredAlbumList.concat(newAlbumName)});
				}
		  });
			
	  }
	  
  }
  
  
  render() {
    return (
        <div className="mainpage">
            <Sidebar pageWrapId={"page-wrap"} 
					 outerContainerId={"App"}
					 parentCallback = {this.SearchAlbums}
					 parentCreateNewAlbum = {this.CreateNewAlbum}
					 rows={
						 <React.Fragment>
							
							{!!this.state.FilteredAlbumList && this.state.FilteredAlbumList.map(album => (
								<>
									<a className="menu-item menu-text" href={'/album/'+album.albumId}> {album.name} </a>
									<br />
								</>
							))}
						</ React.Fragment>
						 }
			 /> 
            <div id="page-wrap">
                <Navbar pageName={"Main Page"}/>
                <SubNavbar photos={this.state.CurrentPhotoList} albums={this.state.AlbumList} renderDeleteCallback={this.renderDeleteCallback} />
                <UnAlbumPhotoList parentCallback = {this.callbackFunction} renderDelete = {this.state.renderDelete}/>
            </div>
        </div>
		
    );
  }
}
export default MainPage;
