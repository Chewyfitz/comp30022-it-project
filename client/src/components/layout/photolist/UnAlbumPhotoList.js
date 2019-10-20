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
    albumAPI.getImagesfromAlbum('un').then((imageList) => {
      this.setState({
        imageList: imageList,
      })
    });
  }
  


  onPick(image) {
    console.count('onChange');
    console.log("Image", image);
    this.setState({ arrayImage : image });
    //this.setState({image});
    
    //todo: connect to backend: 
    //axios.post("./api/image",{})
  }
  
  render(imageList) {
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