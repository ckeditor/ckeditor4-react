import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const element = document.getElementById( 'root' );

if ( !element ) {
	throw new Error( 'Missing root element' );
}

createRoot( element ).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
