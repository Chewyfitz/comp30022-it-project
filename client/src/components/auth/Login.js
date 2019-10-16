import React, { Component } from 'react'
import './Login.css'
import App from '../../app.js'
import { Redirect } from 'react-router-dom';
import axios from 'axios';


//COMPONENTS
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { username: '',
					  psword: '', 
					  redirect: false,
					  failedLogin: false};
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
			const data = new FormData();
			data.append('username', this.state.username);
			data.append('password', this.state.psword);
			axios.get(`https://robbiesapiteam.herokuapp.com/api/user/user=${this.state.username}`, data, { })
			.then(res => { // then print response status
				console.log(res.statusText);
				try {
					localStorage.setItem('loginToken', res.data);
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
		if(this.state.username!='' && this.state.psword!==''){
			const data = new FormData();
			data.append('username', this.state.username);
			data.append('password', this.state.psword);
			axios.post('https://robbiesapiteam.herokuapp.com/api/user/', data, { })
			.then(res => { // then print response status
				console.log(res.statusText);
				try {
					localStorage.setItem('loginToken', res.data);
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
	UsernameChangeHandler = (event) => {
		this.setState({username: event.target.value});
	}
	PasswordChangeHandler = (event) => {
		this.setState({psword: event.target.value});
	}
	render() {		
		return (  
			<div class="loginPage">
				<div class="container logincontainer">
					<form>
						
						<div class="form-group row d-flex justify-content-center">
							<div class="col-xl-6">
								<label for="formGroupExampleInput">Username</label>
								<input type="text" class="form-control" id="username" placeholder="Username" onChange={this.UsernameChangeHandler}/>
							</div>
						</div>
						<div class="form-group row d-flex justify-content-center">
							<div class="col-xl-6">
								<label for="formGroupExampleInput2">Password</label>
								<input type="password" class="form-control" id="password" placeholder="Password" onChange={this.PasswordChangeHandler}/>
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
							  Please input a username and password
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
