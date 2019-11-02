import React, { Component } from 'react'
import { slide as Menu } from "react-burger-menu";

import axios from 'axios';

const api = require('../../api/api');

class Sidebar extends Component {
	constructor(props){
		super(props)
		this.state = {
			AlbumList: [],
			FilteredAlbumList: [],
			searchText: '',
		}
		console.log(this.props);
	}

	componentDidMount() {
		api.getAlbumList().then(albumList => {
			this.setState({AlbumList: albumList});
			this.setState({FilteredAlbumList: albumList});
		})
	}
	
	SearchAlbums = (event) => {
		// give our target a friendlier name :)
		var target = event.target.value;
		// Check if we've got any albums - if we don't we won't need to filter
		if(this.state.FilteredAlbumList){
			// convert the target to lower case
			target = target.toLowerCase()
			// update the filtered list with the .filter() function
			this.setState({FilteredAlbumList: this.state.AlbumList.filter((album) => {
				return album.name.toLowerCase().includes(target);
				})
			});	
			
		}
		// set the searchText state variable.
		this.setState({searchText: target});
	}

	CreateNewAlbum = () => {
		if(this.state.searchText){
			var newAlbumName=this.state.searchText;
			console.log(`photos: ${this.props.photos()}`);
			api.CreateNewAlbum(newAlbumName, this.props.photos()).then( albumId => {
				console.log(`Got ${albumId} from api.CreateNewAlbum.`);
				this.setState({
					AlbumList: [...this.state.AlbumList, {name: newAlbumName, albumId: albumId}],
					FilteredAlbumList: [...this.state.FilteredAlbumList, {name: newAlbumName, albumId: albumId}],
				});
			});
		}
	  
	}

	render(){
		return (
			<Menu id="Menu" customBurgerIcon={ <div> <button type="button" className="btn icon-text">Albums</button> </div>}>
				<div className="form-group row d-flex justify-content-center">
					<input type="text" onChange={this.SearchAlbums} placeholder="Enter Album Name"></input>
					<button type="button" className="btn btn-primary" onClick={this.CreateNewAlbum}>Create New Album</button>
				</div>
				{!!this.state.FilteredAlbumList && this.state.FilteredAlbumList.map(album => (
					<>
						<a className="menu-item menu-text" href={`/album/${album.albumId}/0`}> {album.name} </a>
						<br />
					</>
				))}
			</Menu>
		)
	}
}

export default Sidebar;