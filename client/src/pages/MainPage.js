import React, { Component } from 'react';

import ReactDOM from 'react-dom';
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
	constructor(props){
		super(props)
		this.state = { 
			CurrentPhotoList: [],
		}
	}

	getCurrentPhotoList = () => {
		return this.state.CurrentPhotoList;
	}

	updatePhotoList = (childData) => {
		this.setState({CurrentPhotoList: childData})
		console.log("callback called");
		console.log(childData);
		console.log(this.state);
	}

	render() {
		return (
			<div className="mainpage">
				<Sidebar 
					pageWrapId={"page-wrap"} 
					outerContainerId={"App"}
					photos = {this.getCurrentPhotoList}
				/> 
				<div id="page-wrap">
					<Navbar pageName={"Main Page"}/>
					<SubNavbar updatedPhotos={this.state.CurrentPhotoList} albums={this.state.AlbumList}/>
					<UnAlbumPhotoList parentCallback = {this.updatePhotoList}/>
				</div>
			</div>
			
		);
	}
}
export default MainPage;
