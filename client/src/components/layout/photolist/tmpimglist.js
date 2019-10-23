/*import img1 from '../photolist/temp_images/1.png'
import img2 from '../photolist/temp_images/2.png'
import img3 from '../photolist/temp_images/3.png'
import img4 from '../photolist/temp_images/4.png'
import img5 from '../photolist/temp_images/5.png'
import img6 from '../photolist/temp_images/6.png'
import img7 from '../photolist/temp_images/7.png'
import img8 from '../photolist/temp_images/8.png'
import img9 from '../photolist/temp_images/9.png'
import img10 from '../photolist/temp_images/10.png'
import img11 from '../photolist/temp_images/11.png'
import img12 from '../photolist/temp_images/12.png'
import img13 from '../photolist/temp_images/13.png'

const tmpimglist = [
  {
    src: img1,
    width: 1,
    height: 1
  },
  {
    src: img2,
    width: 1,
    height: 1
  },
  {
    src: img3,
    width: 1,
    height: 1
  },
  {
    src: img4,
    width: 1,
    height: 1
  },
  {
    src: img5,
    width: 1,
    height: 1
  },
  {
    src: img6,
    width: 1,
    height: 1
  },
  {
    src: img7,
    width: 1,
    height: 1
  },
  {
    src: img8,
    width: 1,
    height: 1
  },
  {
    src: img9,
    width: 1,
    height: 1
  },
  {
    src: img10,
    width: 1,
    height: 1
  },
  {
    src: img11,
    width: 1,
    height: 1
  },
  {
    src: img12,
    width: 1,
    height: 1
  },
  {
    src: img13,
    width: 1,
    height: 1
  }
];

export default tmpimglist;

*/


import { getImagesfromAlbum } from '../../api/api'

export default function makeAlbumList(albumId){
	var finalImageList = [];
	getImagesfromAlbum(albumId, localStorage.getItem("uid")).then((imageList) => {
		console.log("found imagelist    ", imageList);
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
