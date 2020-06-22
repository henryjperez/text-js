import React, { useContext } from 'react';

import './channel-list.css';
import Channel from '../channel/channel';
import NavChat from '../nav-chat/nav-chat';
import Switch from '../switch/switch';
import LogOut from '../logout/logout';
import { GlobalContext } from '../../context';
import DropdownMenu from '../dropdown-menu/dropdown-menu';
import NewChannelButton from '../new-channel-button/new-channel-button';
import NewChannelForm from '../new-channel-form/new-channel-form';



function ChannelList() {
	const { renderChat,
			channelsArray,
			sessionVariables } = useContext(GlobalContext);


	return(
		<div className={ renderChat? "channel-list-wrapper-true": "channel-list-wrapper-false" }>
			<section className="channels-nav-bar" >
				<NavChat
				titleName={ "Welcome, " + sessionVariables.username }
				menu="..."
				styleProp="display-none-menu"
				stylePropNavShape="nav-shape-channels">
					<DropdownMenu styleProp="display-none-menu">
						<Switch />
						<LogOut />
					</DropdownMenu>
				</NavChat>
			</section>
			
			<section className="channel-list-section">
				<ul className="channel-list">

					{
						channelsArray.map( function({ channel_username, channel_id }) {
							return (
								<Channel
									key={ channel_id }
									user={ channel_username }
									channel_id={ channel_id }
								/>
							)
							
						})

					}
					
				</ul>
			</section>
			<section className="new-channel-section">
				<NewChannelButton>
					<NewChannelForm />
				</NewChannelButton>
			</section>
		</div>
		

	);

}

export default ChannelList;