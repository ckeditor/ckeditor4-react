/* eslint-env node */

const shell = require( 'shelljs' );

shell.mkdir( 'public' );

shell.cp(
	[
		'node_modules/react/umd/react.production.min.js',
		'node_modules/react-dom/umd/react-dom.production.min.js',
		'node_modules/ckeditor4-react/dist/index.umd.development.js',
		'node_modules/babel-standalone/babel.min.js',
		'src/index.html'
	],
	'public'
);
