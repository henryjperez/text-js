import React from 'react';
import './input.css';


function Input({ message, setMessage, sendMessage }) {


	function handleMessageValue(event) {
		const { value } = event.target;
		setMessage(value);

	}



	return(
		<form
		className="input-form"
		onSubmit={ sendMessage }
		autoComplete="off" >

			<input
			className="input-text" 
			type="text"
			placeholder="Write your world..."
			value={ message }
			onChange={ handleMessageValue }
			name="text_message"
			/>

			<button className="send-button"
			type="submit">
			SEND
			</button>
			
		</form>

	);

}


export default Input;
