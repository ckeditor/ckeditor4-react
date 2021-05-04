/* eslint-env node */

const path = require( 'path' );
const shell = require( 'shelljs' );
const { gt } = require( 'semver' );
const { runReactTester, execCmdSync, log } = require( './utils' );

const PACKAGE_PATH = path.resolve( __dirname, '..' );
const TESTS_TMP_PATH = path.resolve( PACKAGE_PATH, '.tmp-units-react-tests' );

/**
 * Run unit tests.
 */
( async function() {
	/**
	 *
	 * Usage: `node ./scripts/units-runner.js <command>`
	 *
	 * Commands:
	 *
	 * --react <version>  Specifies react version to test. Possible values: 'all', 'current' or specific version. Defaults to: 'current'.
	 *
	 */
	const argv = require( 'minimist' )( process.argv.slice( 2 ) );
	const reactVersion = argv.react || 'current';

	try {
		log.header( 'Running Unit Tests...' );

		shell.rm( '-rf', TESTS_TMP_PATH );
		shell.mkdir( TESTS_TMP_PATH );
		[
			'package.json',
			'package-lock.json',
			'karma.conf.js',
			'tsconfig.json',
			'src',
			'scripts',
			'tests'
		].forEach( file => {
			shell.cp(
				'-R',
				path.resolve( PACKAGE_PATH, file ),
				path.resolve( TESTS_TMP_PATH, file )
			);
		} );

		execCmdSync(
			'npm install --legacy-peer-deps --loglevel error',
			TESTS_TMP_PATH
		);

		await runReactTester(
			{
				version: reactVersion,

				/**
				 * Version 16.8.6 does not support async `act` test helper.
				 * https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#async-act-for-testing
				 */
				skip: [ '16.8.6' ],
				cwd: TESTS_TMP_PATH
			},
			() => {
				return console.log(
					execCmdSync(
						'node node_modules/.bin/karma start --single-run --silent-build-logs=true',
						TESTS_TMP_PATH
					)
				);
			}
		);
	} catch ( error ) {
		log.error( 'Could not complete unit tests!' );
		console.error( error );
		process.exitCode = 1;
	}
}() );
