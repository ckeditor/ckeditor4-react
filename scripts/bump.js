/* global process, require */

const fs = require( 'fs' );
const shell = require( 'shelljs' );

const args = process.argv;

if ( !( args && args[ 2 ] && args[ 2 ].length > 2 ) ) {
	console.log( 'Missing CKEditor version! USAGE: npm run bump -- A.B.C, for example: npm run bump -- 4.11.5' );
} else {
	const version = args[ 2 ];

	// Update version in 'src/ckeditor.jsx' file.
	const filePath = './src/ckeditor.jsx';
	const fileData = fs.readFileSync( filePath, 'utf8' );

	fs.writeFileSync( filePath,
		fileData.replace( /https:\/\/cdn\.ckeditor\.com\/\d\.\d+\.\d+/g, `https://cdn.ckeditor.com/${ version }` ), 'utf8' );

	// Update 'peerDependency' in 'package.json'. See `json` package docs - http://trentm.com/json.
	shell.exec( `./node_modules/json/lib/json.js -I -f package.json -e 'this.peerDependencies.ckeditor="^${ version }"'` );

	// Update 'devDependency' in 'package.json' file and entire 'package-lock.json' file.
	shell.exec( `npm install ckeditor@${ version } --save-dev` );
}
