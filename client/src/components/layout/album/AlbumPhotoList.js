/*
React DND can make any element draggable and also make any element droppable. In order to achieve this, react dnd has a few assumptions:

It needs to have the references of all the droppable items
It needs to have the references of all the draggable items
All elements which are draggable and droppable need to be enclosed inside react-dnd’s context provider. This provider is used for initializing and also managing the internal state
We don’t need to worry too much about how it manages state. It has nice and easy APIs’ to expose those states, we can compute and update our local states using it.
*/

import React, { useCallback, useState } from "react";

//cuid is a simple library to generate unique IDs
import cuid from "cuid";
//Tools
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

//COMPONENTS
import ImageList from "./ImageList.js"
import Dropzone from "./Dropzone.js"
import update from "immutability-helper";

// import img1 from './temp_images/1.png'
// import img2 from './temp_images/2.png'
// import img3 from './temp_images/3.png'

// We will pass this function to ImageList and then to Image -> Quiet a bit of props drilling, the code can be refactored and place all the state management in ImageList itself to avoid props drilling. It's an exercise for you :)
function AlbumPhotoList() {


  /*images stored in format
    const images = [
    {
      id: 'abcd123',
      src: 'data:image/png;dkjds...',
    },
    {
      id: 'zxy123456',
      src: 'data:image/png;sldklskd...',
    }
    ]
  */
  // Create a state called images using useState hooks and pass the initial value as empty array
  const [images, setImages] = useState([]);

  const moveImage = (dragIndex, hoverIndex) => {
    // Get the dragged element
    const draggedImage = images[dragIndex];
    /*
      - copy the dragged image before hovered element (i.e., [hoverIndex, 0, draggedImage])
      - remove the previous reference of dragged element (i.e., [dragIndex, 1])
      - here we are using this update helper method from immutability-helper package
    */
    setImages(
      update(images, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    );
  };  

  // onDrop function  
  const onDrop = useCallback(acceptedFiles => {
  // Loop through accepted files
    acceptedFiles.map(file => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function(e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
        setImages(prevState => [
          ...prevState,
          { id: cuid(), src: e.target.result }
        ]);
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      return file;
    });
  }, []);


  // We pass onDrop function and accept prop to the component. It will be used as initial params for useDropzone hook
  //backend – the variable which helps to chose which API it uses for drag and drop.
  // It supports:
    // HTML5 drag and drop API (supported only on the web, not on touch devices)
    // Touch drag and drop API (supported on touch devices)
  return (
    <main className="AlbumPhotoList">
      <h1 className="text-center">Drag and Drop Example</h1>
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      <DndProvider backend={HTML5Backend}>
        <ImageList images={images} onUpdate={moveImage} />
      </DndProvider>
    </main>
  );
}


export default AlbumPhotoList;
