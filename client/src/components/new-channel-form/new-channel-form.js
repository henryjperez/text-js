import React, { useContext } from 'react';

import './new-channel-form.css';
import { URI } from '../../config';
import { GlobalContext } from '../../context';


function NewChannelForm() {
	const { sessionVariables, setChannelsArray } = useContext(GlobalContext);

	function sendChannel(event) {
		event.preventDefault();
		const receptor = event.target[0].value;
		const content = event.target[1].value;
		// fetch API---------------------------------------------
		fetch(URI + '/api/channels', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + sessionVariables.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				receptor,
				content,
				date: Date()
			})

		})
		.then(response =>  response.json() )
		.then( data => {
			if (data.channel) {
				setChannelsArray( channels => [ data.channel, ...channels ]);
			}
		})
		.catch((error) => {
			console.error(error);
		});
		// fetch API---------------------------------------------

		event.target[0].value = "";
		event.target[1].value = "";

	}

	return (
		<form className="new-channel-form" onSubmit={ sendChannel } >
			<input type="text" placeholder="to: <username />" className="first-input" />
			<input type="text" placeholder="Write your world..." />
			<button className="send-channel" type="submit" >SEND</button>
		</form>

	);
}


export default NewChannelForm;