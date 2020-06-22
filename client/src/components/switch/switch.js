import React, { useContext } from 'react';

import { GlobalContext } from '../../context';
import './switch.css';

function Switch() {
	const { isItDark, setIsItDark } = useContext(GlobalContext);
	const mode = isItDark ? "Light Mode" : "Dark Mode";

	function switchMode(event) {
		setIsItDark(!isItDark);

		localStorage.setItem('dark', !isItDark);
	}


	return (
		<li className="dark-mode">
			{ mode }
			<input type="checkbox" className="checkbox" id="checkMode" onChange={ switchMode } checked={ isItDark } />
			<label className="switch" htmlFor="checkMode" ></label>
		</li>

	);

}

export default Switch;
