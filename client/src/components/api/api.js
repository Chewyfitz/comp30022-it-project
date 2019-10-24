import axios from "axios";

const url = `${process.env.REACT_APP_API_URL}/api`;
// Get all the images from a specified album
export async function getImagesfromAlbum(albumId, userId) {
	
    // Set up the routes for stuff we're about to get
    const albumImagesRoute = `${url}/album/${albumId}?user=${userId}&perPage=50`;
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

export async function AddImagesToAlbum(photos, albumName) {
	if(photos.length>0 && albumName){
		console.log("adding photos");
		console.log(photos);
		console.log(albumName);
		axios({method: "put",
			url: `${url}/album/${albumName}`,
			params: {user: localStorage.getItem("uid"),
				imageId: photos[0].imageId}
			})
			.then(async res => {
				await AddImagesToAlbum(photos.slice(1), albumName);
				axios({method: "delete",
					   url: `${url}/album/un`,
					   params: {user: localStorage.getItem("uid"),
								position: photos[0].albumPos.toString()}
				})
								
			})
	}
  }
