/* eslint-env node */

const { execSync } = require( 'child_process' );
const { mkdirSync, rmdirSync, copyFileSync } = require( 'fs' );
const { resolve: resolvePath } = require( 'path' );
const satisfiesSemver = require( 'semver/functions/satisfies' );
const semverMinor = require('semver/functions/minor')

const PACKAGE_PATH = resolvePath( __dirname, '..' );
const TESTS_PATH = resolvePath( PACKAGE_PATH, 'react-tests' );

const packageInfo = require( '../package.json' );
const availableVersions = getVersions();
const semverRange = getReactVersion( packageInfo );
const versionsInRange = getVersionsInRange( semverRange, availableVersions );
const versionsToTest = getLatestPatches( versionsInRange );

try {
	console.log( '--- Ultimate CKEditor 4 - React Integration Tester ---' );

	rmdirSyncRecursive( TESTS_PATH );
	mkdirSync( TESTS_PATH );

	versionsToTest.forEach( testVersion );

	rmdirSyncRecursive( TESTS_PATH );
	console.log( 'Done without errors. Have a nice day!' );
} catch ( error ) {
	console.error( 'Error occured :(' );
	console.error( error );
	process.exit( 1 );
}

function getVersions() {
	const commandResult = execNpmCommand( 'view react versions --json' );
	const versions = JSON.parse( commandResult );

	return versions;
}

function getReactVersion( packageInfo ) {
	const peerDependencies = packageInfo.peerDependencies;
	const react = peerDependencies.react;

	return react;
}

function getVersionsInRange( range, versions ) {
	return versions.filter( version => {
		// 16.6.2 is broken - https://github.com/facebook/react/issues/14208.
		return version !== '16.6.2' && satisfiesSemver( version, range );
	} );
}

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

function testVersion( version ) {
	console.log( `Preparing package environment for React v${ version }` );

	const testPath = resolvePath( TESTS_PATH, version );
	const scriptsPath = resolvePath( testPath, 'scripts' );
	const filesToCopy = [
		'package.json',
		'webpack.config.js',
		'karma.conf.js',
		'scripts/test-transpiler.js'
	];

	mkdirSync( testPath );
	mkdirSync( scriptsPath );
	copyFiles( filesToCopy, PACKAGE_PATH, testPath );
	execNpmCommand( 'install', testPath );
	execNpmCommand( `install react@${ version } react-dom@${ version }`, testPath );

	console.log( `Testing React v${ version }` );

	console.log( execNpmCommand( 'test' ) );

	rmdirSyncRecursive( testPath );
}

function execNpmCommand( command, cwd = __dirname ) {
	const cmd = `npm ${ command }`;

	return execSync( cmd, {
		encoding: 'utf-8',
		cwd
	} );
}

function rmdirSyncRecursive( path ) {
	return rmdirSync( path, {
		recursive: true
	} );
}

function copyFiles( files, src, dest ) {
	files.forEach( file => {
		const srcPath = resolvePath( src, file );
		const destPath = resolvePath( dest, file );

		copyFileSync( srcPath, destPath );
	} );
}
