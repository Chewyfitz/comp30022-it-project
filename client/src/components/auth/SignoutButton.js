import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Signs the user out by clearing their login token
class SignoutButton extends Component {
	render() {
		return(
		<Link to='/login'><button type="button" class="btn btn-primary" onClick={localStorage.clear('loginToken')}>Signout</button></Link>
		)
	}
}

export default SignoutButton;