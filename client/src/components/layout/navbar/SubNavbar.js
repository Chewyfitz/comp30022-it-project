//no states so functional component rather than class
//don't need to save state
//TO DO put all stuff in navbar
import React from 'react'
import "./Navbar.css"

//COMPONENTs
import NavDropdown from './NavDropdown';
// testing
import UploadButton from './UploadButton';

const SubNavbar = ({photos, albums}) => { //functional component, equal to arrow function
    return(

        <nav className="navbar navbar-expand-sm navbar-dark fixed-top2" style={{backgroundColor:'#F4F6F8'}}>
            {/*Sub navbar*/}
            <div className="mx-auto d-sm-flex d-block flex-sm-nowrap">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#extrabuttons">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center" id="extrabuttons">
                    <ul className="navbar-nav">
                        
                        <li className="nav-item dropdown">
                            <button type="button" 
									className="btn btn-default navbar-btn dropdown-toggle subnavbar-text" 
									id="dropdownMenuButton" 
									data-toggle="dropdown">
                                Add to Album
                            </button>
                            <div className="dropdown-menu">
                                <NavDropdown photoList={photos} albums={albums}/>
                            </div>                            
                        </li>

                        <li className="nav-item">
                            <UploadButton />
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn btn-default navbar-btn subnavbar-text">Delete Photos</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
 
export default SubNavbar;