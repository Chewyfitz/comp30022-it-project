import React, { useState } from "react";
import Gallery from "react-photo-gallery";

import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { getImagesfromAlbum } from '../../api/api'

import tmpimglist from '../photolist/tmpimglist'

import Photo from "./Photo";

import ALBUMIFY from './ALBUMIFY';
import axios from 'axios';




/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement(item => <Photo {...item} />);

const SortableGallery = SortableContainer(({ items }) => (
    // <Gallery photos={items.map(image => {return image.src})} renderImage={props => <SortablePhoto {...props} />} />
    <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

async function makeAlbumList(albumId){
    var finalImageList = [];
    // Get the image list
    const imageList = await getImagesfromAlbum(albumId, localStorage.getItem("uid"));
    
    // Put it in the format we want
    for(var i=0; i<imageList.length; i++){
        finalImageList.push({src: imageList[i].src, width: 1, height: 1});
    }

    // return it
    return finalImageList
}

function AlbumPhotoList() {
    const [items, setItems] = useState(null);
    if(items==null){
        makeAlbumList(window.location.pathname.slice(7)).then(setItems);
    }
    // items.foreach(item => {item.height = 1; item.width = 1});
    
    console.log("set state-ish");
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMove(items, oldIndex, newIndex));    
    };

    return (
        <div>
            {items && <>
                <ALBUMIFY items={items}/>
                    <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
                </>
            }
        </div>
    )
}
export default AlbumPhotoList;
