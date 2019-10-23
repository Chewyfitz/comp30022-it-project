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
/*imageList = [{url: "https://hidamarirhodonite.kirara.ca/spread/200205.png", id="1"},
			 {url: "https://hidamarirhodonite.kirara.ca/spread/200644.png", id="2"},
			 {url: "https://usamin.info/img/cards/200453.png", id="3"},
			 {url: "https://usamin.info/img/cards/200277.png", id="4"},
			 {url: "https://images2.alphacoders.com/894/thumb-350-894109.jpg", id="5"}]*/

class PhotoList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
          image: null,
          arrayImage: []
        }
		
        this.onPick = this.onPick.bind(this)
    }
     
    onPick(image) {
        console.count('onChange');
        console.log("Image", image);
        this.setState({ arrayImage : image })
        //this.setState({image});
        
        //todo: connect to backend: 
        //axios.post("./api/image",{})
		this.props.parentCallback(image);
	}
     
    render() {
        return (
          <div className='.main.image_picker'>
            
            <ImagePicker 
              multiple={true}
              images={imageList.map((image, i) => ({src: image, value: i}))}
              onPick={this.onPick}
            />
          </div>
       )
    }
}
export default PhotoList; 