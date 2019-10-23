import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Signs the user out by clearing their login token
class SignoutButton extends Component {
    SignoutUser() {
        localStorage.removeItem('loginToken');
        localStorage.removeItem('uid');
    }
    render() {
        return(
        <Link to='/login'><button type="button" class="btn btn-outline-light" onClick={this.SignoutUser}>Signout</button></Link>
        )
    }
}

export default SignoutButton;