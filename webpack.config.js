/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

module.exports = [ {
	context: __dirname,

	devtool: 'source-map',
	performance: {
		hints: false
	},
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},

		ckeditor: {
			root: 'CKEDITOR',
			commonjs2: 'ckeditor',
			commonjs: 'ckeditor',
			amd: 'ckeditor'
		}
	},

	entry: path.join( __dirname, 'src', 'ckeditor.jsx' ),

	output: {
		library: 'CKEditor',

		path: path.join( __dirname, 'dist' ),
		filename: 'ckeditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default',

	},

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
			banner: `/**
			 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
			 * For licensing, see LICENSE.md.
			 */`,
			raw: true
		} ),
	],

	module: {
		rules: [ {
			test: /\.jsx$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				compact: false,
				presets: [ '@babel/preset-env', '@babel/preset-react' ]
			}
		} ]
	},
}, {
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
		}
	},

	entry: path.join( __dirname, 'sample', 'Samples.jsx' ),

	output: {
		path: path.join( __dirname, 'sample/dist' ),
		filename: '[name].js',
		libraryTarget: 'umd',
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
			banner: `/**
			 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
			 * For licensing, see LICENSE.md.
			 */`,
			raw: true
		} ),
	],

	module: {
		rules: [ {
			test: /\.jsx$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				compact: false,
				presets: [ '@babel/preset-env', '@babel/preset-react' ]
			}
		} ]
	},
} ];
