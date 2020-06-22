import React from 'react';
import './dropdown-menu.css';

function DropdownMenu({ children }) {
	return (
		<div className="dropdown">
			<ul className="dropdown-menu">
				{ children }
			</ul>
		</div>

	);
}

export default DropdownMenu;