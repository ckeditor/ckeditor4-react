/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

function createConfiguration( options ) {
	return {
		context: __dirname,

		devtool: 'source-map',
		performance: {
			hints: false
		},
		externals: Object.assign( {},
			options.externals || {},
			{
				ckeditor: {
					root: 'CKEDITOR',
					commonjs2: 'ckeditor',
					commonjs: 'ckeditor',
					amd: 'ckeditor'
				}
			}
		),

		entry: options.entry,

		output: options.output,

		optimization: {
			minimizer: [
				new TerserWebpackPlugin( {
					sourceMap: true,
					terserOptions: {
						output: {
							// Preserve CKEditor 5 license comments.
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
		},
	};
}

module.exports = [
	createConfiguration( {
		entry: path.join( __dirname, 'src', 'ckeditor.jsx' ),
		output: {
			library: 'CKEditor',

			path: path.join( __dirname, 'dist' ),
			filename: 'ckeditor.js',
			libraryTarget: 'umd',
			libraryExport: 'default',

		},
		externals: {
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react'
			}
		}
	} ),

	createConfiguration( {
		entry: path.join( __dirname, 'sample', 'Samples.jsx' ),
		output: {
			path: path.join( __dirname, 'sample/dist' ),
			filename: '[name].js',
			libraryTarget: 'umd',
			libraryExport: 'default',

		}
	} )
];
