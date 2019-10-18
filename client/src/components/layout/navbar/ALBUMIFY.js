//no states so functional component rather than class
//don't need to save state
//TO DO put all stuff in navbar
import React from 'react'
import "./Navbar.css"


const ALBUMIFY = () => { //functional component, equal to arrow function
    return(
        <nav className="navbar navbar-expand-sm navbar-dark fixed-top2" style={{backgroundColor:'#F4F6F8'}}>
            {/*Sub navbar*/}
            <a href="/albumify" class="btn btn-default btn-block ALBUMIFY-text">
                ALBUMIFY
            </a>
        </nav>
    )
}
 
export default ALBUMIFY; 
