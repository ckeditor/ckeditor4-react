import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

function renderMarkup() {
	const app = ReactDOMServer.renderToString( <App /> );
	return `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<style>
			body {
				font-size: 0.875rem;
				font-family: Sans-Serif;
			}

			footer {
				margin: 1rem 0;
			}
		</style>
	</head>
	<body>
		<div id="root">${ app }</div>
		<script src="bundle.js"></script>
	</body>
</html>`;
}

export default renderMarkup;
