/* eslint-env node */

const Nightwatch = require( 'nightwatch' );
const { Local } = require( 'browserstack-local' );
const { log } = require( './utils' );

const bsLocal = new Local();
Nightwatch.bsLocal = bsLocal;

// The following environment variables must be set before running `e2e-runner`.
const bsUser = process.env.BROWSER_STACK_USERNAME;
const bsKey = process.env.BROWSER_STACK_ACCESS_KEY;

/**
 * Starts BrowserStack Local, then runs Nightwatch. Closes BS Local afterwards.
 */
( async function() {
	const argv = require( 'minimist' )( process.argv.slice( 2 ) );
	const bsFolderPath = argv[ 'bs-folder-path' ];
	const bsServer = argv[ 'bs-server' ];
	const testSample = argv[ 'test-sample' ];

	try {
		log.paragraph( 'Connecting to BrowserStack...' );
		await startConnection( bsFolderPath );
		await runNightwatchCli( testSample, bsServer );
	} catch ( error ) {
		log.error( 'An error occurred within Nightwatch runner!' );
		console.error( error );
		process.exitCode = 1;
	}
}() );

/**
 * Initializes connection via BrowserStack Local.
 *
 * @param {string} bsFolderPath absolute path to tested static assets
 * @returns {Promise} promise
 */
function startConnection( bsFolderPath ) {
	return new Promise( ( resolve, reject ) => {
		/**
		 * !!! Important !!!
		 *
		 * Set random string as identifier for BrowserStack Local session, especially if there are sessions which are run in parallel.
		 *
		 */
		const identifier = Math.random()
			.toString( 36 )
			.replace( /[^a-z]+/g, '' )
			.substr( 0, 5 );

		process.env.BROWSER_STACK_LOCAL_IDENTIFIER = identifier;

		bsLocal.start(
			{
				key: bsKey,
				folder: bsFolderPath,
				localIdentifier: identifier
			},
			error => {
				if ( error ) {
					reject( error );
				} else {
					resolve();
				}
			}
		);
	} );
}

/**
 * Runs Nightwatch runner. Resolves once testing is done and stops BrowserStack Local.
 *
 * @param {string} sample current test sample
 * @param {string} server server address from which tested app is served
 * @returns {Promise} promise
 */
function runNightwatchCli(
	sample,
	bsServer = `http://${ bsUser }.browserstack.com`
) {
	return new Promise( ( resolve, reject ) => {
		process.env.NIGHTWATCH_LOCAL_SERVER = bsServer;
		process.env.NIGHTWATCH_TEST_SAMPLE = sample;

		Nightwatch.cli( argv => {
			/* eslint-disable-next-line new-cap */
			const runner = Nightwatch.CliRunner( argv );

			runner
				.setup()
				.runTests()
				.then( () => {
					bsLocal.stop( resolve );
				} )
				.catch( err => {
					bsLocal.stop( () => {
						reject( err );
					} );
				} );
		} );
	} );
}
