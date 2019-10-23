import React, { useState } from "react";
import Gallery from "react-photo-gallery";

import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";


import photos from '../photolist/tmpimglist';
import Photo from "./Photo";

import ALBUMIFY from '../navbar/ALBUMIFY'
import axios from 'axios';

//DO MAPPING
// const photos = [
//   {
//     src: img1,
//     width: 1,
//     height: 1
//   }
// ]

/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement(item => <Photo {...item} />);

const SortableGallery = SortableContainer(({ items }) => (
  <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));


function AlbumPhotoList() {
  const [items, setItems] = useState(photos);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex);
    console.log(newIndex);
    console.log(items);
    setItems(arrayMove(items, oldIndex, newIndex));
    console.log(items);
    console.log(arrayMove(items, oldIndex, newIndex));

    
  };

  console.log(photos);
  console.log(items);


    return (
        <div>
          <ALBUMIFY items={items} photos={photos}/>
          <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
        </div>
    )

}
export default AlbumPhotoList;
