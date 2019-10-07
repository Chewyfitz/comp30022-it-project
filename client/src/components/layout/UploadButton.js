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
       //data.append('user', 'testuser');
       for(var x = 0; x<this.state.selectedFile.length; x++) {
           data.append('file', this.state.selectedFile[x])
       }
        axios.post(`https://rowan-api-test-enviro.herokuapp.com/api/image?user=${'test_user'}`, data, { })
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
