/* eslint-env node */

import commonJs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import pkg from './package.json';

const input = 'src/index.ts';
const external = Object.keys( pkg.peerDependencies || {} );
const banner = `/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */`;

export default [
	// Creates `umd` build that can be directly consumed via <script /> tag (development mode).
	// Setting `NODE_ENV` value to `development` enables dev utils such as prop-types.
	{
		input,
		external,
		output: {
			banner,
			format: 'umd',
			file: 'dist/index.umd.development.js',
			name: 'CKEditor4React',
			globals: {
				react: 'React'
			}
		},
		plugins: [
			typescript(),
			nodeResolve(),
			commonJs(),
			replace( {
				preventAssignment: true,
				values: {
					'process.env.NODE_ENV': '"development"'
				}
			} ),
			cleanupPlugin()
		]
	},
	// Creates `umd` build that can be directly consumed via <script /> tag (production mode).
	// Setting `NODE_ENV` value to `production` disables dev utils.
	{
		input,
		external,
		output: {
			banner,
			format: 'umd',
			file: 'dist/index.umd.production.min.js',
			name: 'CKEditor4React',
			globals: {
				react: 'React'
			}
		},
		plugins: [
			typescript(),
			nodeResolve(),
			commonJs(),
			replace( {
				preventAssignment: true,
				values: {
					'process.env.NODE_ENV': '"production"'
				}
			} ),
			cleanupPlugin(),
			terser()
		]
	},
	// Creates `cjs` build that can be further optimized downstream.
	{
		input,
		external: external.concat( [
			'ckeditor4-integrations-common',
			'prop-types'
		] ),
		output: {
			banner,
			format: 'cjs',
			file: 'dist/index.cjs.js'
		},
		plugins: [ typescript(), cleanupPlugin() ]
	},
	// Creates `esm` build that can be further optimized downstream.
	{
		input,
		external: external.concat( [
			'ckeditor4-integrations-common',
			'prop-types'
		] ),
		output: {
			banner,
			format: 'esm',
			file: 'dist/index.esm.js'
		},
		plugins: [ typescript(), cleanupPlugin() ]
	}
];

/**
 * Prepares `cleanup` plugin to remove unnecessary 3rd party licenses, e.g.
 *
 * - `tslib` 0BSD license (3rd parties are not required to include it)
 * - CKSource licenses from dependencies
 *
 * https://github.com/microsoft/tslib/blob/master/LICENSE.txt
 * https://github.com/microsoft/tslib/issues/47
 *
 * @returns {Plugin} configured plugin
 */
function cleanupPlugin() {
	return cleanup( {
		extensions: [ 'ts', 'tsx', 'js' ],
		comments: [
			/Copyright (c) Microsoft Corporation./,
			/@license Copyright (c) 2003-2023, CKSource Holding sp. z o.o./
		]
	} );
}
