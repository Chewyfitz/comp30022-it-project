import Axios from "axios";

const url = `${process.env.REACT_APP_API_URL}/api`;

export async function getImagesfromAlbum(albumId, userId) {
    const user = 'test_user';
    const albumImagesRoute = `${url}/album/${albumId}?user=${user}`;
    const imagesRoute = `${url}/image`;
    var imgs = Axios.get(albumImagesRoute).then(async (res) => {
        var images = [];
        const photos = res.data.photos
        for(var i = 0; i < photos.length; i++){
            var req = Axios.get(`${imagesRoute}/${photos[i].id}?user=${user}`).then( (res) => {
                return res.data['Photo Reference'];
            });
            images.push(req);
        }
        return await Promise.all(images);
    });

    var images = await imgs;
    console.log(images);
    return images;
}