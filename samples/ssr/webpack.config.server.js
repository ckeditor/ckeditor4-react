/* eslint-env node */

const path = require( 'path' );
const config = require( './webpack.config' );

module.exports = {
	...config,
	entry: './src/server.js',
	output: {
		path: path.resolve( __dirname, './dist' ),
		filename: 'server.js'
	},
	target: [ 'node' ]
};
