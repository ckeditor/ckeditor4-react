/* eslint-env node */

const path = require( 'path' );
const shell = require( 'shelljs' );
const { runReactTester, execNpmCmdSync } = require( './utils' );

const PACKAGE_PATH = path.resolve( __dirname, '..' );
const TESTS_TMP_PATH = path.resolve( PACKAGE_PATH, 'tmp-react-tests' );

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
	console.log( '--- Running Unit Tests ---' );

	const filesToCopy = [
		'package.json',
		'package-lock.json',
		'karma.conf.js',
		'tsconfig.json',
		'src',
		'tests'
	];

	shell.rm( '-rf', TESTS_TMP_PATH );

	shell.mkdir( TESTS_TMP_PATH );

	filesToCopy.forEach( file => {
		shell.cp(
			'-R',
			path.resolve( PACKAGE_PATH, file ),
			path.resolve( TESTS_TMP_PATH, file )
		);
	} );

	execNpmCmdSync( 'install --legacy-peer-deps', TESTS_TMP_PATH );

	runReactTester( reactVersion, 'run test:browser', TESTS_TMP_PATH );
} catch ( error ) {
	console.log( error );
	process.exit( 1 );
}
