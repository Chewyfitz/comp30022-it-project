import React, { Component } from 'react';

import Login from "../components/auth/Login";
import Navbar from "../components/auth/LoginPageNavbar";
import "../App.css";

class LoginPage extends Component {
  render() {
    return (
        <div className="LoginPage">
            <div id="page-wrap">
				<Navbar pageName={"Login/Signup"}/>
                <Login />
            </div>
        </div>
    );
  }
}
export default LoginPage;