/* eslint-env node */

const { exec, execSync } = require( 'child_process' );
const { red, blue, green, yellow, magenta } = require( 'chalk' );
const { satisfies, minor } = require( 'semver' );

/**
 * Logging utils.
 */
const log = {
	error: msg => console.log( red( msg ) ),
	info: msg => console.log( blue( msg ) ),
	success: msg => console.log( green( msg ) ),
	warn: msg => console.log( yellow( msg ) ),
	paragraph: msg => {
		console.log();
		console.log( blue.underline( msg ) );
		console.log();
	},
	header: msg => {
		console.log( blue.bold( msg ) );
		console.log(
			magenta(
				Array.from( { length: msg.length } )
					.map( () => '=' )
					.join( '' )
			)
		);
		console.log();
	}
};

/**
 * Waits for x ms. Promisified version of `setTimeout`.
 *
 * @param {number} time time to wait in ms
 * @returns {Promise}
 */
function waitFor( time ) {
	return new Promise( resolve => {
		setTimeout( resolve, time );
	} );
}

/**
 * Executes child process synchronously.
 *
 * @param {string} command command to execute
 * @param {string} cwd dir where to execute command
 * @returns {string|Buffer} command output
 */
function execCmdSync( command, cwd = __dirname ) {
	return execSync( command, {
		encoding: 'utf-8',
		cwd
	} );
}

/**
 * Executes child process asynchronously.
 *
 * @param {string} command command to execute
 * @param {string} cwd dir where to execute command
 * @returns {string|Buffer} command output
 */
function execCmd( command, cwd = __dirname ) {
	return exec( command, {
		encoding: 'utf-8',
		cwd
	} );
}

/**
 * Gets list of available React versions from npm.
 *
 * @returns {string[]} available React versions
 */
function getReactVersionsFromNpm() {
	const commandResult = execCmdSync( 'npm view react versions --json' );
	const versions = JSON.parse( commandResult );
	return versions;
}

/**
 * Gets peered version range from `package.json`.
 *
 * @param {Object} packageInfo contents of `package.json`
 * @returns {string} peered version / version range
 */
function getPeeredReactVersion( packageInfo ) {
	return packageInfo.peerDependencies.react;
}

/**
 * Filters versions based on requested range.
 *
 * @param {string} range version range
 * @param {string[]} versions list of versions
 * @returns {string[]} versions in requested range
 */
function getReactVersionsInRange( range, versions ) {
	return versions.filter( version => {
		return satisfies( version, range );
	} );
}

/**
 * Gets latest patches for each minor version.
 *
 * @param {string[]} versions list of versions
 * @returns {string[]} list of latest patches
 */
function getLatestPatches( versions ) {
	return versions.reduce( ( acc, version, index, array ) => {
		if ( isLatestPatch( index, array ) ) {
			acc.push( version );
		}

		return acc;
	}, [] );
}

/**
 * Checks if version is latest patch in a given list of versions.
 *
 * @param {number} index current index
 * @param {string[]} array list of versions
 * @returns {boolean} if version is latest patch
 */
function isLatestPatch( index, array ) {
	if ( array.length == index + 1 ) {
		return true;
	}

	if ( minor( array[ index ] ) != minor( array[ index + 1 ] ) ) {
		return true;
	} else {
		return false;
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
	const availableVersions = getReactVersionsFromNpm();
	const semverRange = getPeeredReactVersion( packageInfo );
	const versionsInRange = getReactVersionsInRange(
		semverRange,
		availableVersions
	);
	return getLatestPatches( versionsInRange );
}

/**
 * Enhances list of React versions with `all`, `current`, `last-two`, and a fixed version.
 *
 * @returns {string[]} list of versions to be tested
 */
function getVersionsToTest( version ) {
	switch ( version ) {
		case 'all':
			return getAllReactVersions();
		case 'current':
			return [ getCurrentReactVersion() ];
		case 'last-two':
			return getAllReactVersions().slice( -2 );
		default:
			return [ version ];
	}
}

/**
 * Gets list of React versions to test, then sequentially installs requested versions in a given path.
 * Custom async callback will be invoked after each installation.
 *
 * @param {object} config runner config
 * @param {function} cb async callback to execute after installation of new React version
 */
async function runReactTester( { version, cwd, skip = [] }, cb ) {
	const versionsToTest = getVersionsToTest( version ).filter(
		v => skip.indexOf( v ) === -1
	);

	log.paragraph( 'Running React tester' );
	log.info( 'Versions that will be tested (' + versionsToTest.length + '):' );
	log.info( JSON.stringify( versionsToTest ) );

	for ( const version of versionsToTest ) {
		log.paragraph( `Testing React v${ version }` );
		log.info( 'Preparing package environment...' );
		execCmdSync(
			`npm install react@${ version } react-dom@${ version } --legacy-peer-deps --loglevel error`,
			cwd
		);

		process.env.REQUESTED_REACT_VERSION = version;

		await cb( version );
	}
}

module.exports = {
	execCmd,
	execCmdSync,
	runReactTester,
	waitFor,
	log
};
