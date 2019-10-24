import axios from "axios";

const url = `${process.env.REACT_APP_API_URL}/api`;
// const url = "localhost:3001/api";

// Get all the images from a specified album
export async function getImagesfromAlbum(albumId, userId) {
	
    // Set up the routes for stuff we're about to get
    const albumImagesRoute = `${url}/album/${albumId}?user=${userId}`;
    const imagesRoute = `${url}/image`;

    // Get the list of images from the album
    var imgs = axios.get(albumImagesRoute).then(async (res) => {
		console.log(res.status);
		console.log(albumImagesRoute);
		console.log(res);
        var images = [];
        const photos = res.data.photos
        // For each photo, get the URL for its ID
		console.log("photos = ", photos);
        for(var photo in photos){
			images.push({src: photos[photo].reference,
						 imageId: photos[photo].photoID,
						 albumPos: photo});
        }
        // Wait for all of the URLs
        //return await Promise.all(images);
		console.log("this is the images thingy", images);
		return images
    });

    // Wait for the array to be done
    var images = await imgs;
    
    // return the array of URLs
    return images;
}

export async function DeletePositionFromAlbum(position, albumId) {
	axios.delete(`${url}/album/${albumId}`, {params: {
		user: localStorage.getItem('uid'),
		position: position,
	}}).then(status => {
		return status;
	});
}

export async function AddImagesToAlbum(photos, toAlbum, fromAlbum='un') {
	console.log(`Adding images to album ${toAlbum} from ${fromAlbum}.`);
	// Add a bunch of images to an album
	if(photos.length > 0 && toAlbum){
		for(var photo in photos){
			// Define the route to the album
			const sendRoute = `${url}/album/${toAlbum}?imageId=${photos[photo].imageId}&user=${localStorage.getItem('uid')}`;

			// Send the imageId
			await axios.put(sendRoute).then( async () => {
				// If we're going from the 'un'-album
				if( fromAlbum === 'un' ){
					await DeletePositionFromAlbum(photos[photo].albumPos, fromAlbum);
				}
			});
		}
		console.log("done");
		window.location.reload();
	}
}