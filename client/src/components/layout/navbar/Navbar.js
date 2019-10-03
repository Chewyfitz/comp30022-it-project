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

            <div class="navbar-collapse collapse w-100 order-1 order-md-0 mainbuttons">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <button type="button" class="btn btn-outline-light">Go Home</button>
                    </li>                    
                </ul>
            </div>

            <div class="mx-auto order-0">
                <a class="navbar-brand mx-auto" href="#">Albumify</a>
            </div>

            <div class="navbar-collapse collapse w-100 order-3 mainbuttons">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <button type="button" class="btn btn-outline-light">Search Photos</button>
                    </li>
                </ul>
            </div>

            {/* toggler button, appears when screen is smaller */}
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".mainbuttons">
                <span class="navbar-toggler-icon"></span>
            </button>            

        </nav>      

    )
}
    
                {/* Sub navbar */}            
                {/* <div class="collapse" id="extrabuttons">

                    <a className="text-white" href="#">Upload Photos</a>
                
                    <button type="button" class="btn  nbtn-default navbar-btn">Add to Album</button>
                
                    <button type="button" class="btn btn-default navbar-btn">Delete Photos</button>
                </div> */}



        // //"navbar-expand-lg ensures we’re not doubling up on padding unnecessarily on lower viewports when your navbar is collapsed.
        // <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#7488A3'}}>
        // <div class="container-fluid">
        //     {/* Main navbar
        //         Link to='/' = click to go to home page             
        //     */}
        //     <a className="navbar-brand navbar-center-cust" href="#">Albumify</a>
            
        //     <button type="button" class="btn btn-outline-light">Go Home</button>
            
        //     <button type="button" class="btn btn-outline-light">Search Photos</button>
            
   
            
        //     {/* Sub navbar */}            
        //     {/* <div class="row">

        //         <a className="navbar-center-cust" href="#">Upload Photos</a>
            
        //         <button type="button" class="btn  nbtn-default navbar-btn">Add to Album</button>
            
        //         <button type="button" class="btn btn-default navbar-btn">Delete Photos</button>
        //     </div> */}
        // </div>
        // </nav>

        
//so that we can use it in app.js, 
//cause it's always going to be in app.js
export default Navbar; 