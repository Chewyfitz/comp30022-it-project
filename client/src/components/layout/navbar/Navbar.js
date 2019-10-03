//no states so functional component rather than class
//don't need to save state
//TO DO put all stuff in navbar
import React from 'react'
import "./Navbar.css"

//COMPONENTs
import SignedInLinks from '../SignedInLinks'
import SignedOutLinks from '../SignedOutLinks'


const Navbar = () => {
    return(
               
        //"navbar-expand-lg ensures we’re not doubling up on padding unnecessarily on lower viewports when your navbar is collapsed.
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#7488A3'}}>
            {/* Main navbar
                Link to='/' = click to go to home page             
            */}

            <div className="navbar-collapse collapse w-100 order-1 order-md-0 mainbuttons">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <button type="button" className="btn btn-outline-light">Go Home</button>
                    </li>                    
                </ul>
            </div>

            <div className="mx-auto order-0">
                <a className="navbar-brand mx-auto" href="#">Albumify</a>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 mainbuttons">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <button type="button" className="btn btn-outline-light">Search Photos</button>
                    </li>
                </ul>
            </div>

            {/* toggler button, appears when screen is smaller */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".mainbuttons">
                <span className="navbar-toggler-icon"></span>
            </button>            

        </nav>      

    )
}

        
//so that we can use it in app.js, 
//cause it's always going to be in app.js
export default Navbar; 