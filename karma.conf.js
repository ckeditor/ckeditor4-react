/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global process, require, module */

const webpack = require( 'webpack' );
const { join: joinPath } = require( 'path' );

const basePath = process.cwd();
const coverageDir = joinPath( basePath, 'coverage' );

module.exports = function( config ) {
	// (#191)
	// List of browsers can be overriden from command line. Defaults to Chrome.
	const browsers = config.browsers.length === 0 ? [ 'Chrome' ] : config.browsers;
	// (#191)
	// Allows to apply IE11-specific options.
	const testIE11 = browsers.some( browser => browser.includes( 'IE11' ) );

	config.set( {
		basePath,

		browsers,

		frameworks: [ 'mocha', 'chai', 'sinon' ],

		files: [
			// (#185)
			// Added as dependency here, so that script is preloaded before tests start.
			'https://cdn.ckeditor.com/4.16.1/standard-all/ckeditor.js',
			'tests/utils/**/*.js',
			'tests/browser/**/*.jsx'
		],

		preprocessors: {
			'tests/utils/**/*.js': [ 'webpack' ],
			'tests/**/*.jsx': [ 'webpack', 'sourcemap' ]
		},

		webpack: {
			mode: 'development',
			devtool: 'inline-source-map',

			module: {
				rules: [
					{
						// (#191)
						// In case of IE11 all dependencies must be transpiled (which is much slower).
						// For other environments it's enough to transpile `.jsx` only.
						test: testIE11 ? /\.jsx?$/ : /\.jsx$/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [
									'@babel/preset-env',
									'@babel/preset-react'
								]
							}
						}
					},

					{
						test: /\.jsx?$/,
						loader: 'istanbul-instrumenter-loader',
						include: /src/,
						exclude: [ /node_modules/ ],
						query: {
							esModules: true
						}
					}
				]
			},

			plugins: [
				new webpack.DefinePlugin( {
					'process.env.REQUESTED_REACT_VERSION': JSON.stringify(
						process.env.REQUESTED_REACT_VERSION || ''
					)
				} )
			]
		},

		webpackMiddleware: {
			noInfo: true,
			stats: 'minimal'
		},

		reporters: [ 'mocha', 'coverage' ],

		coverageReporter: {
			reporters: [
				// Prints a table after tests result.
				{
					type: 'text'
				},
				// Generates HTML tables with the results.
				{
					dir: coverageDir,
					type: 'html'
				},
				// Generates "lcov.info" file. It's used by external code coverage services.
				{
					type: 'lcovonly',
					dir: coverageDir
				}
			]
		},

		port: 9876,

		colors: true,

		logLevel: 'INFO',

		customLaunchers: {
			BrowserStack_Edge: {
				base: 'BrowserStack',
				os: 'Windows',
				os_version: '10',
				browser: 'edge'
			},
			BrowserStack_Safari: {
				base: 'BrowserStack',
				os: 'OS X',
				os_version: 'Big Sur',
				browser: 'safari'
			},
			BrowserStack_IE11: {
				base: 'BrowserStack',
				os: 'Windows',
				os_version: '10',
				browser: 'ie'
			}
		},

		browserStack: {
			username: process.env.BROWSER_STACK_USERNAME,
			accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
			build: process.env.BUILD_SLUG,
			project: 'ckeditor4',
			video: false,
			// (#191)
			// This is an undocumented option of karma-browserstack-launcher. It helps to mitigate rate limiting on BrowserStack end.
			// https://github.com/mui-org/material-ui/pull/25049
			pollingTimeout: 10000
		},

		singleRun: true,

		concurrency: Infinity,

		// (#191)
		// These settings help to mitigate BrowserStack issues.
		browserDisconnectTimeout: 3 * 60 * 1000,
		browserDisconnectTolerance: 1,
		browserNoActivityTimeout: 3 * 60 * 1000,

		mochaReporter: {
			showDiff: true
		},

		client: {
			mocha: {
				// (#185)
				// Timeout should be accomodated to the needs of each environment (local, BrowserStack).
				// Every browser must have a chance to bootstrap.
				timeout: 7500
			}
		}
	} );
};
