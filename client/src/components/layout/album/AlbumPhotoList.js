import React, { useState } from "react";
import Gallery from "react-photo-gallery";
import Photo from "./PhotoTest";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import photos from '../photolist/tmpimglist';

import img1 from '../photolist/temp_images/1.png';

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
    setItems(arrayMove(items, oldIndex, newIndex));
  };


    return (
        <div>
            <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
        </div>
    )

}
export default AlbumPhotoList;
