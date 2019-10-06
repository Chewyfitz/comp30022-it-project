import React, { Component } from 'react'
import ImagePicker from 'react-image-picker'
import './PhotoList.css'

//import images from local
import img1 from './temp_images/1.png'
import img2 from './temp_images/2.png'
import img3 from './temp_images/3.png'
import img4 from './temp_images/4.png'
import img5 from './temp_images/5.png'
import img6 from './temp_images/6.png'
import img7 from './temp_images/7.png'
import img8 from './temp_images/8.png'
import img9 from './temp_images/9.png'
import img10 from './temp_images/10.png'
import img11 from './temp_images/11.png'
import img12 from './temp_images/12.png'
import img13 from './temp_images/13.png'
//import axios from 'axios'
const imageList = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13]


class PhotoList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
          image: null
        }
        this.onPick = this.onPick.bind(this)
    }
     
    onPick(image) {
        this.setState({image})
        console.log({image});
        //todo: connect to backend: 
        //axios.post("./api/image",{})
    }
     
    render() {
        return (
          <div>
            <ImagePicker 
              images={imageList.map((image, i) => ({src: image, value: i}))}
              onPick={this.onPick}
            />
          </div>
       )
    }
}
export default PhotoList; 