/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const typescript = require( '@rollup/plugin-typescript' );
const nodeResolve = require( '@rollup/plugin-node-resolve' ).nodeResolve;
const commonJs = require( '@rollup/plugin-commonjs' );
const polyfillNode = require( 'rollup-plugin-polyfill-node' );

module.exports = function( config ) {
	config.set( {
		browsers: [ 'Chrome' ],

		frameworks: [ 'jasmine' ],

		files: [
			{ pattern: 'tests/extendDom.js', watch: false },
			{ pattern: 'tests/**.test.*', watch: false }
		],

		preprocessors: {
			'tests/extendDom.js': [ 'rollup' ],
			'tests/**.test.*': [ 'rollup' ]
		},

		reporters: [ 'mocha' ],

		rollupPreprocessor: {
			output: {
				format: 'iife',
				name: 'CKEditor4React'
			},
			plugins: [
				typescript(),
				nodeResolve( {
					preferBuiltins: false
				} ),
				commonJs(),
				polyfillNode()
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
