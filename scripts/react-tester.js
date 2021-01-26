/* eslint-env node */

const { execSync } = require( 'child_process' );
const { mkdirSync, rmdirSync, copyFileSync } = require( 'fs' );
const { resolve: resolvePath } = require( 'path' );
const satisfiesSemver = require( 'semver/functions/satisfies' );

const PACKAGE_PATH = resolvePath( __dirname, '..' );
const TESTS_PATH = resolvePath( PACKAGE_PATH, 'react-tests' );

const packageInfo = require( '../package.json' );
const availableVersions = getVersions();
const semverRange = getReactVersion( packageInfo );
const versionsToTest = getVersionsInRange( semverRange, availableVersions );

mkdirSync( TESTS_PATH );
versionsToTest.forEach( testVersion );
rmdirSyncRecursive( TESTS_PATH );

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
		return satisfiesSemver( version, range );
	} );
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
	execNpmCommand( `install react@${ version }`, testPath );

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
