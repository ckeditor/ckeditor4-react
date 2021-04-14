import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import Routes from './Routes.jsx';

render(
	<HashRouter>
		<Navigation />
		<Routes />
	</HashRouter>,
	document.getElementById( 'app' )
);
