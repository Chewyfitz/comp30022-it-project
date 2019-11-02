import axios from "axios";

const url = `${process.env.REACT_APP_API_URL}/api`;
// Get all the images from a specified album
export async function getImagesfromAlbum(albumId, userId) {
	
    // Set up the routes for stuff we're about to get
    const albumImagesRoute = `${url}/album/${albumId}?user=${userId}&perPage=50`;
    // const imagesRoute = `${url}/image`;

    // Get the list of images from the album
    var imgs = axios.get(albumImagesRoute).then(async (res) => {
        var images = [];
        const photos = res.data.photos
        // For each photo, get the URL for its ID
        for(var photo in photos){
			images.push({
				src: photos[photo].reference,
				imageId: photos[photo].photoID,
				albumPos: photo
			});
        }
		return images
    });

    // Wait for the array to be done
    var images = await imgs;
    
    // return the array of URLs
    return images;
}

export async function CreateNewAlbum(albumName, photos) {
	var albumId;
	if(albumName){
		// Create the album
		albumId = 
			axios.post(`${process.env.REACT_APP_API_URL}/api/album/`, null, { params: {
				albumName: albumName,
				user: localStorage.getItem("uid"),
			}}).then( res => {
				// Then if we've got any photos to add to the album, do so
				var albumId = res.data;
				if(photos && photos.length > 0){
					AddImagesToAlbum(photos, albumId);
				}
				return albumId;
			});
		return await albumId;
	}
}

export async function AddImagesToAlbum(photos, albumId) {
	if(!albumId){ // How else do we know where to put them?
		throw "album ID not defined!";
	}
	if(!photos){ // How can we move photos if we don't know which ones?
		throw "no photos given.";
	}

	// sort the photos in descending order of position so none of them change.
	photos.sort((a, b) => (a.albumPos < b.albumPos) ? 1 : -1);

	// Now do some magic
	for(var i in photos){
		// PUT the image in the new album
		var putreq = axios.put(`${url}/album/${albumId}`, null, { params:
			{
				user: localStorage.getItem("uid"),
				imageId: photos[i].imageId
			}
		})
		// then once it's been put in the new album,
		// DELETE it from the old album (un - to be generalised)
		var delreq = axios.delete(`${url}/album/un`, { params:
			{
				user: localStorage.getItem("uid"),
				position: photos[i].albumPos.toString()
			}
		})
		await putreq;
		await delreq;
	}

}
