import React, { useState } from "react";
import Gallery from "react-photo-gallery";

import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";


import makeAlbumList from '../photolist/tmpimglist';
import Photo from "./Photo";

import ALBUMIFY from './ALBUMIFY';
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

function AlbumPhotoList(albumList) {
  const [items, setItems] = useState(albumList);
  console.log("items, setItems   ", items, setItems);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));    
  };

    return (
        <div>
			{items?
			<>
			    <ALBUMIFY items={items} photos={photos}/>
          <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
		  </>
		  	:
			<div></div>
			}
        </div>
    )

}
export default AlbumPhotoList;
