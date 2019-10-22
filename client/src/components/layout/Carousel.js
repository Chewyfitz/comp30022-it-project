import React, { Component } from 'react';

//import './Carousel.css'

//import images from local
import img1 from './photolist/temp_images/1.png'
import img2 from './photolist/temp_images/2.png'
import img3 from './photolist/temp_images/3.png'



//import axios from 'axios'
const imageList = [img1, img2, img3]
//import "../PhotoPreview.css";

class Carousel extends Component {
  render() {
    return (
    
    
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 text-center">

                    <div id="carousel_test" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <img src={img1} alt="First slide"/>
                                <div className="carousel-caption">
                                    <h3>First Slide</h3>
                                    <p>A beautiful sunset on a beach</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={img2} alt="Second slide"/>
                                <div className="carousel-caption">
                                    <h3>Second Slide</h3>
                                    <p>Sunset with beautiful shades of Red</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={img3} alt="Third slide"/>
                                <div className="carousel-caption">
                                    <h3>Third Slide</h3>
                                    <p>Sun going down amidst the cloudy sky</p>
                                </div>
                            </div>
                            {/* <div className="carousel-item">
                                <img src={img4} alt="Third slide"/>
                                <div className="carousel-caption">
                                    <h3>Fourth Slide</h3>
                                    <p>Sunset on a lake</p>
                                </div>
                            </div> */}
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
