import React from "react";
import { render } from "react-dom";
import Picky from "react-picky";
import "./NavDropdown.css";
import axios from 'axios';


const bigList = [];


for (var i = 1; i <= 50; i++) {
  bigList.push({ id: i, name: `Item ${i}` });
}
class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      arrayValue: []
    };
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
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
		for(var i=0; i<this.state.arrayValue.length(); i++){
			axios({method: "patch",
			url: `https://robbiesapiteam.herokuapp.com/api/album/album=${this.state.arrayValue[i]}`,
			//url: `https://itprojecttestapi.herokuapp.com/api/album/album=${this.state.arrayValue[i]}`, 
			params: {loginToken: localStorage.getItem("loginToken"),
					uid: localStorage.getItem("uid"),
					photos: this.props.photoList}
			})
			.then(res => {
				this.alert("Added Photos");
				console.log(res.statusText);
			})				
		}
	  }
  }
  render() {
    return (
	<>
      <button type="button" class="btn navDropdownButton btn-primary" onClick={this.uploadToAlbum.bind(this)}>Upload to Selected</button>
      <Picky
          value={this.state.arrayValue}
          options={bigList}
          onChange={this.selectMultipleOption}
          open={true}
          valueKey="id"
          labelKey="name"
          multiple={true}
          includeSelectAll={false}
          includeFilter={true}
          placeholder={"No albums selected"}
          allSelectedPlaceholder={"All albums selected"}
          manySelectedPlaceholder={"%s albums selected"}
          filterPlaceholder={"search albums..."}
          dropdownHeight={200}
          keepOpen={true}
          getFilterValue={this.getFilterValue}            

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
	  </>
    );
  }
}

export default NavDropdown; 

