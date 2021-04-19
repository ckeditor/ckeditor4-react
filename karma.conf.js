/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = function( config ) {
	// (#191)
	// List of browsers can be overriden from command line. Defaults to Chrome.
	const browsers = config.browsers.length === 0 ? [ 'Chrome' ] : config.browsers;
	// (#191)
	// Allows to apply IE11-specific options.
	const testIE11 = browsers.some( browser => browser.includes( 'IE11' ) );

	config.set( {
		browsers,

		frameworks: [ 'jasmine' ],

		files: [
			{ pattern: 'tests/setup/*.js', watch: false },
			{ pattern: 'tests/*.test.*', watch: false }
		],

		preprocessors: {
			'tests/setup/*.js': [ 'rollup' ],
			'tests/*.test.*': [ 'rollup' ]
		},

		reporters: [ 'mocha' ],

		rollupPreprocessor: {
			output: {
				format: 'iife',
				name: 'CKEditor4React'
			},
			plugins: [
				require( '@rollup/plugin-typescript' )(),
				require( '@rollup/plugin-node-resolve' ).nodeResolve( {
					preferBuiltins: false
				} ),
				require( '@rollup/plugin-commonjs' )(),
				require( 'rollup-plugin-polyfill-node' )()
			],
			onwarn( warning, rollupWarn ) {
				if (
					// Reduces noise for circular deps
					// https://github.com/rollup/rollup/issues/2271
					warning.code !== 'CIRCULAR_DEPENDENCY' &&
					// Prevents warning about known issue when bundling RTL
					// https://github.com/testing-library/react-testing-library/issues/790
					warning.code !== 'NAMESPACE_CONFLICT'
				) {
					rollupWarn( warning );
				}
			}
		},

		singleRun: true
	} );
};
