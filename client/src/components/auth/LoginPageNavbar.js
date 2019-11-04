//no states so functional component rather than class
//don't need to save state
//TO DO put all stuff in navbar
import React from 'react'
import "./LoginPageNavbar.css"

//COMPONENTs
const LoginPageNavbar = (a) => {

    const {pageName}=a;

    return(  
        //"navbar-expand-lg ensures we’re not doubling up on padding unnecessarily on lower viewports when your navbar is collapsed.
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#7488A3'}}>
            <div className="mx-auto order-0">
                <p className="navbar-brand mx-auto">{pageName}</p>
            </div>            
        </nav> 
    )     
}

        
//so that we can use it in app.js, 
//cause it's always going to be in app.js
export default LoginPageNavbar; 