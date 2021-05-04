/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const babel = require( '@rollup/plugin-babel' ).babel;
const nodeResolve = require( '@rollup/plugin-node-resolve' ).nodeResolve;
const replace = require( '@rollup/plugin-replace' );
const commonJs = require( '@rollup/plugin-commonjs' );
const polyfillNode = require( 'rollup-plugin-polyfill-node' );
const progress = require( 'rollup-plugin-progress' );

module.exports = function( config ) {
	config.set( {
		browsers: [ 'Chrome' ],

		frameworks: [ 'jasmine' ],

		files: [
			// Preloads editor before any tests are run.
			'https://cdn.ckeditor.com/4.16.0/standard-all/ckeditor.js',
			// Uses single point of entry for improved build performance.
			{ pattern: 'tests/unit/index.ts', watched: false }
		],

		preprocessors: {
			'tests/unit/index.ts': [ 'rollup' ]
		},

		reporters: [ 'mocha' ],

		rollupPreprocessor: {
			output: {
				format: 'iife',
				name: 'CKEditor4React'
			},
			plugins: [
				!config.silentBuildLogs && progress(),
				babel( {
					babelHelpers: 'bundled',
					presets: [
						'@babel/preset-env',
						'@babel/preset-typescript',
						'@babel/preset-react'
					],
					extensions: [ '.ts', '.tsx', '.js' ],
					exclude: 'node_modules/**'
				} ),
				nodeResolve( {
					preferBuiltins: false,
					extensions: [ '.ts', '.tsx', '.js' ]
				} ),
				commonJs(),
				polyfillNode(),
				replace( {
					preventAssignment: true,
					values: {
						'process.env.REQUESTED_REACT_VERSION': `"${
							process.env.REQUESTED_REACT_VERSION || ''
						}"`,
						'process.env.NODE_ENV': '"test"'
					}
				} )
			].filter( Boolean ),
			onwarn( warning, rollupWarn ) {
				if (
					// Reduces noise for circular deps.
					// https://github.com/rollup/rollup/issues/2271
					warning.code !== 'CIRCULAR_DEPENDENCY' &&
					// Prevents namespace warning when bundling RTL.
					// https://github.com/testing-library/react-testing-library/issues/790
					warning.code !== 'NAMESPACE_CONFLICT'
				) {
					rollupWarn( warning );
				}
			}
		}
	} );
};
