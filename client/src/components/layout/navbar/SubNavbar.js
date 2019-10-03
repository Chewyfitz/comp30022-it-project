//no states so functional component rather than class
//don't need to save state
//TO DO put all stuff in navbar
import React from 'react'
import "./Navbar.css"

//COMPONENTs


const SubNavbar = () => {
    return(

        <nav className="navbar navbar-expand-lg navbar-dark fixed-top2" style={{backgroundColor:'#F4F6F8'}}>
            {/*Sub navbar*/}

            <button class="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#extrabuttons">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-nav w-100 justify-content-center" id="extrabuttons">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <button type="button" class="btn nbtn-default navbar-btn">Add to Album</button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="btn nbtn-default navbar-btn">Upload Photos</button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="btn nbtn-default navbar-btn">Delete Photos</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
    
export default SubNavbar; 