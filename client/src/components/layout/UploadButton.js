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
       console.log("starting file parsing");
       for(var x = 0; x<this.state.selectedFile.length; x++) {
	   console.log("file parsed");
	       console.log(this.state.selectedFile[x]);
           data.append('file', this.state.selectedFile[x])
       }
	    console.log("all parsed");
	    console.log(data);
	    console.log('test');
	    console.log(data.getAll('file'));
        axios.post("https://rowan-api-test-enviro.herokuapp.com/api/image", data, { })
        .then(res => { // then print response status
          console.log(res.statusText)
        })
    }
  render() {
    return (
	    <div>
	    <h1>Hello, {this.props.name}</h1>
	    Hello World
	    	<input type="file" name="files" onChange={this.onChangeHandler} multiple/>
 	    	<button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
	    </div>
	    );
  }
}

export default UploadButton;
