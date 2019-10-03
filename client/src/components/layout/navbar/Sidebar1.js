import React from 'react'
import "./Sidebar.css"

const Sidebar = () => {
    return(
        <nav className="navbar navbar-default sidebar" role="navigation" style={{backgroundColor:'#717381'}}>
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="btn btn-outline-dark navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>      
                </div>
                <div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
                    <ul className="nav navbar-nav">       
                        <li ><a href="#">Libros</a></li>        
                        <li ><a href="#">Tags</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar; 