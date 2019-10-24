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

async function makeAlbumList(albumId){
    var finalImageList = [];
    // Get the image list
    const imageList = await getImagesfromAlbum(albumId, localStorage.getItem("uid"));
    
    // Put it in the format we want
    for(var i=0; i<imageList.length; i++){
        finalImageList.push({src: imageList[i].src, width: 1, height: 1});
    }
    console.log("FINALLLLLLLLLll" + finalImageList[0].src);
    // return it
    return finalImageList
}

/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement(item => <Photo {...item} />);

const SortableGallery = SortableContainer(({ items }) => (
    // <Gallery photos={items.map(image => {return image.src})} renderImage={props => <SortablePhoto {...props} />} />
    <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));



class AlbumPhotoList extends React.Component {
  constructor() {
      super();
      this.state = {
          items: [],
          startitems:[],
          onSortEnd: [],
          loaded: false
      };
      console.log("HELOOOOOOOOOO");
      this.displayPhotos = this.displayPhotos.bind(this);
      this.afunction = this.afunction.bind(this);
      this.render0 = this.render0.bind(this);

      
  }

  setPhotos = (photos) => {
    this.setState({items:photos})
  }

 
  async afunction(){
 
    await makeAlbumList(window.location.pathname.slice(7)).then((items)=>{
      this.setState({items:items}); 
      this.state.startitems=items; 
      this.state.loaded=true; 
      console.log(items); 
      this.setState({ state: this.state }); 
    });
    
  }

  displayPhotos(){
    //const [items, setItems] = useState(photos);
    
    console.log("PHOTOSSSSSSSS" + this.state.items);
    //console.log("PHOTOSSSSSSSS" + photos[0]);
  
    // items.foreach(item => {item.height = 1; item.width = 1});
    
    console.log("set state-ish");
    this.state.onSortEnd = ({ oldIndex, newIndex }) => {
      this.setPhotos(arrayMove(this.state.items, oldIndex, newIndex));    
    }
    // this.setState({onSortEnd: 
    //   ({ oldIndex, newIndex }) => {
    //   this.setPhotos(arrayMove(this.state.items, oldIndex, newIndex));
    // })}
  }

  

    
  render(){
    // if (this.state.loaded){
    //   console.log("WOOOOOOOOOOOOOOOOOOORRKSSSSSSSSSSSSSSSSSSSSSsssss")
    //   return(this.render0);
    // }
    // else{
    //   return (<></>);
    // }
    console.log("HEEEEEEEEEEEEEEEEEEEEEEE");
    return(      
      <div>
        
        <>
          <ALBUMIFY albumName={window.location.pathname.slice(7)} items={this.state.items} photos={this.startitems}/>
              <SortableGallery updateBeforeSort={()=>this.afunction()} items={this.state.items} onSortEnd={this.state.onSortEnd} axis={"xy"} />
        </>
      
    </div>);
  }



  render0 (){
    
    return(
<></>
    )
}

}

export default AlbumPhotoList;
/* {this.state.items &&  */