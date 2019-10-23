//no states so functional component rather than class
//don't need to save state
//TO DO put all stuff in navbar
import React from 'react'
import "./Navbar.css"
import axios from 'axios';

function handleClick(oldphotolist, newphotolist) {


    console.log(oldphotolist);
    console.log(oldphotolist);
    var toSend = {};

    //TO DO change src to albumposition then SEND to front end

    for (var i=0 ; i<oldphotolist.length ; i++){
        if(oldphotolist[i].src != newphotolist[i].src){
            toSend[oldphotolist[i].src] = newphotolist[i].src; 
        }
        console.log(oldphotolist[i]);
    }

    console.log(toSend);
    
    // //const updatedItems = items.map(item => {return {old, item.index}});

    // //onClick(event, { photo, index });
    // //onClick={onClick ? handleClick : null}
    // let data = new FormData() 
    // const config = {
    //   headers: { 'content-type': 'multipart/form-data'}
    // }
    // // Set the send values
    // const user='test_user'; // For testing purposes
    // const url = `${process.env.REACT_APP_API_URL}/api/image?user=${user}`;
    // // Send the data
    // axios.post(url, items, config).then( (res) => { 

    //   console.log(res.statusText);

    // }).catch(err => {
    //     // Print any errors from sending the files
    //     console.error(err.response);
    // });
}


const ALBUMIFY = ({photos, items}) => { //functional component, equal to arrow function
    console.log(photos);
    console.log(items);
    const oldphotolist=photos;
    const newphotolist=items;
    
    //when clicked send photo list to backend (keep the order)
    return(
        <nav className="navbar navbar-expand-sm navbar-dark fixed-top2" style={{backgroundColor:'#F4F6F8'}}>
            {/*Sub navbar*/}
            <a href='./albumify' class="btn btn-default btn-block ALBUMIFY-text" onClick={handleClick(oldphotolist,newphotolist)}>
                ALBUMIFY
            </a>
        </nav>
    )
}
 
export default ALBUMIFY; 
