//no states so functional component rather than class
//don't need to save state
//TO DO put all stuff in navbar
import React from 'react'
import "./Navbar.css"

import NavDropdown from './NavDropdown';

//COMPONENTs


const SubNavbar = () => {
    return(

        <nav className="navbar navbar-expand-sm navbar-dark fixed-top2" style={{backgroundColor:'#F4F6F8'}}>
            {/*Sub navbar*/}
            <div class="mx-auto d-sm-flex d-block flex-sm-nowrap">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#extrabuttons">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse text-center" id="extrabuttons">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <button type="button" class="btn btn-default navbar-btn dropdown-toggle subnavbar-text" id="dropdownMenuButton" data-toggle="dropdown">
                                Add to Album
                            </button>

                            <div class="dropdown-menu">
                                <NavDropdown />
                            </div>
                        </li>

                        <li class="nav-item">
                            <button type="button" class="btn btn-default navbar-btn subnavbar-text">Upload Photos</button>
                        </li>
                        <li class="nav-item">
                            <button type="button" class="btn btn-default navbar-btn subnavbar-text">Delete Photos</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
 
export default SubNavbar; 
