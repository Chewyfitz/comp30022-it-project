//no states so functional component rather than class
//don't need to save state
//TO DO put all stuff in navbar
import React from 'react'
import "./Navbar.css"
import axios from 'axios';

function handleClick({items}) {

    //onClick(event, { photo, index });
    //onClick={onClick ? handleClick : null}
    let data = new FormData() 
    const config = {
      headers: { 'content-type': 'multipart/form-data'}
    }
    // Set the send values
    const user='test_user'; // For testing purposes
    const url = `${process.env.REACT_APP_API_URL}/api/image?user=${user}`;
    // Send the data
    axios.post(url, items, config).then( (res) => { 

      console.log(res.statusText);

    }).catch(err => {
        // Print any errors from sending the files
        console.error(err.response);
    });
}


const ALBUMIFY = ({items}) => { //functional component, equal to arrow function
    
    //when clicked send photo list to backend (keep the order)
    return(
        <nav className="navbar navbar-expand-sm navbar-dark fixed-top2" style={{backgroundColor:'#F4F6F8'}}>
            {/*Sub navbar*/}
            <a href="/albumify" class="btn btn-default btn-block ALBUMIFY-text" onClick={handleClick(items)}>
                ALBUMIFY
            </a>
        </nav>
    )
}
 
export default ALBUMIFY; 
