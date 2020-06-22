import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import logoLight from '../../assets/img/textjs-logo-light.svg';
import logoDark from '../../assets/img/textjs-logo-dark.svg';
import { GlobalContext } from '../../context';
import '../../assets/css/main-styles.css';

function Navigation({ homeLogo }) {
	const { isItDark, setIsItDark } = useContext(GlobalContext);

	return(
		<div>

			<div>
				<Link to="/">
					<div className="logo">
						<img src={ isItDark? logoDark : logoLight } alt="logo-Text.js"/>
					</div>
				</Link>
			</div>

			<div>
				<div className="menu-bar" >
					<ul>
						<li>
							<Link className="btn sign-up" to="/signup">
								Sign Up
							</Link>
						</li>
					</ul>
				</div>
			</div>

		</div>

	);

}

export default Navigation;