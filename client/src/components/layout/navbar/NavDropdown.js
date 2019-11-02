import React from "react";
import { render } from "react-dom";
import Picky from "react-picky";
import "./NavDropdown.css";
import axios from 'axios';
import { AddImagesToAlbum } from '../../api/api';


/*const bigList = [];


for (var i = 1; i <= 50; i++) {
  bigList.push({ id: i, name: `Item ${i}` });
}*/
class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      arrayValue: []
    };
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
	this.uploadToSelected = this.uploadToSelected.bind(this);
  }

  selectMultipleOption(value) {
    console.count('onChange')
    console.log("Val", value);
    this.setState({ arrayValue: value });
	console.log("NavDropdown photolist");
	console.log(this.props.photoList);
	console.log(this.props);
  }
  selectOption(value) {
    console.log("Vals", value);
    this.setState({ value });
  }
  getFilterValue(value){
  }
  uploadToAlbum() {
	  if(this.props.photoList){
    console.log(`${process.env.REACT_APP_API_URL}/api/album/album=${this.state.arrayValue[i]}`);
		for(var i=0; i<this.state.arrayValue.length(); i++){
      axios({method: "patch",
        url: `${process.env.REACT_APP_API_URL}/api/album/album=${this.state.arrayValue[i]}`,
        params: {loginToken: localStorage.getItem("loginToken"),
            uid: localStorage.getItem("uid"),
            photos: this.props.photoList}
			})
			.then(res => {
        this.alert("Added Photos");
        console.log(res.statusText);
        console.log("UPLOADEDDDDDD")
        window.location.reload();
				
			})				
		}
	  }
  }
  uploadToSelected() {
    this.state.arrayValue.forEach(album =>
        AddImagesToAlbum(this.props.photoList, album.albumId)
      )
    this.props.renderDeleteFunction();
  }
  render() {
    return (
	<>
  
      <Picky
          value={this.state.arrayValue}
          options={this.props.albums}
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
      <button type="button" className="btn btn-default navDropdownButton" onClick={this.uploadToSelected}>Add</button>
	  </>
    
    );
  }
}

export default NavDropdown; 

