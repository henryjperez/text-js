import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Navigation from '../../components/navigation/navigation';
import imgLight from '../../assets/img/dark-mode-false.png';
import imgDark from '../../assets/img/dark-mode-true.png';

import { GlobalContext } from '../../context';
// import Switch from '../../components/switch/switch';<img src={ require('../../assets/img/landing-image.png') } alt="log in character" className="main-image" />
import { URI } from '../../config';


const Login = () => {
	const { isItDark, setIsItDark } = useContext(GlobalContext);
	const [fields, setFields] = useState({ username: "", password: "" });
	const [mainImg, setMainImg] = useState(imgLight);
	const historyRoute = useHistory();
	//destructing "fields" to set each value independently
	const { username, password } = fields;

	
	useEffect(() => {
		const dark = localStorage.getItem('dark');

	//setting dark mode
		if (dark == 'true') {
			setIsItDark(true);
			setMainImg(imgDark);

		} else if (dark == 'false') {
			setIsItDark(false);
			setMainImg(imgLight);
			
		} else {
			setIsItDark(false);
			setMainImg(imgLight);

		}
		
		document.title = "Text.js | Welcome";

	}, []);


	// functions for the event handlers--------------------
	function handleOnChangeFieldValue(event) {
		const { name, value } = event.target;
		setFields( inputs => ({ ...inputs, [name]: value }));

	}
	
	// Refactoring: shares functionality with "./sign-up"
	async function handleOnSubmitFields(event) {
		try {
			event.preventDefault();
			const response = await fetch(URI + '/api/users/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(fields)

			});
			const responseData = await response.json();
			localStorage.setItem('token', responseData.token);
			localStorage.setItem('username', responseData.username);
			localStorage.setItem('user_id', responseData.user_id);

			// setting the input's value back to zero for security reasons
			setFields({
				username: "",
				password: ""
			});
			historyRoute.push('/@me');


		} catch(err) {
			console.log(err);
			
		}

	}


	return(
		<main className={ "login-page it-is-dark-" + isItDark } >
			<section className="nav-bar">
				<Navigation />
			</section>
			<section className="banner">
				<div className="background-mask">
					<div></div>
				</div>
				<div className="block-container">
					<div>
						<div>
							<a href="#log-in" method="POST" className="btn">Log In</a>
						</div>
						<div className="text-js-comments">
							<div className="text-block">
								<h3>Welcome to Text.js</h3>
								<p>And stay connected with the World.</p>
							</div>
							<div className="text-block">
								<h3>What is Text.js?</h3>
								<p>The Next Generation of online messaging.</p>
							</div>
							<div className="text-block">
								<h3>Why use Text.js?</h3>
								<p>Is awesome. You can do things like send messages, receive messages... and much more!</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="login-block">
				<div className="me">
					<h2>"The Best Telecommunication since the invention of the Telegraph"</h2>
					<p></p>
					<img src={ mainImg } alt="log in character" />
				</div>

				<div className="login-wrapper" id="log-in" >
					<h1>Login</h1>
						<form onSubmit={ handleOnSubmitFields } autoComplete="off">
							<input placeholder="username" type="text" name="username" value={ username } onChange={ handleOnChangeFieldValue } required />
							<br/>
							<input placeholder="password" type="password" name="password" value={ password } onChange={ handleOnChangeFieldValue } required />
							<br/>
							<button type="submit">Log-In</button>
						</form>
						
				</div>
			</section>
			<section className="footer">
				<div className="icons">
					<a href="#" className="facebook"></a>
					<a href="#" className="twitter"></a>
					<a href="#" className="pinterest"></a>
					<a href="#" className="instagram"></a>
					<a href="#" className="youtube"></a>
				</div>
				<div>
					<ul>
						<h1>Text.js</h1>
						<li>About Us</li>
						<li>Contact</li>
						<li>Blog</li>
						<li>Careers</li>
						<li>Support</li>
						<li>Privacy Policy</li>
					</ul>
					<span>© Text.js. All Rights Reserved</span>
				</div>
				
			</section>
			

			
			
			<div className="showcase"></div>
		</main>
		

	);
		

}


export default Login;
