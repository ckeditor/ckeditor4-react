/* eslint-env node */

const shell = require( 'shelljs' );
const path = require( 'path' );
const { execCmd, execNpmCmdSync } = require( './utils' );

const PACKAGE_PATH = path.resolve( __dirname, '..' );
const TESTS_PATH = path.resolve( PACKAGE_PATH, '.tmp-react-tests' );

try {
	console.log( '--- Ultimate CKEditor 4 - React Integration Tester - E2E ---' );

	shell.mkdir( TESTS_PATH );

	[ 'package.json', 'package-lock.json', 'src', 'webpack.config.js' ].forEach(
		file => {
			shell.cp(
				'-R',
				path.resolve( 'samples/basic', file ),
				path.resolve( TESTS_PATH, file )
			);
		}
	);

	execNpmCmdSync( 'link' );
	execNpmCmdSync( 'install --legacy-peer-deps', TESTS_PATH );
	execNpmCmdSync( 'link ckeditor4-react', TESTS_PATH );
	execNpmCmdSync( 'run build', TESTS_PATH );
	const server = execCmd( 'node ./node_modules/.bin/http-server', TESTS_PATH );
	const testSuite = execCmd(
		'node scripts/nightwatchRunner.js -t tests/e2e/basic.js',
		PACKAGE_PATH
	);

	testSuite.stdout.on( 'data', console.log );
	testSuite.stderr.on( 'data', console.error );

	testSuite.on( 'exit', () => {
		process.kill( server.pid + 1 );
		process.exit( 0 );
	} );
} catch ( error ) {
	console.log( error );
	console.log(
		'--- Unexpected error occured during testing - see the log above. ---'
	);
	process.exit( 1 );
}
