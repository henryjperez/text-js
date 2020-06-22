import React from 'react';
import './dropdown-menu.css';

function DropdownMenu({ children, styleProp }) {
	return (
		<div className={ "dropdown " + styleProp }>
			<ul className="dropdown-menu">
				{ children }
			</ul>
		</div>

	);
}

export default DropdownMenu;