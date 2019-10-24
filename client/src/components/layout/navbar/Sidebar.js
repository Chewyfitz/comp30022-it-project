import React, { Component } from 'react'
import { slide as Menu } from "react-burger-menu";


class Sidebar extends Component {
	constructor(props){
		super(props)
		this.textUpdate = this.textUpdate.bind(this);
		this.CreateNewAlbum = this.CreateNewAlbum.bind(this);
	}
	textUpdate(event) {
		console.log("textUpdate called");
		this.props.parentCallback(event);
	}
	CreateNewAlbum(){
		this.props.parentCreateNewAlbum();
	}
	render(){
		return (

			<Menu id="Menu" customBurgerIcon={ <div> <button type="button" className="btn icon-text">Albums</button> </div>}>
				<div className="form-group row d-flex justify-content-center">
					<input type="text" onChange={this.textUpdate} placeholder="Enter Album Name"></input>
					<button type="button" className="btn btn-primary" onClick={this.CreateNewAlbum}>Create New Album</button>
				</div>
				{this.props.rows}
			</Menu>
			)
	}
}

export default Sidebar;