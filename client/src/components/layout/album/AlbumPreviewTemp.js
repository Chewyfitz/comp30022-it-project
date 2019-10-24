
function loadAlbumPreview(){
    import React, { Component } from 'react';

    //COMPONENTS
    import Navbar from '../components/layout/navbar/Navbar'
    import Pagination from '../components/layout/album/Pagination'
    import Sidebar from '../components/layout/navbar/Sidebar'
    
    
    import "../App.css";
    
    class AlbumPreview extends Component {
        render() {
            return (
                <div className="albumprev">  
                    <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/> 
                    <div id="page-wrap">
                        <Navbar pageName={"Album Name"}/>
                        <Pagination />
                    </div>
                </div>
            );
          }
    
        
    }
    export default AlbumPreview;
}