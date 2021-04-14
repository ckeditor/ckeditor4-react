/* eslint-env node */

import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';

export default {
	input: 'samples/index.tsx',
	external: [ 'react', 'react-dom', 'react-router-dom' ],
	output: {
		file: 'dist/samples.js',
		format: 'umd',
		globals: {
			react: 'React',
			'react-dom': 'ReactDOM',
			'react-router-dom': 'ReactRouterDOM'
		}
	},
	plugins: [
		typescript(),
		htmlPlugin(),
		serve( { contentBase: 'dist', port: 3000 } )
	]
};

/**
 * Prepares `html` plugin to produce customized html.
 * @returns {Plugin} configured plugin
 */
function htmlPlugin() {
	return html( {
		title: 'CKEditor4 React development sample',
		template: ( { attributes, title } ) => {
			return `<!doctype html>
<html${ makeHtmlAttributes( attributes.html ) }>
	<head>
		<title>${ title }</title>
		<link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css" />
	</head>
	<body>
		<div id="app"></div>
		<script src="https://unpkg.com/react@17/umd/react.development.js"></script>
		<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
		<script src="https://unpkg.com/react-router-dom@5.2.0/umd/react-router-dom.js"></script>
		<script src="samples.js"></script>
	</body>
</html>`;
		}
	} );
}

/**
 * Parses attributes for `html` plugin.
 * @param {*} attributes
 * @returns {string} parsed attributes
 */
function makeHtmlAttributes( attributes ) {
	if ( !attributes ) {
		return '';
	}
	const keys = Object.keys( attributes );
	return keys.reduce( ( result, key ) => `${ result } ${ key }="${ attributes[ key ] }"`, '' );
}
