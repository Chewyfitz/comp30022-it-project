import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
       for(var x = 0; x<this.state.selectedFile.length; x++) {
           data.append('file', this.state.selectedFile[x])
       }
        axios.post(`${process.env.API_URL}/api/image?user=${'test_user'}`, data, { })
        .then(res => { // then print response status
          console.log(res.statusText)
        })
    }
  render() {
    return (
	    <div>
	    	<input type="file" name="files" onChange={this.onChangeHandler} multiple/>
 	    	<button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler} accept="image/png, image/jpeg">Upload</button>
	    </div>
	    );
  }
}

export default UploadButton;
