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
  state = { CurrentPhotoList: [] }
  callbackFunction = (childData) => {
      this.setState({CurrentPhotoList: childData})
},
  render() {
    return (
        <div className="mainpage">
            <Sidebar pageWrapId={"page-wrap"} 
					 outerContainerId={"App"} /> 
            <div id="page-wrap">
                <Navbar pageName={"Main Page"}/>
                <SubNavbar photos={this.state.currentPhotoList} />
                <PhotoList parentCallback = {this.callbackFunction}/>
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