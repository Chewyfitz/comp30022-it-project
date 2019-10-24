import React, { Component } from 'react'
import ImagePicker from 'react-image-picker'
import './UnAlbumPhotoList.css'


const albumAPI = require('../../api/api');

class UnAlbumPhotoList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      arrayImage: [],
      imageList: [],
    }
    this.onPick = this.onPick.bind(this)
    albumAPI.getImagesfromAlbum('un', localStorage.getItem("uid")).then((imageList) => {
      this.setState({
        imageList: imageList,
      })
	  console.log(imageList);
    });
  }
  


  onPick(image) {
    console.count('onChange');
    console.log("Image", image);
    this.setState({ arrayImage : image });
  }
  
  render() {
    return (
      <div className='main image_picker'>
        
        <ImagePicker 
          multiple={true}
          images={this.state.imageList.map((image, i) => ({src: image, value: i}))}
          onPick={this.onPick}
        />
      </div>
    )
  }
}
export default UnAlbumPhotoList; 
