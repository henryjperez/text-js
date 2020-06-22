import React, { useContext } from 'react';

import './nav-chat.css';
import { GlobalContext } from '../../context';



function NavChat({ titleName, menu, children, channel_id, setMessagesArray, styleProp, stylePropNavShape }) {
	const {	socket,
			dropdown,
			setDropdown,
			renderChat,
			setDropForm,
			setRenderChat } = useContext(GlobalContext);

	const goBack = <button className="go-back button-nav" onClick={ handleBackButtonToggle } >V</button>


	function handleBackButtonToggle() {
		setRenderChat(false);
		socket.emit('leave', channel_id);
		setMessagesArray([]);

	}

	function handleDropDown() {
		setDropdown(!dropdown);
		setDropForm(false);
	}
	


	return(
		<nav className="title-nav">
			<ul className={ "display-wrapper " + stylePropNavShape }>
				<li>
					{ renderChat && goBack }
				</li>

				<li className="title-displayed">
				<strong>{ titleName }</strong>
				</li>

				<li><button
					className={ "button-nav-menu button-nav " + styleProp }
					onClick={ handleDropDown } >
					{ menu }
					</button>
				</li>
			</ul>
			{ dropdown && children }
		</nav>

	);

}

export default NavChat;
