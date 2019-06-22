/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

module.exports = [ createConfig(), createConfig( 'node', '-server' ) ];

function createConfig( target = 'web', name = '' ) {
	return {
		target: target,
		context: __dirname,

		devtool: 'source-map',
		performance: {
			hints: false
		},
		externals: {
			ckeditor: {
				root: 'CKEDITOR',
				commonjs2: 'ckeditor',
				commonjs: 'ckeditor',
				amd: 'ckeditor'
			},

			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react'
			}
		},

		entry: path.join( __dirname, 'src', 'ckeditor.jsx' ),

		output: {
			library: 'CKEditor',

			path: path.join( __dirname, 'dist' ),
			filename: `ckeditor${ name }.js`,
			libraryTarget: target === 'web' ? 'umd' : 'commonjs2',
			libraryExport: 'default',

		},

		optimization: {
			minimizer: [
				new TerserWebpackPlugin( {
					sourceMap: true,
					terserOptions: {
						output: {
							// Preserve license comments.
							comments: /^!/
						}
					}
				} )
			]
		},

		plugins: [
			new webpack.BannerPlugin( {
				banner: `/*!*
	* @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
	* For licensing, see LICENSE.md.
	*/`,
				raw: true
			} ),
		],

		module: {
			rules: [ {
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					compact: false,
					presets: [
						[
							'@babel/preset-env',
							{
								useBuiltIns: 'usage',
								targets: {
									browsers: [
										'last 2 versions',
										'ie 11'
									]
								}
							}
						],
						'@babel/preset-react'
					]
				}
			} ]
		}
	};
}
