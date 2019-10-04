// links to display when user is signed in
import React from 'react'

const SignedInLinks = () => {
  return (
    
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a class="nav-link" href="#">New Project</a>
      </li>
      <li className="nav-item">
       <a class="nav-link" href="#">Log Out</a>
      </li>
      <li className="nav-item">
       <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </li>
    </ul>

  )
}

export default SignedInLinks