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
        
        //"navbar-expand-lg for extended components on navbar
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#e3f2fd'}}>
        <div class="container-fluid">
            {/* Main navbar
                Link to='/' = click to go to home page             
            */}
            <a className="navbar-brand navbar-center-cust" href="#">Albumify</a>
           
            <button type="button" class="btn  nbtn-default navbar-btn">Go Home</button>
              
            <button type="button" class="btn btn-default navbar-btn">Search Photos</button>
            
            {/* Sub navbar */}            
            {/* <div class="row">

                <a className="navbar-center-cust" href="#">Upload Photos</a>
            
                <button type="button" class="btn  nbtn-default navbar-btn">Add to Album</button>
            
                <button type="button" class="btn btn-default navbar-btn">Delete Photos</button>
            </div> */}
        </div>
        </nav>
        
    )
}
        
        {/* "navbar-expand-lg for extended components on navbar
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#e3f2fd'}}>
        <div class="container-fluid"> */}
       
        {/* Main navbar
            Link to='/' = click to go to home page
            <SignedInLinks />
            <SignedOutLinks />                 
       */}

        {/* //         <a className="navbar-brand navbar-center-cust" href="#">Albumify</a>
                
        //         <a className="navbar-brand navbar-left-cust" href="#">left</a>
        //         <button type="button" class="btn btn-default navbar-btn">Main Page</button>
                
        //         <button type="button" class="btn btn-default navbar-btn">Search</button>
        //         <a className="navbar-brand navbar-right-cust" href="#">right</a>


        //     <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        //     <ul class="nav navbar-nav">
        //         <li class="pull-left"><a href="#">Dashboard</a></li>
        //         <li class="active"><a href="#">Stories</a></li>
        //         <li><a href="#">Videos</a></li>
        //         <li><a href="#">Photos</a></li>
        //         <li class="social pull-right"><a href="#">Social Links</a></li>
        //     </ul>
        //     </div>
        // </div>
        // </nav> */}

        
//so that we can use it in app.js, 
//cause it's always going to be in app.js
export default Navbar; 