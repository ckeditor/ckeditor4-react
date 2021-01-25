/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

module.exports = {
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
		filename: 'ckeditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default',
		globalObject: '(typeof self !== \'undefined\' ? self : this)'
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
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
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
							corejs: 3,
							targets: {
								browsers: [
									'last 2 versions',
									'ie 11'
								],
								node: 10
							}
						}
					],
					'@babel/preset-react'
				]
			}
		} ]
	}
};
