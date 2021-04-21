/* eslint-env node */

import commonJs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import pkg from './package.json';

const input = 'src/index.ts';
const external = Object.keys( pkg.peerDependencies || {} );
const banner = `/**
* @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
* For licensing, see LICENSE.md.
*/`;

export default [
	// Creates `umd` build that can be directly consumed via <script /> tag.
	{
		input,
		external,
		output: {
			banner,
			format: 'umd',
			file: 'dist/index.umd.min.js',
			name: 'CKEditor4React',
			globals: {
				react: 'React'
			}
		},
		plugins: [ typescript(), commonJs(), cleanupPlugin(), terser() ]
	},
	// Creates `cjs` build that can be further optimized downstream.
	{
		input,
		external: external.concat( 'ckeditor4-integrations-common' ),
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
		external: external.concat( 'ckeditor4-integrations-common' ),
		output: {
			banner,
			format: 'esm',
			file: 'dist/index.esm.js'
		},
		plugins: [ typescript( { target: 'es6' } ), cleanupPlugin() ]
	}
];

/**
 * Prepares `cleanup` plugin to remove unnecessary 3rd party licenses, e.g.
 *
 * - `tslib` BSD0 license (3rd parties are not required to include it)
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
		comments: [ /Copyright (c) Microsoft Corporation./, /@license Copyright (c) 2003-2021, CKSource - Frederico Knabben./ ]
	} );
}
