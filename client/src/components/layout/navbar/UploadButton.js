import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "./Navbar.css"
import UnAlbumPhotoList from "../photolist/UnAlbumPhotoList"

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileText: "Choose File",
      loaded: 0,
    } 
  }

  onChangeHandler = event => {
    // Add the loaded files to state
    this.setState({
      selectedFile: event.target.files,
      loaded: this.state.loaded +1,
    });
    // Add the filenames to the text so it looks pretty
    var filenames;
    if(event.target.files.length > 1){
      // For multiple files
      filenames = event.target.files[0].name;
      for(var i=1;i<event.target.files.length;i++){
        filenames = filenames + ', ' + event.target.files[i].name;
      }
    } else {
      // For a single file
      filenames = event.target.files[0].name;
    }
    if(this.state.fileText === "Choose File"){
      // For the first file added
      this.setState({
        fileText: filenames,
      });
    } else {
      // For any extra files added
      this.setState({
        fileText: this.state.fileText + ', ' + filenames,
      });
    }
  }

  onClickHandler = () => {
    let data = new FormData() 
    const config = {
      headers: { 'content-type': 'multipart/form-data'}
    }
    // Set the send values
    this.state.user='test_user'; // For testing purposes
    const url = `${process.env.REACT_APP_API_URL}/api/image?user=${this.state.user}`;

    // Send the files
    var files = this.state.selectedFile;
    // Add files to the FormData
    for(var i = 0; i < files.length; i++) {
      data.append('file', files[i]);
    }
    // Send the data
    axios.post(url, data, config).then( (/*res*/) => { 
      // then reset the state
      // console.log(res.statusText);
      this.setState({
        selectedFile: null,
        fileText: "Choose File",
        loaded: 0,
      });
    }).catch(err => {
      // Print any errors from sending the files
      console.error(err.response);
    });
  }

  render() {
    return (
    <div className="input-group">
      <div className="custom-file">
        {/* File input */}
        <input type="file" 
          name="files" 
          onChange={this.onChangeHandler} 
          id="uploadfile" 
          accept="image/*" 
          multiple className="custom-file-input" 
          id="uploadfile" 
          aria-describedby="uploadfile"/>
        {/* Label - changes to show which files have been selected */}
        <label 
          className="custom-file-label" 
          htmlFor="uploadfile" >{this.state.fileText}</label>
      </div>
      <div className="input-group-append">
        {/* Upload Button */}
        <button 
          type="button" 
          className="btn btn-default navbar-btn subnavbar-text" 
          id="upload-addon" 
          onClick={this.onClickHandler}>Upload Photos</button>
      </div>
    </div>
    );
  }
}

export default UploadButton;
