import React, { Component } from 'react';

//COMPONENTS
import Navbar from '../components/layout/navbar/Navbar'
import AlbumPhotoList from '../components/layout/album/AlbumPhotoList'
import Pagination from '../components/layout/album/Pagination'
import Sidebar from '../components/layout/navbar/Sidebar'

import "../App.css";


class AlbumView extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            albumId: props.match.params.albumId,
            view: props.match.params.view,
            items: null,
        }
    }

    updateItems = (items) => {
        console.log("Updated.");
        this.setState({items : items});
    }

    changeView = (view) => {
        console.log(document.location);
        console.log("Changed view");
        // window.history.pushState
        this.setState({view: view});
    }

    renderOverview() {
        return (
            <div className="mainpage">
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/> 
                <div id="page-wrap">
                    <Navbar pageName={"Album Overview"}/>
                    <AlbumPhotoList {...this.props} updateItems={this.updateItems} changeView={this.changeView}/>
                </div>
            </div>
        );
    }

    renderPreview() {
        return (
            <div className="albumprev">  
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"}/> 
                <div id="page-wrap">
                    <Navbar pageName={"Album Name"}/>
                    <Pagination {...this.props} items={this.state.items} albumId={this.state.albumId} changeView={this.changeView} />
                </div>
            </div>
        );
    }

    render(){
        if(this.state.view == 1) {
            return this.renderPreview();
        } else {
            return this.renderOverview();
        }
    }

}

export default AlbumView;