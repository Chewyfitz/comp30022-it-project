//takes an albumId and returns the list of photos in taht album
import { getImagesfromAlbum } from '../../api/api'
function makeAlbumList(albumId){
    var finalImageList = [];
    getImagesfromAlbum(albumId, 'ZhG2traYnkVPRzGqMQ6PjPnt6pk2').then((imageList) => {
        console.log("found imagelist", imageList);
        for(var url in imageList){
            finalImageList.push({src: imageList[url],
                                width: 1,
                                height: 1}
            )
        }
        console.log("finalImageList = ", finalImageList);
        return finalImageList
   })
    
}
export default makeAlbumList;