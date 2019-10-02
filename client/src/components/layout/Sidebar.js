//no states so functional component rather than class
//don't need to save state
//TO DO put all albums into sidebar
import React from 'react'
import {Link} from 'react-router-dom' //link component

//COMPONENTs
import AlbumList from './AlbumList'


const Sidebar = () => {
    return(
        //"nav-extended" for extended components on navbar
        <nav className="nav-extended">
            {/*Main navbar
                materialised class that generates rapper for navigation
                makes it look better on screen
                darken-3 = darken by 3 shades for dark grey background
                Link to='/' = click to go to home page
            */}
            <div className="nav-wrapper grey darken-3">
                <Link to='/'className="brand-logo">ALBUMIFY</Link>
                <SignedInLinks />
                <SignedOutLinks />
            </div>

            {/*Tabs under navbar*/}
            <div className="nav-content">
                <ul className="tabs grey darken-3">
                    <li className="tab"><a class="active" href="">Add to Album</a></li>
                </ul>
            </div>
        </nav> 

    )
}

//so that we can use it in app.js, 
//cause it's always going to be in app.js
export default Navbar; 