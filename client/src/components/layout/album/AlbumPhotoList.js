import React, { useState } from "react";
import Gallery from "react-photo-gallery";

import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { getImagesfromAlbum } from '../../api/api'

import tmpimglist from '../photolist/tmpimglist'

import Photo from "./Photo";

import ALBUMIFY from './ALBUMIFY';
import axios from 'axios';
import { thisExpression } from "@babel/types";




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

const photos = [];

class AlbumPhotoList extends React.Component {
  
  
  loadPhotos({photos}){
    
    console.log(`PHOTOS: ${photos}`) 

    const [items, setItems] = useState(photos);
    

    
    const onSortEnd = ({ oldIndex, newIndex }) => {
      setItems(arrayMove(items, oldIndex, newIndex));    
    };

      return (
          <div>
      {items && <>
        <ALBUMIFY items={items} photos={photos}/>
            <SortableGallery albumName={window.location.pathname.slice(7)} items={items} onSortEnd={onSortEnd} axis={"xy"} />
        </>
      }
          </div>
      )
  }

  photos = makeAlbumList(window.location.pathname.slice(7)).then(
    
    console.log('PHOTOS:' + photos) 
    //this.loadPhotos(photos)

  );
  

}
export default AlbumPhotoList;
