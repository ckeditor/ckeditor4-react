/* eslint-env node */

const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ErrorOverlayPlugin = require( 'error-overlay-webpack-plugin' );

module.exports = {
	entry: './src/index.tsx',
	mode: 'development',
	devtool: 'source-map',
	output: {
		path: path.resolve( __dirname, './public' ),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: [ '.js', '.ts', '.tsx' ],
		alias: {
			react$: path.resolve( __dirname, './node_modules/react' ),
			'react-dom$': path.resolve( __dirname, './node_modules/react-dom' )
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new ErrorOverlayPlugin(),
		new HtmlWebpackPlugin( {
			title: 'Example',
			template: 'src/index.html'
		} )
	]
};
