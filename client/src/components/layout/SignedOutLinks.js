// links to display when user is signed out
import React from 'react'

const SignedOutLinks = () => {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a class="nav-link" href="#">Signup</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Login</a>
      </li>
    </ul>
  )
}

export default SignedOutLinks
