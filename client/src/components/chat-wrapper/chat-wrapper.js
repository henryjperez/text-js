import React from 'react';

import './chat-wrapper.css';


function ChatWrapper({ children }) {
	return (
		<div className="chat-wrapper">
			{ children }
		</div>

	);
}

export default ChatWrapper;