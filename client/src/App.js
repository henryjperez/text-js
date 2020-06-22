import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './pages/log-in/log-in';
import Chat from './pages/chat/chat';
import SignUp from './pages/sign-up/sign-up';
import { ContextProvider } from './context';
import './globals.css';
import './media-query-700.css';

const App = () => {

	return (
	<ContextProvider>
		<main>
			<Router>
				<Route path="/" exact component={ Login } />
				<Route path="/signup" component={ SignUp } />
				<Route path="/@me" component={ Chat } />
			</Router>
		</main> 
	</ContextProvider>
	);
}

export default App;