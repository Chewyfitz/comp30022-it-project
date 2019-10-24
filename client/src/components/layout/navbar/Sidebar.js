/*import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../../../App.css";

const update (propX, a, b) => { 
	console.log("update called")
};

export default props => {
	function onChange(event) {
		console.log("onChange called");
		this.props.parentCallback(event);
	}
  return (
    // Pass on our props
    <Menu {...props} id="Menu" customBurgerIcon={ <div> <button type="button" className="btn icon-text">Albums</button> </div>}>
		<input type="text" onchange={update.bind(null, props.x)}></input>
		{props.rows}
    </Menu>
  );
};

/*export default props => {
  return (
    // Pass on our props
    <Menu {...props} id="Menu" customBurgerIcon={ <div> <button type="button" className="btn icon-text">Albums</button> </div>}>
      <a className="menu-item menu-text" href="/album/album1"> Album 1 </a>

      <a className="menu-item menu-text" href="/album"> Album 2 </a>

      <a className="menu-item menu-text" href="/album"> Album 3 </a>

      <a className="menu-item menu-text" href="/album"> Album 4 </a>
    </Menu>
  );
};
*/


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