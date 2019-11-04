import React from "react";
import { render } from "react-dom";
import Picky from "react-picky";
import "./NavDropdown.css";
import axios from 'axios';
import { AddImagesToAlbum } from '../../api/api';

import { getAlbumList } from '../../api/api';

class NavDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
			arrayValue: [],
			AlbumList: [],
		};
		getAlbumList().then(albumlist => {
			this.state.AlbumList = albumlist;
			this.forceUpdate();
		});
		this.selectMultipleOption = this.selectMultipleOption.bind(this);
		this.uploadToAlbum = this.uploadToAlbum.bind(this);
	}

	selectMultipleOption(value) {
		// Pretty straightforward - update the array value
		this.setState({ arrayValue: value });
	}

	selectOption(value) {
		this.setState({ value });
	}

	getFilterValue(value){
	}

	uploadToAlbum() {
		if(this.props.photoList().length>0){
			console.log(`${process.env.REACT_APP_API_URL}/api/album/album=${this.state.arrayValue[i]}`);
			var promises = []
			console.log(this.state.arrayValue);
			promises.push(AddImagesToAlbum(this.props.photoList(), this.state.arrayValue[0].albumId));
			for(var i=1; i<this.state.arrayValue.length; i++){
				promises.push(AddImagesToAlbum(this.props.photoList(), this.state.arrayValue[i].albumId, false));
			}
			Promise.all(promises).then( () => {
				window.location.reload();
			});
		}
	}
	uploadToSelected() {
		this.state.arrayValue.forEach(album =>
			AddImagesToAlbum(this.props.photoList(), album.albumId)
		)
		window.location.reload();
	}
	render() {
		return (
		<>
	
		<Picky
			value={this.state.arrayValue}
			options={this.state.AlbumList}
			onChange={this.selectMultipleOption}
			open={true}
			valueKey="albumId"
			labelKey="name"
			multiple={true}
			includeSelectAll={false}
			includeFilter={true}
			placeholder={"Please select albums"}
			manySelectedPlaceholder={"Add to %s albums"}
			filterPlaceholder={"search albums..."}
			dropdownHeight={200}
			keepOpen={true}
			getFilterValue={this.getFilterValue}    

			onClick={() => window.location.reload()}

			render={({
				style,
				isSelected,
				item,
				selectValue,
				labelKey,
				valueKey,
				multiple,
			}) => {
				return (	  
				<li
					style={{ ...style}} // required
					className={isSelected ? 'selected' : ''} // required to indicate is selected
					key={item[valueKey]} // required
					onClick={() => selectValue(item)}
				>
					{/* <input type="checkbox" className=" button-format" checked={isSelected} readOnly />

					<span style={{fontWeight: isSelected ? "bold" : "normal", fontSize: '16px'}}>
					{item[labelKey]}
					</span> */}

					<form>
					<div className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input" checked={isSelected} name="checkthis" readOnly/>
						<label className="custom-control-label" >
						<span style={{fontWeight: isSelected ? "bold" : "normal", fontSize: '16px'}}>
							{item[labelKey]}
						</span>
						</label>
					</div>
					</form>
					
					
				</li>
				
				);
			}}
		
		/>
		<button type="button" className="btn btn-default navDropdownButton" onClick={this.uploadToAlbum}>Add</button>
		</>
		
		);
	}
}

export default NavDropdown; 

