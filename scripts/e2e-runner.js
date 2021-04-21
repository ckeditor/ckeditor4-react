/* eslint-env node */

const path = require( 'path' );
const shell = require( 'shelljs' );
const { runReactTester, execCmd, execNpmCmdSync } = require( './utils' );

const PACKAGE_PATH = path.resolve( __dirname, '..' );
const TESTS_TMP_PATH = path.resolve( PACKAGE_PATH, '.tmp-e2e-react-tests' );

/**
 *
 * Usage: `node ./scripts/e2e-runner.js <command>`
 *
 * Commands:
 *
 * --react <version>  Specifies react version to test. Possible values: 'all', 'current' or specific version. Defaults to: 'current'.
 *
 */
const argv = require( 'minimist' )( process.argv.slice( 2 ) );
const reactVersion = argv.react || 'current';

runTests().catch( error => {
	console.error( error );
	process.exit( 1 );
} );

async function runTests() {
	console.log( '--- Running E2E Tests ---' );

	// Make sure that main package is linked
	execNpmCmdSync( 'link', PACKAGE_PATH );

	for ( const sampleFile of shell.ls( 'tests/e2e' ) ) {
		const name = sampleFile.split( '.' )[ 0 ];

		console.log();
		console.log(
			`--- Preparing package environment for sample: ${ name } ---`
		);

		// Remove and re-create tmp folder
		shell.rm( '-rf', TESTS_TMP_PATH );
		shell.mkdir( TESTS_TMP_PATH );

		// Copy files
		shell
			.ls( path.resolve( PACKAGE_PATH, 'samples', name ) )
			.filter( file => ![ 'node_modules', 'public' ].includes( file ) )
			.forEach( file => {
				shell.cp(
					'-R',
					path.resolve( PACKAGE_PATH, 'samples', name, file ),
					path.resolve( TESTS_TMP_PATH, file )
				);
			} );

		// Install dependencies
		execNpmCmdSync(
			'install --legacy-peer-deps --loglevel error',
			TESTS_TMP_PATH
		);

		console.log();
		console.log( `--- Running tests for sample: ${ name } ---` );

		// Run react tester
		await runReactTester(
			reactVersion,
			executeReactTestSuite( name ),
			TESTS_TMP_PATH
		);
	}
}

function executeReactTestSuite( sample ) {
	return function executeReactTestSuiteForSample() {
		execNpmCmdSync( 'link ckeditor4-react', TESTS_TMP_PATH );
		execNpmCmdSync( 'run build', TESTS_TMP_PATH );

		const server = execCmd(
			'node ./node_modules/.bin/http-server',
			TESTS_TMP_PATH
		);

		const testSuite = execCmd(
			`node scripts/nightwatch-runner.js -t tests/e2e/${ sample }.js`,
			PACKAGE_PATH
		);

		server.stdout.on( 'data', console.log );
		server.stderr.on( 'data', console.error );

		process.on( 'error', () => {
			cleanupHttpServer( server );
		} );

		return new Promise( ( resolve, reject ) => {
			testSuite.stdout.on( 'data', console.log );
			testSuite.stderr.on( 'data', console.error );
			testSuite.on( 'exit', code => {
				cleanupHttpServer( server );

				if ( code > 0 ) {
					reject( 'nightwatch-runner script failed' );
				} else {
					resolve();
				}
			} );
			testSuite.on( 'error', reject );
		} );
	};
}

function cleanupHttpServer( childProcess ) {
	try {
		if ( childProcess ) {
			process.kill( childProcess.pid + 1 );
			process.kill( childProcess.pid );
		}
	} catch ( err ) {
		// In case process does not exist anymore.
	}
}
