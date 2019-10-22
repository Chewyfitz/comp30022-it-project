import React from 'react'

class Pagination extends React.Component {
    constructor() {
        super();
        this.state = {
            PhotoList: ['a','b','c','d','e','f','g','h','i','j','k'],
            CurrentPage: 1,
            PhotosPerPage: 6
        };
        this.handleClick = this.handleClick.bind(this);
        

        albumAPI.getImagesfromAlbum('un', 'test_user').then((imageList) => {
          this.setState({
            imageList: imageList,
          })
        });

    }


    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { PhotoList, CurrentPage, PhotosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastPhoto = CurrentPage * PhotosPerPage;
        const indexOfFirstPhoto = indexOfLastPhoto - PhotosPerPage;
        const currentPhotos = PhotoList.slice(indexOfFirstPhoto, indexOfLastPhoto);

        const renderPhotos = currentPhotos.map((photo, index) => {
            return <li key={index}>{photo}</li>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(PhotoList.length / PhotosPerPage); i++) {
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
            <ul>
                {renderPhotos}
            </ul>
            <ul id="page-numbers">
                {renderPageNumbers}
            </ul>
            </div>
        );
    }
}
     
export default Pagination; 

    