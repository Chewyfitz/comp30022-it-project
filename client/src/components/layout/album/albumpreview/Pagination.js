import React from 'react'
import '../Album.css'
//COMPONENTS
import PageLayout from './SinglePageLayout'

//import axios from 'axios'

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageList: this.props.items,
            CurrentPage: 1,
            PhotosPerPage: 8
        };
        this.handleClick = this.handleClick.bind(this);

    }


    handleClick(event) {
        this.setState({
            CurrentPage: Number(event.target.id)
        });
    }

    PaginationSelected(number){
        return(
            <li className="pagination-selected page-item active"  aria-current="page">
                <button className="page-link pagination-selected"> {number}</button>
            </li>
        )
    }
    PaginationDisabled(number){
        return(
            <li className="page-item disabled">
                <button className="page-link pagination-disabled" tabIndex="-1" aria-disabled="true">{number}</button>
            </li>
        )
    }
    PaginationActive(number){
        return(
            <li className="page-item">
                <button className="page-link pagination-button" key={number} id={number} onClick={this.handleClick} href="#">
                    {number}
                </button>
            </li>
        )
    }
    PaginationNormal(number, totalPages){

        if(number<=0 || number>totalPages){ return (this.PaginationDisabled(number)); }

        return (this.PaginationActive(number))

    }

    render() {
        const { ImageList, CurrentPage, PhotosPerPage } = this.state;

        // Logic for displaying current photos
        const indexOfLastPhoto = CurrentPage * PhotosPerPage;
        const indexOfFirstPhoto = indexOfLastPhoto - PhotosPerPage;
        const currentPhotos = ImageList.slice(indexOfFirstPhoto, indexOfLastPhoto);

        const UltimatePhotoIndex = Math.ceil(ImageList.length/ PhotosPerPage);

        //slice photos into 2 separate lists
        const leftPagePhotos = currentPhotos.slice(0, Math.floor((currentPhotos.length)/2));
        const rightPagePhotos = currentPhotos.slice(Math.floor((currentPhotos.length)/2), currentPhotos.length);


        return (
            
            <div className='album-format'>

                {/* Actual album */}
                <div className= "album-page-left">

                    <div className="album-page-photos">
                        <PageLayout photolist={leftPagePhotos}/>
                    </div>

                </div>   

                {/* <ImagePicker images={imageList2.map((image, i) => ({src: image, value: i}))} /> */}
                <div className=" album-page-right">
                    <div className="album-page-photos">
                        <PageLayout photolist={rightPagePhotos}/>
                    </div>
                </div>

                
                {/* Pagination */}
                <nav id="page-numbers" className="pagination pagination-location">
                    
                    <li className="page-item">
                        <button className="page-link pagination-button" key={1} id={1} onClick={this.handleClick}>
                            First
                        </button>
                    </li>
                    
                    {this.PaginationNormal(CurrentPage-1, UltimatePhotoIndex)}
                    {this.PaginationSelected(CurrentPage)}
                    {this.PaginationNormal(CurrentPage+1, UltimatePhotoIndex)}

                    <li className="page-item">
                        <button className="page-link pagination-button" key={UltimatePhotoIndex} id={UltimatePhotoIndex} onClick={this.handleClick}>
                            Last
                        </button>
                    </li>
                </nav>
{/* 
                <nav class="pagination pagination-location">
                    <li class="page-item disabled">
                    <a class="page-link pagination-disabled" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                    </li>
                    <li class="page-item"><a class="page-link pagination-button" href="#">1</a></li>
                    <li class="page-item active" aria-current="page">
                    <a class="page-link pagination-selected" href="#">2 <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="page-item"><a class="page-link pagination-button" href="#">3</a></li>
                    <li class="page-item">
                    <a class="page-link pagination-button" href="#">Next</a>
                    </li>
                </nav> */}
            </div>
        );
    }
}
     
export default Pagination; 

    