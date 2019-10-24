import React, { useState } from "react";
import Gallery from "react-photo-gallery";

import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";


import photos from '../photolist/tmpimglist';
import Photo from "./Photo";

import ALBUMIFY from '../navbar/ALBUMIFY';
import axios from 'axios';

import makeAlbumList from './makeAlbumList';

//DO MAPPING
// const photos = [
//   {
//     src: img1,
//     width: 1,
//     height: 1
//   }
// ]

console.log(makeAlbumList('un'));


/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement(item => <Photo {...item} />);

const SortableGallery = SortableContainer(({ items }) => (
  <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

function AlbumPhotoList() {
  const [items, setItems] = useState(photos);

  const onSortEnd = ({ oldIndex, newIndex }) => {

    setItems(arrayMove(items, oldIndex, newIndex));    
  };

    return (
        <div>
          <ALBUMIFY items={items} photos={photos}/>
          <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
        </div>
    )

}
export default AlbumPhotoList;
