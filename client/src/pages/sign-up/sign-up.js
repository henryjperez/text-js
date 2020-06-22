import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Navigation from '../../components/navigation/navigation';
import { GlobalContext } from '../../context';
import { URI } from '../../config';


function SignUp() {
	const { isItDark, setIsItDark } = useContext(GlobalContext);
	const [warning, setWarning] = useState(false);
	const [fields, setFields] = useState({
		username: "",
		email: "",
		password: ""

	});
	const { username, email, password } = fields;
	const historyRoute = useHistory();



	useEffect(() => { //setting dark mode, first render
		const dark = localStorage.getItem('dark');

		// dark? setIsItDark(true) : setIsItDark(false);


		if (dark == 'true') {
			setIsItDark(true);

		} else if (dark == 'false') {
			setIsItDark(false);
			
		} else {
			setIsItDark(false);
				
		}
		
		document.title = "Text.js | Sign Up";


	}, []);



	// functions handlers----------------------
	function handleFields(event) {
		const { name, value } = event.target;
		setFields( inputs => ({ ...inputs, [name]: value }));

	}

	async function handleOnSubmitCreateUser(event) {
		try {
			event.preventDefault();

			if (fields.password.length < 4 ) {
				setWarning(true);

			} else {
				setWarning(false);
				const response = await fetch(URI + '/api/users/signup', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(fields)

				});
				const responseData = await response.json();
				console.log(responseData);
				setFields({
					username: "",
					email: "",
					password: ""
				});
				localStorage.setItem('token', responseData.token);
				localStorage.setItem('username', responseData.username);
				localStorage.setItem('user_id', responseData.user_id);

				historyRoute.push('/@me');
				
			}

		} catch(err) {
			console.log(err);
			
		}
	}


	return(
		<div className={ "it-is-dark-" + isItDark + " signup-page" } >
			<section className="nav-bar">
				<Navigation />
			</section>
			<section className="sign-form">
				<h1>Sign UP</h1>
				<form method="POST" onSubmit={ handleOnSubmitCreateUser } autoComplete="off" >
					<input type="text" className="username-form" placeholder="username" name="username" value={ username } onChange={ handleFields } required />
					<br/>
					<input type="email" className="email-form" placeholder="email" name="email" value={ email } onChange={ handleFields } required />
					<br/>
					<input type="password" className="password-form" placeholder="password" name="password" value={ password } onChange={ handleFields } required />
					<br/>
					<p>{ warning && "The password most have a minimum length of 5 characters" }</p>
					<button type="submit">Sign Up</button>
				</form>
			</section>
		</div>
		

	);
}

export default SignUp;
