/* eslint-env node */

const Nightwatch = require( 'nightwatch' );
const browserstack = require( 'browserstack-local' );
let bsLocal;

try {
	process.mainModule.filename = './node_modules/nightwatch/bin/nightwatch';
	// Code to start browserstack local before start of test
	console.log( 'Connecting local' );
	Nightwatch.bsLocal = bsLocal = new browserstack.Local();
	bsLocal.start(
		{ key: process.env.BROWSERSTACK_ACCESS_KEY },
		function( error ) {
			if ( error ) {
				throw error;
			}

			console.log( 'Connected. Now testing...' );
			Nightwatch.cli( function( argv ) {
				Nightwatch.CliRunner( argv )
					.setup( null, function() {
						// Code to stop browserstack local after end of parallel test
						bsLocal.stop( function() {} );
					} )
					.runTests( function() {
						// Code to stop browserstack local after end of single test
						bsLocal.stop( function() {} );
					} );
			} );
		}
	);
} catch ( ex ) {
	console.log( 'There was an error while starting the test runner:\n\n' );
	process.stderr.write( ex.stack + '\n' );
	process.exit( 2 );
}
