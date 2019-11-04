import React, { Component } from 'react';
import makeAlbumList from './photolist/tmpimglist';
import { UpdateCaption } from '../api/api';

import './Carousel.css'
import Carousel from 'react-bootstrap/carousel'
//import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';

class AlbumCarousel extends Component {
	constructor(props){
		super(props);
		this.state = { imageList: this.props.imageList, 
					   autoscroll: null,
					   index: 0,
					   pauseOnHover: false,
					   caption: "",
					   albumName: this.props.albumId}

		this.setState({imageList: this.props.imageList});
		console.log(this.state.imageList);
		console.log(this.props.imageList);
		console.log(this.state);
		console.log("carousel props = ", this.props);
	}
	CaptionChangeHandler = (event) => {
		this.setState({caption: event.target.value});
	}
	editImageCaption = () => {
		UpdateCaption(document.getElementsByClassName("carousel-item active")[0].firstChild.id, this.state.albumName, this.state.caption).then(res => {
			window.location.reload();
		});
	}
	toggleAutoscroll = () => {
    if (!this.state.autoscroll) {
      this.setState({autoscroll: 2500});
      this.setState({index: this.getNextIndex()});
	  console.log(this.state.imageList);
	  console.log(this.props.imageList);
    } else {
      this.setState({autoscroll: null});
      this.setState({index: this.state.index});
    }
  };

  getNextIndex = () => {
    if (this.state.index === this.props.imageList.length) {
      return 0;
    }
    return this.state.index + 1;
  };
  render() {
	return (
	<>
		<Carousel id="myCarousel" 
		className="carousel-container" 
		interval={this.state.autoscroll}
		activeIndex={this.state.index}
        onSelect={nextIndex => this.setState({ index: nextIndex })}		
		pauseOnHover={this.state.pauseOnHover}>
			{this.state.imageList.length>0 && this.state.imageList.map((image, index) => {
				//var classname = index===0? "carousel-item active" : "carousel-item";

				return (
					<Carousel.Item key={index}>
						<img src={image.src} className = "d-block carousel-image" id={image.key}/>
						<Carousel.Caption>
							<p>{image.title}</p>
						</Carousel.Caption>
					</Carousel.Item>
				)
			}
					
			)}
			
		  </Carousel>
		  <div className="d-flex justify-content-center">
				
				<button type="button" className="btn modal-btn" data-toggle="modal" data-target="#myModal">Edit Caption</button>

					
					<div id="myModal" className="modal fade" role="dialog">
					  <div className="modal-dialog">

						
						<div className="modal-content">
						  <div className="modal-header">
							<h4 className="modal-title">Edit Caption</h4>
							<button type="button" className="close" data-dismiss="modal">&times;</button>
						  </div>
						  <div className="modal-body">
							<input type="text" className="form-control" id="caption" placeholder="Enter New Caption" onChange={this.CaptionChangeHandler}/>
							<button type="button" className="btn submit-btn" onClick={this.editImageCaption.bind(this)}>Submit New Caption</button>
						  </div>
						  <div className="modal-footer">
							<button type="button" className="btn my-btn" data-dismiss="modal">Close</button>
						  </div>
						</div>

					  </div>
					</div>
			
				
			</div>
			</>
	);
  }
}
export default AlbumCarousel;