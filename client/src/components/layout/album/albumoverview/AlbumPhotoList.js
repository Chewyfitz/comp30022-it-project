import React from "react";
import Gallery from "react-photo-gallery";

import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { getImagesfromAlbum } from '../../../api/api'

import Photo from "./RearrangablePhoto";

import ALBUMIFY from '../ALBUMIFYButton';




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
        finalImageList.push({key: i.toString(), src: imageList[i].src, width: 1, height: 1});
    }

    // return it
    return finalImageList
}

class AlbumPhotoList extends React.Component {
    // Build an AlbumPhotoList
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            firstItems: null,
            items: null,
        }
        this.props.updateItems.bind(this);
        this.props.changeView.bind(this);
        // Run the function to populate the album
        if(this.state.items == null){
            makeAlbumList(props.match.params.albumId).then(items => {
                this.setState({items: items});
                this.setState({firstItems: items});
                this.props.updateItems(items);
            });
        }

    }
    
    // What happens when you finish sorting
    onSortEnd = ({ oldIndex, newIndex }) => {
        var newItems = arrayMove(this.state.items, oldIndex, newIndex)
        this.setState({items: newItems});
        this.props.updateItems(newItems);
    };

    render () {
        return(
            <div>
                {this.state.items && <>
                    <ALBUMIFY onclick={this.props.changeView} albumId={this.props.match.params.albumId} newItems={this.state.items} oldItems={this.state.firstItems}/>
                        <SortableGallery items={this.state.items} onSortEnd={this.onSortEnd} axis={"xy"} />
                    </>
                }
            </div>
        );
    }
}
export default AlbumPhotoList;
