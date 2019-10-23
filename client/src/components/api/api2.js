import axios from 'axios';

const url = `https://robbiesdebugteam.herokuapp.com/api`;

// Get all the images from a specified album
export async function getImagesfromAlbum(albumId, userId) {
    // Set up the routes for stuff we're about to get
    const albumImagesRoute = `${url}/album/${albumId}`;
    const imagesRoute = `${url}/image`;

    // Get the list of images from the album
    var imgs = axios.get(albumImagesRoute, {params: {user: userId}}).then(async (res) => {
		console.log("gotAlbumImagesRoute");
        var images = [];
        const photos = res.data.photos
        // For each photo, get the URL for its ID
        for(var i = 0; i < photos.length; i++){
            var req = axios.get(`${imagesRoute}/${photos[i].id}?user=${userId}`).then( (res) => {
                return res.data['Photo Reference'];
            });
            // Add the URL (promise) to the images array
            images.push(req);
        }
        // Wait for all of the URLs
        return await Promise.all(images);
    });

    // Wait for the array to be done
    var images = await imgs;
    
    // return the array of URLs
    return images;
}

export function AddImagesToAlbum(photos, albumName) {
	if(photos.length>0 && albumName){
		console.log("adding photos");
		console.log(photos);
		console.log(albumName);
		axios({method: "put",
		//url: `https://robbiesapiteam.herokuapp.com/api/album/${albumName}`,
			url: `${this.url}/album/${albumName}`,
			params: {user: localStorage.getItem("uid"),
				imageId: photos[0].value}
				//uid: localStorage.getItem("uid")}
			})
			.then(res => {
				AddImagesToAlbum(photos.slice(1), albumName);
			})
	}
  }