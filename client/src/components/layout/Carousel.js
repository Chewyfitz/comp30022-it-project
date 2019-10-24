import React, { Component } from 'react';
import makeAlbumList from './photolist/tmpimglist';

//import './Carousel.css'



//import axios from 'axios'
//import "../PhotoPreview.css";

class Carousel extends Component {
	constructor(props){
		super(props);
		this.state = { imageList: [] }
		makeAlbumList(window.location.pathname.slice(7)).then(res => {
			this.setState({imageList: res});
			console.log("from the then", this.state.imageList);
			console.log(this.state.imageList.length);
			
		});
	}
  render() {
    return (
    
        <div class="container-fluid">
			
            <div class="row">
                <div class="col-12 text-center">

                    <div id="carousel_test" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner" role="listbox">
                            {this.state.imageList.length>0 && this.state.imageList.map(function (image, index) {
								var classname = index===0? "carousel-item active" : "carousel-item";
		
								return (
									<div className={classname}>
										<img src={image.src.src} />
										<div className="carousel-caption">
											<p>{image.src.caption}</p>
										</div>
									</div>
								)
							}
									
							)}
                        </div>
                    </div>
                    
                    <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev" nClick="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>

                </div>
            </div>
            
        </div>
                                
    );
  }
}
export default Carousel;
