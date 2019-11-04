//no states so functional component rather than class
//don't need to save state
//TO DO put all stuff in navbar
import React from 'react'
import "./Navbar.css"
import SignoutButton from '../../auth/SignoutButton'

//COMPONENTs
const Navbar = (a) => {

    const {pageName}=a;

    return(  
        //"navbar-expand-lg ensures we’re not doubling up on padding unnecessarily on lower viewports when your navbar is collapsed.
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#7488A3'}}>
            {/* Main navbar
                Link to='/' = click to go to home page             
            */}

            <div className="navbar-collapse collapse w-100 order-1 order-md-0 mainbuttons">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    <a className="btn btn-outline-light" href="/" role="button">Go Home</a>
                    </li>                    
                </ul>
            </div>

            <div className="mx-auto order-0">
                <p className="navbar-brand mx-auto">{pageName}</p>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 mainbuttons">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <SignoutButton />
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