import React from 'react'
import './Page.css'
import photos from '../photolist/tmpimglist';
import PageView from './PageView'

//import axios from 'axios'

const albumAPI = require('../../api/api');

class Pagination extends React.Component {
    constructor() {
        super();
        this.state = {
            //ImageList: ['a','b','c','d','e','f','g','h','i','j','k'],
            ImageList: photos,
            //ImageList: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12],
            CurrentPage: 1,
            PhotosPerPage: 6
        };
        this.handleClick = this.handleClick.bind(this);
        console.log(photos);

        albumAPI.getImagesfromAlbum('un', 'test_user').then((ImageList) => {
          this.setState({
            ImageList: ImageList,
          })
        });

    }


    handleClick(event) {
        this.setState({
            CurrentPage: Number(event.target.id)
        });
    }

    render() {
        const { ImageList, CurrentPage, PhotosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastPhoto = CurrentPage * PhotosPerPage;
        const indexOfFirstPhoto = indexOfLastPhoto - PhotosPerPage;
        const currentPhotos = ImageList.slice(indexOfFirstPhoto, indexOfLastPhoto);

        // const renderPhotos = currentPhotos.map((photo, index) => {
        //     return <img key={index} src={photo.src}/>;
        //     //return <ul key={index}>{photo}</ul>;
        // });


        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(ImageList.length / PhotosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
            <li
                key={number}
                id={number}
                onClick={this.handleClick}
            >
                {number}
            </li>
            );
        });

        return (
            <div>
                
                <PageView /> 
                
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }
}
     
export default Pagination; 

    