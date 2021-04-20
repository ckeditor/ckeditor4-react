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
				/* eslint-disable-next-line */
				Nightwatch.CliRunner(argv)
					.setup( null, function() {
						// Code to stop browserstack local after end of parallel test
						/* eslint-disable-next-line */
						bsLocal.stop(function () {});
					} )
					.runTests( function() {
						// Code to stop browserstack local after end of single test
						/* eslint-disable-next-line */
						bsLocal.stop(function () {});
					} );
			} );
		}
	);
} catch ( err ) {
	console.log( 'There was an error while starting the test runner:\n\n' );
	process.stderr.write( err.stack + '\n' );
	process.exit( 1 );
}
