/* global process, require, __dirname */

const fs = require( 'fs' );
const path = require( 'path' );
const shell = require( 'shelljs' );
const pkg = require( '../package.json' );

const args = process.argv;

if ( !( args && args[ 2 ] && args[ 2 ].length > 2 ) ) {
	console.error( 'Missing CKEditor version! USAGE: npm run bump A.B.C, for example: npm run bump 4.11.5' );
	process.exit( 1 );
}

const version = args[ 2 ];

// Update CDN link in 'src/ckeditor.jsx' file.
updateCdnLink( path.resolve( __dirname, '..', 'src', 'ckeditor.jsx' ) );

// Update CDN link in 'karma.conf.js' file.
updateCdnLink( path.resolve( __dirname, '..', 'karma.conf.js' ) );

// Update 'peerDependency' in 'package.json'.
pkg.peerDependencies.ckeditor = `^${ version }`;
fs.writeFileSync( path.resolve( __dirname, '..', 'package.json' ), JSON.stringify( pkg, null, '  ' ) );

// Update 'devDependency' in 'package.json' file and entire 'package-lock.json' file.
shell.exec( `npm install ckeditor@${ version } --save-dev` );

function updateCdnLink( path ) {
	const file = fs.readFileSync( path, 'utf8' );
	const cdnLinkRegex = /https:\/\/cdn\.ckeditor\.com\/\d\.\d+\.\d+/g;

	fs.writeFileSync( path,
		file.replace( cdnLinkRegex, `https://cdn.ckeditor.com/${ version }` ), 'utf8' );
}
