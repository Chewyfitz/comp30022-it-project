//no states so functional component rather than class
//don't need to save state
//TO DO put all stuff in navbar
import React from 'react'
import "../navbar/Navbar.css"

import { reorderImages } from '../../api/api';

function handleClick(albumId, oldphotolist, newphotolist, onclick) {

    console.log("ALBUMIFYYYYYYYYYY");

    var toSend = {};

    //TO DO change src to id (albumposition) then SEND to front end

    for (var i=0 ; i<oldphotolist.length ; i++){
        if(oldphotolist[i].photoID !== newphotolist[i].photoID){
            toSend[oldphotolist[i].photoID] = newphotolist[i].photoID; 
        }
        
    }
    console.log(oldphotolist);
    console.log(toSend);
    onclick(1);

    reorderImages(albumId, toSend).then((res) => {
        console.log(res);
    });
}


const ALBUMIFY = ({albumId, oldItems, newItems, onclick}) => { //functional component, equal to arrow function

    const oldphotolist=oldItems;
    const newphotolist=newItems;
    
    //when clicked send photo list to backend (keep the order)
    return(
        <nav className="navbar navbar-expand-sm navbar-dark fixed-top2" style={{backgroundColor:'#F4F6F8'}}>
            {/*Sub navbar*/}
            <p className="btn btn-default btn-block ALBUMIFY-text" onClick={() => handleClick(albumId, oldphotolist, newphotolist, onclick)}>
                ALBUMIFY
            </p>
        </nav>
    )
}
 
export default ALBUMIFY; 
