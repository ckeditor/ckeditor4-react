import * as React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
	return (
		<ul className='routes'>
			<li>
				<Link to="/">{'Test'}</Link>
			</li>
		</ul>
	);
}

export default Navigation;
