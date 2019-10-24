import Axios from "axios";

const url = `${process.env.REACT_APP_API_URL}/api`;
//const url = 'https://robbiesapiteam.herokuapp.com/api'

// Get all the images from a specified album
export async function getImagesfromAlbum(albumId, userId) {
    // Set up the routes for stuff we're about to get
    const albumImagesRoute = `${url}/album/${albumId}?user=${userId}`;
    const imagesRoute = `${url}/image`;

    // Get the list of images from the album
    var imgs = Axios.get(albumImagesRoute).then(async (res) => {
        var images = [];
        const photos = res.data.photos
        // For each photo, get the URL for its ID
        for(var i = 0; i < photos.length; i++){
            var req = Axios.get(`${imagesRoute}/${photos[i].id}?user=${userId}`).then( (res) => {
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