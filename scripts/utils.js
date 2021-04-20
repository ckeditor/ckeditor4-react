/* eslint-env node */
const { exec, execSync } = require( 'child_process' );
const { satisfies, minor, gt } = require( 'semver' );

/**
 * Executes child process synchronously.
 *
 * @param {string} command command to execute
 * @param {string} cwd dir where to execute command
 * @returns {string|Buffer}
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
 * @returns {string|Buffer}
 */
function execCmd( command, cwd = __dirname ) {
	return exec( command, {
		encoding: 'utf-8',
		cwd
	} );
}

/**
 * Executes npm command.
 *
 * @param {string} command command to execute
 * @param {string} cwd dir where to execute command
 * @returns {string|Buffer}
 */
function execNpmCmdSync( command, cwd = __dirname ) {
	return execCmdSync( `npm ${ command }`, cwd );
}

/**
 * Gets list of available React versions from npm.
 *
 * @returns {string[]}
 */
function getReactVersionsFromNpm() {
	const commandResult = execNpmCmdSync( 'view react versions --json' );
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
function getReactVersionsInRange( range, versions ) {
	return versions.filter( version => {
		// Version 16.8.6 does not support async `act` test helper.
		// https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#async-act-for-testing
		return gt( version, '16.8.6' ) && satisfies( version, range );
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
 * Enhances list of React versions with `all`, `current`, and a fixed version.
 *
 * @returns {string[]} list of versions to be tested
 */
function getVersionsToTest( version ) {
	switch ( version ) {
		case 'all':
			return getAllReactVersions();
		case 'current':
			return [ getCurrentReactVersion() ];
		default:
			return [ version ];
	}
}

function runReactTester( requestedVersion, testCmd, cwd ) {
	console.log( '--- Ultimate CKEditor 4 - React Integration Tester ---' );

	getVersionsToTest( requestedVersion ).forEach( version => {
		console.log(
			`--- Preparing package environment for React v${ version } ---`
		);

		execNpmCmdSync(
			`install react@${ version } react-dom@${ version } --legacy-peer-deps`,
			cwd
		);

		try {
			console.log( `--- Testing React v${ version } ---` );

			process.env.REQUESTED_REACT_VERSION = version;

			execNpmCmdSync( testCmd, cwd );
		} catch ( error ) {
			console.error();
			console.error(
				`--- Errors occured during testing version ${ version } ---`
			);
			console.error();

			throw error;
		}
	} );

	console.log( '--- Done without errors. Have a nice day! ---' );
}

module.exports = {
	execCmd,
	execCmdSync,
	execNpmCmdSync,
	getAllReactVersions,
	getCurrentReactVersion,
	getLatestPatches,
	getPeeredReactVersion,
	getReactVersionsFromNpm,
	isLatestPatch,
	runReactTester
};
