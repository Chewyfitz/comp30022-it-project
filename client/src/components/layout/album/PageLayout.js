import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import { Modal, ModalGateway } from "react-images";
import AlbumCarousel from '../Carousel'
import '../photolist/Image.css'

function PageLayout({photolist, albumId}) {
    const photos = photolist;
	console.log("photos = ", photos);

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
		setCurrentImage(index);
		setViewerIsOpen(true);
	}, []);
    const closeLightbox = () => {
		setCurrentImage(0);
		setViewerIsOpen(false);
    };
	
    return (
    <div>
        <Gallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
        {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
            <AlbumCarousel
                imageList={photos}
				albumId={albumId}
            />
            </Modal>
        ) : null}
        </ModalGateway>
    </div>
    );
}
export default PageLayout; 
