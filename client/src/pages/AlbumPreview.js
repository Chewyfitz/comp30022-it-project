import React, { Component } from 'react';

//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import SubNavbar from '../components/layout/navbar/SubNavbar'
import PhotoList from '../components/layout/photolist/PhotoList'
import Sidebar from '../components/layout/navbar/Sidebar'
import axios from 'axios'
import "../App.css";

class AlbumPreview extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
     
        axios.get("robbiesdevteam.herokuapp.com/api/album/")
        .then((res) => {
            console.log("AlbumPreview," , res);
        }).catch ((err) => {
            console.log("fail");
            console.log(err)
        });

    }

  render() {
    return (
        <div className="albumprev">  
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/> 
            <div id="page-wrap">
                <Navbar pageName={"Album Name"}/>
                <SubNavbar />
            </div>
        </div>
    );
  }
}
export default AlbumPreview;