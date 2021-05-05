/* eslint-env node */

const path = require( 'path' );
const shell = require( 'shelljs' );
const {
	execCmd,
	execCmdSync,
	log,
	runReactTester,
	waitFor
} = require( './utils' );

const PACKAGE_PATH = path.resolve( __dirname, '..' );
const TESTS_TMP_PATH = path.resolve( PACKAGE_PATH, '.tmp-e2e-react-tests' );

/**
 * Runs E2E tests.
 */
( async function() {
	/**
	 *
	 * Usage: `node ./scripts/e2e-runner.js <command>`
	 *
	 * Commands:
	 *
	 * --react <version>  Specifies react version to test. Possible values: 'all', 'current' or specific version. Defaults to: 'current'.
	 * --sample <sample>  Specifies sample to test. By default tests all samples.
	 *
	 */
	const argv = require( 'minimist' )( process.argv.slice( 2 ) );
	const reactVersion = argv.react || 'current';
	const requestedSample = argv.sample;

	try {
		log.header( 'Running E2E Tests...' );

		log.info( 'Building library package...' );
		execCmdSync( 'npm run build', PACKAGE_PATH );

		log.info( 'Linking library...' );
		execCmdSync( 'npm link', PACKAGE_PATH );

		log.paragraph( 'Starting tests...' );
		await runTests( reactVersion, requestedSample );

		log.success( 'Successfully completed all tests. Have a nice day!' );
	} catch ( error ) {
		log.error( 'Could not complete E2E tests!' );
		console.error( error );
		process.exitCode = 1;
	}
}() );

/**
 * Iterates over all E2E test suites, prepares environment for each of them, runs tests on requested React versions.
 *
 * @param {string} reactVersion React version to test. One of `all`, `current` or fixed version.
 */
async function runTests( reactVersion, requestedSample ) {
	const samples = shell.ls( 'tests/e2e' );
	const filteredSamples = requestedSample ?
		samples.filter( file => file.split( '.' )[ 0 ] === requestedSample ) :
		samples;

	for ( const file of filteredSamples ) {
		const sample = file.split( '.' )[ 0 ];

		log.info( `Preparing package environment for tests/e2e/${ file }...` );
		shell.rm( '-rf', TESTS_TMP_PATH );
		shell.mkdir( TESTS_TMP_PATH );
		shell
			.ls( path.resolve( PACKAGE_PATH, 'samples', sample ) )
			.filter( file => ![ 'node_modules', 'public' ].includes( file ) )
			.forEach( file => {
				shell.cp(
					'-R',
					path.resolve( PACKAGE_PATH, 'samples', sample, file ),
					path.resolve( TESTS_TMP_PATH, file )
				);
			} );

		log.info( 'Installing dependencies...' );
		execCmdSync(
			'npm install --legacy-peer-deps --loglevel error',
			TESTS_TMP_PATH
		);

		await runReactTester(
			{ version: reactVersion, cwd: TESTS_TMP_PATH },
			executeReactTestSuite( sample )
		);
	}
}

/**
 * Prepares async function for React tester.
 *
 * @param {string} sample sample to test
 * @returns {function} async callback
 */
function executeReactTestSuite( sample ) {
	return async function executeReactTestSuiteForSample() {
		log.info( 'Linking parent package...' );
		execCmdSync( 'npm link ckeditor4-react', TESTS_TMP_PATH );

		log.info( 'Building sample...' );
		execCmdSync( 'npm run build', TESTS_TMP_PATH );

		let tries = 3;

		while ( tries-- ) {
			try {
				log.info( `Running Nightwatch tests for sample: ${ sample }...` );
				await runNightwatchTests( sample );
				break;
			} catch ( error ) {
				if ( tries ) {
					log.error(
						`Error occurred, retrying... Tries left: ${ tries }`
					);
					await waitFor( 5000 );
				} else {
					throw error;
				}
			}
		}
	};
}

/**
 * Initiates Nightwatch tests by running nightwatch-runner script.
 *
 * @param {string} sample sample to test
 * @returns {Promise} async callback
 */
async function runNightwatchTests( sample ) {
	const assets = path.resolve( TESTS_TMP_PATH, './public' );

	let server;
	let testSuite;

	if ( sample === 'ssr' ) {
		server = execCmd( 'node dist/server.js', TESTS_TMP_PATH );
		await waitFor( 3000 );
		testSuite = execCmd(
			`node scripts/nightwatch-runner.js -t tests/e2e/${ sample }.js --bs-server http://localhost:3000 --test-sample ${ sample }`,
			PACKAGE_PATH
		);
	} else {
		testSuite = execCmd(
			`node scripts/nightwatch-runner.js -t tests/e2e/${ sample }.js --bs-folder-path ${ assets } --test-sample ${ sample }`,
			PACKAGE_PATH
		);
	}

	return new Promise( ( resolve, reject ) => {
		testSuite.stdout.on( 'data', log.info );
		testSuite.stderr.on( 'data', log.error );

		testSuite.on( 'exit', code => {
			if ( server ) {
				process.kill( server.pid );
				process.kill( server.pid + 1 );
			}

			if ( code > 0 ) {
				reject( 'nightwatch-runner script failed' );
			} else {
				resolve();
			}
		} );
	} );
}
