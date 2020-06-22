import React, { useContext } from 'react';

import { GlobalContext } from '../../context';
import './new-channel-button.css';


function NewChannelButton({ children }) {
	const { dropForm, setDropForm, setDropdown } = useContext(GlobalContext);

	function handleDropForm() {
		setDropForm(!dropForm);
		setDropdown(false);
	}

	return (
		<div className="new-channel-div">
			{ dropForm && children }			
			<button
			className={ "new-channel-button new-channel-button-" + dropForm }
			onClick={ handleDropForm } >+</button>
		</div>

	);
}


export default NewChannelButton;