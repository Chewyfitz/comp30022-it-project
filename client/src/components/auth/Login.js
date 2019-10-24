import React, { Component } from 'react'
import './Login.css'
import App from '../../app.js'
import { Redirect } from 'react-router-dom';
import axios from 'axios';


//COMPONENTS
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '',
					  psword: '', 
					  redirect: false,
					  failedLogin: false,
					  userForgotPassword: false,
					  noEmail: false};
	}
	renderRedirect = () => {
		if (this.state.redirect) {
		  return <Redirect to='/' />
		}
	}  
	LoginSubmitHandler = (event) => {
		event.preventDefault();
		// if valid username/password, send it to back end and store the login token to indicate we're logged in
		if(this.state.username!='' && this.state.psword!==''){
			// this format is required to send params on get requests, strangely enough
			axios({method: "post",
			url: `${process.env.REACT_APP_API_URL}/api/login`,
			auth: {username: this.state.email,
					password: this.state.psword}
			})
			.then(res => { // then print response status
				console.log(res.statusText);
				console.log("res data");
				console.log(res.data);
				try {

						localStorage.setItem('loginToken', res.data.user.stsTokenManager.accessToken);
					localStorage.setItem('uid', res.data.user.uid);
					console.log(localStorage.getItem("loginToken"));
					console.log(localStorage.getItem("uid"));
					console.log("set credentials");
					this.setState({
						redirect: true
					})
				} catch(err){
					console.log(err);
				}
			})
		}
		//otherwise display error message
		else{
			this.setState({failedLogin: true});
		}
	}
	//works exactly the same as for logging in, but sends request to the account creation route instead
	AccountCreateSubmitHandler = (event) => {
		event.preventDefault();
		if(this.state.email!='' && this.state.psword!='' && this.state.psword.length>=6){
			console.log(`${this.state.email}:${this.state.psword}`);
			//axios.post('https://robbiesapiteam.herokuapp.com/api/register', null, {auth: {username: this.state.email,
			axios.post('https://robbiesdebugteam.herokuapp.com/api/register', null, {auth: {username: this.state.email,
																					password: this.state.psword}})
				//headers: {"authorization": "Basic ".concat(btoa(`${this.state.email}:${this.state.psword}`))}})
			//axios.post('https://itprojecttestapi.herokuapp.com/api/user/register', null, {headers: {"authorization": "Basic ".concat(btoa(`${this.state.email}:${this.state.psword}`))}})
			//axios.post('https://itprojecttestapi.herokuapp.com/api/user/register', null, {auth: {username: this.state.email,
			//																		password: this.state.psword}})
			.then(res => { // then print response status
				console.log(res.statusText);
				try {
					
					localStorage.setItem('loginToken', res.data.user.stsTokenManager.accessToken);		
					localStorage.setItem('uid', res.data.user.uid);
					console.log("set credentials");
					//console.log(localStorage.getItem("loginToken"));
					//console.log(localStorage.getItem("uid"));
					
					this.setState({
						redirect: true
					})
				} catch(err){
					console.log(err);
				}
			})
		}
		else{
			this.setState({failedLogin: true});
		}
	}
	EmailChangeHandler = (event) => {
		this.setState({email: event.target.value});
	}
	PasswordChangeHandler = (event) => {
		this.setState({psword: event.target.value});
	}
	forgotPassword = () => {
		if(!this.state.email){
			this.setState({noEmail: true});
		}
		else{
			axios.post('https://robbiesapiteam.herokuapp.com/api/user/password', null, {params: {email: this.state.email}})
			.then(res => {this.setState({userForgotPassword: true})})
		}
	}
	render() {		
		return (  
			<div class="loginPage">
				<div class="container logincontainer">
					<form>
						
						<div class="form-group row d-flex justify-content-center">
							<div class="col-xl-6">
								<label for="formGroupExampleInput">Email</label>
								<input type="text" class="form-control" id="email" placeholder="Email" onChange={this.EmailChangeHandler}/>
							</div>
						</div>
						<div class="form-group row d-flex justify-content-center">
							<div class="col-xl-6">
								<label for="formGroupExampleInput2">Password</label>
								<input type="password" class="form-control" id="password" placeholder="Password (at least 6 characters)" onChange={this.PasswordChangeHandler}/>
								<small id="passwordHelpBlock" class="form-text text-muted">
									<a href="#" onClick={this.forgotPassword.bind(this)}>Forgot Password?</a>
								</small>
							</div>
						</div>
						
						<br />
						<div class="row d-flex justify-content-center">
						{this.renderRedirect()}
								<button type="button" class="btn my-btn btn-primary" onClick={this.LoginSubmitHandler.bind(this)}>Login</button>
							
								<div class="midText">&emsp; OR &emsp;</div>   
							
								<button type="button" class="btn my-btn btn-primary" onClick={this.AccountCreateSubmitHandler.bind(this)}>Create an Account</button>
				
						</div>
					</form>
					<br />
					{
					  this.state.failedLogin?
					  <div class="row d-flex justify-content-center">
						  <div class="alert alert-danger loginAlert">
							  Please input a valid email and password
						  </div>
					  </div>

					  :

					  <div></div>
					}
					{
					  this.state.userForgotPassword?
					  <div class="row d-flex justify-content-center">
						  <div class="alert alert-danger loginAlert">
							  Recovery email sent. Please check your inbox
						  </div>
					  </div>

					  :

					  <div></div>
					}
					{
					  this.state.noEmail?
					  <div class="row d-flex justify-content-center">
						  <div class="alert alert-danger loginAlert">
							  Please input a valid email
						  </div>
					  </div>

					  :

					  <div></div>
					}
				</div>
			</div>
		)
	}
}

export default Login;
