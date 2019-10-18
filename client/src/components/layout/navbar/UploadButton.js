import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "./Navbar.css"

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    } 
  }
  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files,
      loaded: 0,
    })
  }

  onClickHandler = () => {
    const data = new FormData() 
    try {
      for(var x = 0; x<this.state.selectedFile.length; x++) {
        data.append('file', this.state.selectedFile[x])
      }
      axios.post(`${process.env.API_URL}/api/image?user=${'test_user'}`, data, { })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
    } 
    catch(err){
      console.log(err);
    }
  }
  render() {
    return (
	    <div className="input-group">
        <div className="custom-file">
          {/* <input type="file" name="files" onChange={this.onChangeHandler} accept="image/*" multiple/> */}
          
          <input type="file" name="files" onChange={this.onChangeHandler} id="uploadfile" accept="image/*" 
            multiple className="custom-file-input" id="uploadfile" aria-describedby="uploadfile"/>
          
          <label className="custom-file-label" for="uploadfile" >Choose File</label>
        
        </div>
        <div class="input-group-append">
          <button type="button" className="btn btn-default navbar-btn subnavbar-text" id="upload-addon" onClick={this.onClickHandler}>Upload Photos</button>
        </div>
      </div>
      );
      
      	    {/* <div>
	    	<input type="file" name="files" onChange={this.onChangeHandler} accept="image/*" multiple/>
 	    	<button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
	    </div> */}

  }
}

export default UploadButton;