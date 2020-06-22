import React, { useState, useEffect, useContext } from 'react';

import './chat-area.css';
import Input from '../input/input';
import NavChat from '../nav-chat/nav-chat';
import Message from '../message/message';
import { URI } from '../../config';
import Switch from '../switch/switch';
import LogOut from '../logout/logout';
import { GlobalContext } from '../../context';
import DropdownMenu from '../dropdown-menu/dropdown-menu';


const ChatArea = () => {
	// setting the local variables of authentication, userID and messages sent
	const [message, setMessage] = useState('');
	const [messagesArray, setMessagesArray] = useState([]);
	const { socket,
			renderChat,
			channelRender,
			sessionVariables } = useContext(GlobalContext);
	


	useEffect(() => { // getting the messages of the user with the token and channel_id.
		if (channelRender.channel_id) {
			fetch(URI + "/api/messages", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + sessionVariables.token,
				'channel_id': channelRender.channel_id
			}
			})
			.then( response => response.json() )
			.then( data => {
				if (data.messages) {
					setMessagesArray(data.messages);
				}
			} )
			.then( ()=> handleScrollToBottom() )
			.catch( err => console.log('error in getting the channels, brah') );

					//----------------------------------------
			socket.open();

			socket.emit('join', channelRender.channel_id);

		
		}

		return( () => {
			socket.emit('leave', channelRender.channel_id);
			setMessagesArray([]);

		} );

		
			
	}, [channelRender]);


	useEffect( () => {
	    socket.on('new-message', (socketResponse) => {
		console.log("perrito mesajero",socketResponse)
		setMessagesArray( messages => [...messages, socketResponse] );
		handleScrollToBottom()

		})
	
	}, []);




	function sendMessage(event) {
		event.preventDefault();
		
		fetch(URI + '/api/messages', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + sessionVariables.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: message,
				channel_id: channelRender.channel_id
			})

		})
		.then( response => console.log(response) ) // DEV
		.catch( (error) => {
			console.error(error);
		});
		setMessage('');
		

	}

	
	function handleScrollToBottom() {
		const $messageArea = document.querySelector('.message-area');
		
		const mq = window.matchMedia('(min-width: 700px)');
		
		if (mq.matches) {
			console.log("yes matches")		
			$messageArea.scrollTop = $messageArea.scrollHeight;
		} else {
			console.log("no natch")
			$messageArea.scrollIntoView(false);
		}
		
	}

	


	return (
		<div className={ renderChat? "chat-area": "chat-area-none" }>
			<section className="chat-area-nav-chat">
				<NavChat
				titleName={ channelRender.user }
				menu="..."
				channel_id={ channelRender.channel_id }
				setMessagesArray={ setMessagesArray }
				>
					<DropdownMenu>
						<Switch />
						<LogOut />
					</DropdownMenu>
				</NavChat>
			</section>
			<section className="message-section" >
				<ul className="message-area" >
					{
						messagesArray.map( function({ _id, date, author, content }) {
							if (author === sessionVariables.username) {
								return (
									<Message key={_id}
									text={ content }
									owner="own"
									/>)

							} else {
								return (
									<Message key={_id}
									text={ content }
									owner="not-own"
									/>)
							}
						})
					}
				</ul>
			</section>
			<section className="chat-area-input-section">
				<Input 
				message={ message } 
				setMessage={ setMessage } 
				sendMessage={ sendMessage } 
				/>
			</section>
		</div>

	);

	

}


	


export default ChatArea;
