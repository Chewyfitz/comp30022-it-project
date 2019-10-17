import React, { Component } from 'react';

//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import SubNavbar from '../components/layout/navbar/SubNavbar'
import PhotoList from '../components/layout/photolist/PhotoList'
import Sidebar from '../components/layout/navbar/Sidebar'
import PhotoUpload from '../components/layout/navbar/PhotoUpload'
import SignoutButton from '../components/auth/SignoutButton'

import "../App.css";

class MainPage extends Component {
  constructor(props) {
	  super(props);
	  this.PhotoListRef = React.createRef();
	  this.state = { arrayImage: [] };
  }
  onPhotoClick() {
	  const currentPhotoList = this.PhotoListRef.current;
	  this.setState(arrayImage: currentPhotoList.state(arrayImage));
	  console.log("image sent to main page");
	  console.log(this.state(arrayImage));
  }
  render() {
    return (
        <div className="mainpage">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/> 
            <div id="page-wrap">
                <Navbar pageName={"Main Page"}/>
                <SubNavbar />
                <PhotoList onPhotoClick={this.OnPhotoClick} ref={this.PhotoListRef}/>
                <PhotoUpload />
            </div>
			<div>
				<SignoutButton />
			</div>
        </div>
		
    );
  }
}
export default MainPage;