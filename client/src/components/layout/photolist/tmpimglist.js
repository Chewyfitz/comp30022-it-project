import { getImagesfromAlbum } from '../../api/api'

async function makeAlbumList(albumId){
	var finalImageList = [];
	const imageList = await getImagesfromAlbum(albumId, localStorage.getItem("uid"));//.then((imageList) => {
		console.log("found imagelist    ", imageList);
		for(var url in imageList){
			finalImageList.push({src: imageList[url],
								width: 1,
								height: 1}
			)
		}
		console.log("finalImageList = ", finalImageList);
		return finalImageList
    //})
	
}
export default makeAlbumList;