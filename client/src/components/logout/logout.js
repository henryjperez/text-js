import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './logout.css';
import { GlobalContext } from '../../context';


function LogOut() {
	const historyRoute = useHistory();
	const { socket,
			channelRender } = useContext(GlobalContext);

	function removeLocalStorage() {
		socket.emit('leave', channelRender.channel_id);

		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('user_id');
		historyRoute.push('/');

	}

	return (
		<li onClick={ removeLocalStorage } className="logout" >
			LogOut
		</li>

	);

}

export default LogOut;