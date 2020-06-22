import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './chat.css';
import { URI } from '../../config';
import { GlobalContext } from '../../context';
import ChatArea from '../../components/chat-area/chat-area';
import ChannelList from '../../components/channel-list/channel-list';
import ChatWrapper from '../../components/chat-wrapper/chat-wrapper';


function Chat() {
	const { socket,
			isItDark,
			setIsItDark,
			channelRender,
			setChannelsArray,
			setSessionVariables } = useContext(GlobalContext);

	const historyRoute = useHistory();


	// First Render, UseEffect ----------------------------------------------------------
	useEffect(() => { // getting the channels of the user with the token.
		const varToken = localStorage.getItem('token');
		const varUsername = localStorage.getItem('username')
		const varUser_id = localStorage.getItem('user_id')
		const dark = localStorage.getItem('dark');


		// setting the dark mode from local storage,
			if (dark == 'true') {
				setIsItDark(true);

			} else if (dark == 'false') {
				setIsItDark(false);

			} else {
				setIsItDark(false);
				
			}


		if (varToken && varUsername && varUser_id) {
			setSessionVariables({
				token: varToken,
				username: varUsername,
				user_id: varUser_id
			});

			fetch(URI + "/api/channels", {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + varToken,
					'Content-Type': 'application/json'
				}
			})
			.then( response => response.json() )
			.then( data => {
				if (data.channels_id) {
				console.log(data)
					
					setChannelsArray(data.channels_id)
				} else {
					historyRoute.push('/');
				}
			})
			.catch( err => {
				console.log('error in getting the channels, brah');
				console.log(err);
				historyRoute.push('/');
			});

		} else {
			console.log('Naah, brah');
			historyRoute.push('/'); // in case that the user doesn't have a token and username.
		}

		document.title = "Text.js | " + varUsername

		socket.emit('login', varUser_id);

		socket.on('new-channel', (socketResponse) => {
			console.log("perrito",socketResponse);
			setChannelsArray( channels => [ socketResponse, ...channels ] );

		});

		return( () => {
			socket.emit('leave', varUser_id);
			setChannelsArray([]);
			setSessionVariables("");

		} );

	}, []);
	// UseEffect END ----------------------------------------------------------




	return(
		<main className={ "chat-main it-is-dark-" + isItDark } >
			<div>
				<ChannelList />
			</div>

			<div>
				<ChatWrapper>
					<ChatArea
						username_title={ channelRender.user }
						channel_id={ channelRender.channel_id }
					/>
				</ChatWrapper>
			</div>			
		</main>

	);

}

export default Chat;
