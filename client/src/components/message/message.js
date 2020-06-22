import React from 'react';
import './message.css';

function Message({ text, owner }) {	

	return(
		<li className={ "message " + owner }>
			<p>{ text }</p>
		</li>

	);

}

export default Message;