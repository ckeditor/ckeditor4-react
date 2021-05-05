/* eslint-env node */

const { execSync } = require( 'child_process' );
const { mkdirSync, rmdirSync, copyFileSync } = require( 'fs' );
const { resolve: resolvePath } = require( 'path' );
const satisfiesSemver = require( 'semver/functions/satisfies' );
const semverMinor = require( 'semver/functions/minor' );

/**
 *
 * Usage: `node ./scripts/react-tester.js <command>`
 *
 * Commands:
 *
 * --browser <name>   Specifies environment to test.
 *                    Possible values: 'Chrome', 'Firefox', 'BrowserStack_Safari', 'BrowserStack_Edge', 'BrowserStack_IE11', 'SSR'.
 *                    Defaults to: 'Chrome'.
 * --react <version>  Specifies react version to test. Possible values: 'all', 'current' or specific version. Defaults to: 'current'.
 *
 */
const argv = require( 'minimist' )( process.argv.slice( 2 ) );
const testedBrowser = argv.browser || 'Chrome';
const reactVersion = argv.react || 'current';

const PACKAGE_PATH = resolvePath( __dirname, '..' );
const TESTS_PATH = resolvePath( PACKAGE_PATH, 'react-tests' );

const versionsPassed = [];
const versionsFailed = [];
const errorLogs = {};

try {
	console.log( '--- Ultimate CKEditor 4 - React Integration Tester ---' );
	console.log( `Running tests for: ${ testedBrowser }` );

	cleanupTestDir();

	getVersionsToTest().forEach( version => {
		prepareTestDir( version );
		testVersion( version );
	} );

	if ( Object.keys( errorLogs ).length === 0 ) {
		console.log( '--- Done without errors. Have a nice day! ---' );
	} else {
		console.log( '---------------------------------------------------------------------------' );
		console.log( '------------------------- Logs of failed versions -------------------------' );
		console.log( '---------------------------------------------------------------------------' );
		console.log();

		for ( const key in errorLogs ) {
			console.log( '--- ' + key + ' ---', errorLogs[ key ] );
		}

		console.log( '--- Some versions failed. See the logs above. ---' );
		console.log( 'Successful tests:' );
		console.log( versionsPassed );
		console.log();
		console.log( 'Failed tests:' );
		console.log( versionsFailed );

		process.exit( 1 );
	}
} catch ( error ) {
	console.log( error );
	console.log( '--- Unexpected error occured during testing - see the log above. ---' );
	process.exit( 1 );
}

/**
 * Gets list of available React versions from npm.
 *
 * @returns {string[]}
 */
function getVersions() {
	const commandResult = execNpmCommand( 'view react versions --json' );
	const versions = JSON.parse( commandResult );

	return versions;
}

/**
 * Gets peered version range from `package.json`.
 *
 * @param {Object} packageInfo contents of `package.json`
 * @returns {string} peered version / version range
 */
function getReactVersion( packageInfo ) {
	const peerDependencies = packageInfo.peerDependencies;
	const react = peerDependencies.react;

	return react;
}

/**
 * Filters versions based on requested range.
 *
 * @param {string} range version range
 * @param {string[]} versions list of versions
 * @returns {string[]} versions in requested range
 */
function getVersionsInRange( range, versions ) {
	return versions.filter( version => {
		// 16.6.2 is broken - https://github.com/facebook/react/issues/14208.
		return version !== '16.6.2' && satisfiesSemver( version, range );
	} );
}

/**
 * Gets latest patches for each minor version.
 *
 * @param {string[]} versions list of versions
 * @returns {string[]} list of latest patches
 */
function getLatestPatches( versions ) {
	const latestPatches = versions.reduce( ( acc, version, index, array ) => {
		if ( isLatestPatch( index, array ) ) {
			acc.push( version );
		}

		return acc;
	}, [] );

	console.log( 'Versions that will be tested (' + latestPatches.length + '):', latestPatches );

	return latestPatches;
}

/**
 * Checks if version is latest patch of given list of versions.
 *
 * @param {number} index current index
 * @param {string[]} array list of versions
 * @returns {boolean} if version is latest patch
 */
function isLatestPatch( index, array ) {
	// Skip checking the last array element.
	if ( array.length == index + 1 ) {
		return true;
	}

	if ( semverMinor( array[ index ] ) != semverMinor( array[ index + 1 ] ) ) {
		return true;
	} else {
		return false;
	}
}

/**
 * Prepares test dir by copying required files and installing dependencies.
 *
 * @param {string} version React version to test
 */
function prepareTestDir( version ) {
	console.log( `--- Preparing package environment for React v${ version } ---` );

	execNpmCommand(
		`install react@${ version } react-dom@${ version } --legacy-peer-deps`,
		TESTS_PATH
	);
}

/**
 * Removes test directory and its content, then re-creates empty test dir and copies init files.
 */
function cleanupTestDir() {
	const filesToCopy = [
		'package.json',
		'webpack.config.js',
		'karma.conf.js',
		'scripts/test-transpiler.js',
		'src/ckeditor.jsx',
		'tests/browser/ckeditor.jsx',
		'tests/server/ckeditor.jsx',
		'tests/utils/polyfill.js'
	];

	rmdirSyncRecursive( TESTS_PATH );
	mkdirSync( TESTS_PATH );
	mkdirSync( `${ TESTS_PATH }/src` );
	mkdirSync( `${ TESTS_PATH }/tests` );
	mkdirSync( `${ TESTS_PATH }/tests/browser` );
	mkdirSync( `${ TESTS_PATH }/tests/server` );
	mkdirSync( `${ TESTS_PATH }/tests/utils` );
	mkdirSync( `${ TESTS_PATH }/scripts` );

	copyFiles( filesToCopy, PACKAGE_PATH, TESTS_PATH );

	execNpmCommand( 'install --legacy-peer-deps', TESTS_PATH );
}

/**
 * Runs tests for requested React version and environment (see `--browser` arg).
 *
 * @param {string} version React version to test
 */
function testVersion( version ) {
	try {
		console.log( `--- Testing React v${ version } ---` );

		process.env.REQUESTED_REACT_VERSION = version;

		if ( testedBrowser === 'SSR' ) {
			console.log( execNpmCommand( 'run test:ssr', TESTS_PATH ) );
		} else {
			console.log(
				execNpmCommand(
					`run test:browser -- --browsers ${ testedBrowser }`,
					TESTS_PATH
				)
			);
		}

		versionsPassed.push( version );
	} catch ( error ) {
		console.error();
		console.error( '--- Errors occured during testing version ' + version + '. See the logs at the bottom. ---' );
		console.error();

		versionsFailed.push( version );
		errorLogs[ version ] = error.stdout;

		throw error;
	}
}

/**
 * Executes npm command.
 *
 * @param {string} command command to execute
 * @param {string} cwd dir where to execute command
 * @returns {string|Buffer}
 */
function execNpmCommand( command, cwd = __dirname ) {
	const cmd = `npm ${ command }`;

	return execSync( cmd, {
		encoding: 'utf-8',
		cwd
	} );
}

/**
 * Removes directory and its children.
 *
 * @param {string} path dir path
 * @returns {undefined}
 */
function rmdirSyncRecursive( path ) {
	return rmdirSync( path, {
		recursive: true
	} );
}

/**
 * Copies files from source to dest.
 *
 * @param {string} files list of files
 * @param {string} src source path
 * @param {string} dest destination path
 */
function copyFiles( files, src, dest ) {
	files.forEach( file => {
		const srcPath = resolvePath( src, file );
		const destPath = resolvePath( dest, file );

		copyFileSync( srcPath, destPath );
	} );
}

/**
 * Gets list of React versions to test based on `--react` argument.
 *
 * @returns {string[]} list of versions to be tested
 */
function getVersionsToTest() {
	switch ( reactVersion ) {
		case 'all':
			return getAllReactVersions();
		case 'current':
			return [ getCurrentReactVersion() ];
		default:
			return [ reactVersion ];
	}
}

/**
 * Gets currently installed version of React.
 *
 * @returns {string} React version
 */
function getCurrentReactVersion() {
	return require( 'react/package.json' ).version;
}

/**
 * Gets list of all React versions that can be tested.
 *
 * @returns {string[]} list of versions to test
 */
function getAllReactVersions() {
	const packageInfo = require( '../package.json' );
	const availableVersions = getVersions();
	const semverRange = getReactVersion( packageInfo );
	const versionsInRange = getVersionsInRange( semverRange, availableVersions );
	return getLatestPatches( versionsInRange );
}
