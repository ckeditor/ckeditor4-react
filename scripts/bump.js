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
const jsxFilePath = path.resolve( __dirname, '..', 'src', 'ckeditor.jsx' );
const jsxFileData = fs.readFileSync( jsxFilePath, 'utf8' );

fs.writeFileSync( jsxFilePath,
	jsxFileData.replace( /https:\/\/cdn\.ckeditor\.com\/\d\.\d+\.\d+/g, `https://cdn.ckeditor.com/${ version }` ), 'utf8' );

// Update CDN link in 'karma.conf.js' file.
const karmaFilePath = path.resolve( __dirname, '..', 'karma.conf.js' );
const karmaFileData = fs.readFileSync( karmaFilePath, 'utf8' );

fs.writeFileSync( karmaFilePath,
	karmaFileData.replace( /https:\/\/cdn\.ckeditor\.com\/\d\.\d+\.\d+/g, `https://cdn.ckeditor.com/${ version }` ), 'utf8' );

// Update 'peerDependency' in 'package.json'.
pkg.peerDependencies.ckeditor = `^${ version }`;
fs.writeFileSync( path.resolve( __dirname, '..', 'package.json' ), JSON.stringify( pkg, null, '  ' ) );

// Update 'devDependency' in 'package.json' file and entire 'package-lock.json' file.
shell.exec( `npm install ckeditor@${ version } --save-dev` );
