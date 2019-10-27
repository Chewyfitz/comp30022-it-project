import React, { useState } from "react";
import Gallery from "react-photo-gallery";

import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { getImagesfromAlbum } from '../../api/api'

import tmpimglist from '../photolist/tmpimglist'

import Photo from "./Photo";

import axios from 'axios';
import { thisExpression } from "@babel/types";


import "../navbar/Navbar.css"
import AlbumPreview from './AlbumPreviewTemp' 


async function makeAlbumList(albumId){
    var finalImageList = [];
    // Get the image list
    const imageList = await getImagesfromAlbum(albumId, localStorage.getItem("uid"));
    
    // Put it in the format we want
    for(var i=0; i<imageList.length; i++){
        finalImageList.push({key: i.toString(), src: imageList[i].src, width: 1, height: 1});
    }

    // return it
    return finalImageList
}

/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement(item => <Photo {...item} />);

const SortableGallery = SortableContainer(({ items }) => (
    // <Gallery photos={items.map(image => {return image.src})} renderImage={props => <SortablePhoto {...props} />} />
    <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));


class AlbumPhotoList extends React.Component{  
    state = {
        loadOverview: false,
        items: null,
        setItems: null
    }
    
    handleClick = (oldphotolist, newphotolist) => {

        this.setState({loadOverview:true});
        console.log("ALBUMIFYYYYYYYYYY" + newphotolist);
    
    }

    render(){
        //const [items, setItems] = useState(null);
        if(this.state.items==null){
            makeAlbumList(window.location.pathname.slice(7)).then(this.state.setItems);
        }

        const photos = this.state.items;

        //console.log("PHOTOSSSSSSSS" + photos.src);

        // items.foreach(item => {item.height = 1; item.width = 1});
        
        console.log("set state-ish");
        const onSortEnd = ({ oldIndex, newIndex }) => {
            this.state.setItems(arrayMove(this.state.items, oldIndex, newIndex));    
        };


        return (
            <div>
                {this.state.items && 
                    <>
                    {this.state.loadOverview?
                        <AlbumPreview photolist={this.state.items} albumName={window.location.pathname.slice(7)}/>
                        :
                        <>
                            {/* <ALBUMIFY albumName={window.location.pathname.slice(7)} photos={photos} items={items} /> */}
                            <nav className="navbar navbar-expand-sm navbar-dark fixed-top2" style={{backgroundColor:'#F4F6F8'}}>
                                {/*Sub navbar*/}
                                {/* <a href={'/albumify/'+ albumName} class="btn btn-default btn-block ALBUMIFY-text" onClick={() => handleClick(oldphotolist,newphotolist)}> */}
                                <a href='#' class="btn btn-default btn-block ALBUMIFY-text" onClick={() => this.handleClick(photos, this.state.items)}>
                                    ALBUMIFY
                                </a>
                            </nav>
                            <SortableGallery items={this.state.items} onSortEnd={onSortEnd} axis={"xy"} />
                        </>
                    }
                    </>
                }
            </div>
        )
    }
}
export default AlbumPhotoList;
