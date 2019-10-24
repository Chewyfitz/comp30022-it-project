import React, { Component } from 'react';

//COMPONENTS
import Navbar from '../navbar/Navbar'
import Pagination from '../album/Pagination'
import Sidebar from '../navbar/Sidebar'


import "../../../App.css";
import "./QUICKIE.css"

function AlbumPreview({photolist,albumName}) {
    console.log("ALBUMIFYYYYYYYYYY" + photolist);
    return (
        <div className="albumprev quickie">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/> 
            <div id="page-wrap">
                <Pagination photolist={photolist}/>
            </div>
        </div>
    );
}
export default AlbumPreview;
