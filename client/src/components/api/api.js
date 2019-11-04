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
				albumPos: photo,
				title: photos[photo].caption
			});
        }
		return images
    });

    // Wait for the array to be done
    var images = await imgs;
    
    // return the array of URLs
    return images;
}

export async function getAlbumList(){
	// Get the albums
	console.log(`Getting Albums`);
	return await axios.get(`${url}/album/`,{ params: {
		user: localStorage.getItem("uid")
	}}).then(res => { // then print response status
		console.log(`response: ${res.data}`);
		var newList = [];
		for(var key in res.data){
			if (res.data.hasOwnProperty(key)) {
				newList.push({name: res.data[key],
							albumId: key});
			}
		}
		return newList;
	}).catch((err) => {
		console.error(err);
	});
}

export async function CreateNewAlbum(albumName, photos) {
	var albumId;
	if(albumName){
		// Create the album
		albumId = 
			axios.post(`${url}/album/`, null, { params: {
				albumName: albumName,
				user: localStorage.getItem("uid"),
			}}).then(async res => {
				// Then if we've got any photos to add to the album, do so
				var albumId = res.data;
				if(photos && photos.length > 0){
					await AddImagesToAlbum(photos, albumId);
				}
				return albumId;
			});
		return await albumId;
	}
}

export async function AddImagesToAlbum(photos, albumId, remove=true, removeAlbum='un') {
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
		});

		if(remove){
			// then once it's been put in the new album,
			// DELETE it from the old album (un - to be generalised)
			var delreq = axios.delete(`${url}/album/${removeAlbum}`, { params:
				{
					user: localStorage.getItem("uid"),
					position: photos[i].albumPos.toString()
				}
			});
		} else {
			// Give it any value so it doesn't wait
			var delreq = 0;
		}
		await putreq;
		await delreq;
	}
	return;
}

/** Reorder the images on the back-end so that the state is consistent between
 *  page sessions.
 * 
 *  @param album - the album which is being rearranged
 * 
 *  @param subset_permutation - an object mapping initial to final arrangement
 * 	eg {1: 3, 3: 2, 2: 0, 0: 1}
 * 	Must be a proper permutation.
 */
export async function reorderImages(albumId, subset_permutation){
	// This functionality isn't implemented yet, but should be soon.
	var updatereq = axios.patch(`${url}/album/${albumId}`, {
		params: {
			user: localStorage.getItem("uid"),
			permutation: JSON.stringify(subset_permutation),
		}
	})

	return await updatereq;
}


export async function UpdateCaption(photoPos, albumName, caption){
	console.log("photoPos", photoPos, "albumName", albumName, "caption", caption);
	var newRes = axios({method: "patch",
		url: `${url}/album/${albumName}`,
		params: {user: localStorage.getItem("uid"),
				position: photoPos,
				caption: caption}
		}).then(async (res) => {
			console.log(res);
			return res
		});
	var res = await newRes;
	
	return res
}

