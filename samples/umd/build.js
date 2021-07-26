/* eslint-env node */

const fs = require( 'fs' );
const path = require( 'path' );

try {
	const dest = path.resolve( __dirname, 'public' );

	fs.mkdirSync( dest, { recursive: true } );

	[
		'node_modules/react/umd/react.production.min.js',
		'node_modules/react-dom/umd/react-dom.production.min.js',
		'node_modules/ckeditor4-react/dist/index.umd.development.js',
		'node_modules/babel-standalone/babel.min.js',
		'src/index.html'
	].forEach( filePath => {
		const src = path.resolve( __dirname, filePath );
		const fileName = path.basename( filePath );
		const destFile = path.resolve( dest, fileName );
		fs.copyFileSync( src, destFile );
	} );
} catch ( error ) {
	console.error( error );
	process.exitCode = 1;
}
