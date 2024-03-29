import React, { Component } from 'react';
import axios from 'axios'

//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import SubNavbar from '../components/layout/navbar/SubNavbar'
import Page from '../components/layout/album/Page'
import Sidebar from '../components/layout/navbar/Sidebar'


import "../App.css";

class AlbumPreview extends Component {
    render() {
        return (
            <div className="albumprev">  
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/> 
                <div id="page-wrap">
                    <Navbar pageName={"Album Name"}/>
                    <Page />
                </div>
            </div>
        );
      }

    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
     
    //     axios.get("robbiesdevteam.herokuapp.com/api/album/")
    //     .then((res) => {
    //         console.log("AlbumPreview," , res);
    //     }).catch ((err) => {
    //         console.log("fail");
    //         console.log(err)
    //     });

    // }


}
export default AlbumPreview;