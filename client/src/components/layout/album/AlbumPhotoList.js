import React, { useState } from "react";
import Gallery from "react-photo-gallery";

import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";


import makeAlbumList from '../photolist/tmpimglist';

import Photo from "./Photo";

import ALBUMIFY from './ALBUMIFY';
import axios from 'axios';




/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement(item => <Photo {...item} />);

const SortableGallery = SortableContainer(({ items }) => (

  <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));


function AlbumPhotoList() {
	const [items, setItems] = useState(null);
	if(items==null){
	makeAlbumList(window.location.pathname.slice(7)).then(setItems);
	}
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
