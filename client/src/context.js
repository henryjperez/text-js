import React, { useState, createContext } from 'react';
import io from 'socket.io-client';

import { URI } from './config';
const socket = io(URI);


export const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
	
	const [isItDark, setIsItDark] = useState(false);
	const [dropForm, setDropForm] = useState(false);
	const [dropdown, setDropdown] = useState(false);

	const [renderChat, setRenderChat] = useState(false);
	
	const [channelsArray, setChannelsArray] = useState([]);

	const [channelRender, setChannelRender] = useState('');
	const [sessionVariables, setSessionVariables] = useState({
		token: null,
		username: null,
		user_id: null
	});

	

	return (
		<GlobalContext.Provider
		value={{
			socket,
			isItDark, setIsItDark,
			dropForm, setDropForm,
			dropdown, setDropdown,
			renderChat, setRenderChat,
			channelsArray, setChannelsArray,
			channelRender, setChannelRender,
			sessionVariables, setSessionVariables,
		}}>
			{ children }
		</GlobalContext.Provider>

	)
}

/*
			backButton, setBackButton,
	const [backButton, setBackButton] = useState(false);
	const [messagesArray, setMessagesArray] = useState([]);

*/