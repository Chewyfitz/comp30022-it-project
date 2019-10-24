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
            redirect: false, 
            selectedAlbum: ''}
            
    renderRedirect = () => {
        if (this.state.redirect && this.state.selectedAlbum) {
            console.log("selected album");
            console.log(this.state.selectedAlbum);
          return <Redirect to={`/album/${this.state.selectedAlbum}`} />
        }
    }
  callbackFunction = (childData) => {
      this.setState({CurrentPhotoList: childData})
	  console.log("callback called");
	  console.log(childData);
	  console.log(this.state);
  }
  
  componentDidMount() {
	/*const album1={ AlbumID: 1,
				   Name: "Test1"}
	const album2={ AlbumID: 2,
				   Name: "Test2"}
	const album3={ AlbumID: 3,
				   Name: "Test3"}
	const testAlbumList = [album1, album2, album3]		   
	
	this.setState({AlbumList: testAlbumList});
	this.setState({FilteredAlbumList: testAlbumList});*/
	axios({method: "get",
			url: 'https://robbiesapiteam.herokuapp.com/api/album/',
			params: {user: localStorage.getItem("uid")}
			//url: `https://itprojecttestapi.herokuapp.com/api/album/`,
			/*params: {loginToken: localStorage.getItem("loginToken"),
					uid: localStorage.getItem("uid")}*/
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
			//url: 'https://robbiesapiteam.herokuapp.com/api/album/',
			url: 'https://robbiesdebugteam.herokuapp.com/api/album/',
			params: {albumName: newAlbumName,
					user: localStorage.getItem("uid")}
					//uid: localStorage.getItem("uid")}
		})
		.then(res => { // then print response status
				console.log(res.statusText);
				console.log(res.data);
				newAlbumName=res.data;
				AddImagesToAlbum(this.state.CurrentPhotoList, newAlbumName);
                this.setState({selectedAlbum: newAlbumName});
                this.setState({redirect: true});
				
				/*try {
					this.setState({
						redirect: res.
					})
				}
				} catch(err){
					console.log(err);
				}*/
			})
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
                <SubNavbar photos={this.state.CurrentPhotoList} albums={this.state.AlbumList}/>
                <UnAlbumPhotoList />
            </div>
			{this.renderRedirect()}
        </div>
		
    );
  }
}
export default MainPage;