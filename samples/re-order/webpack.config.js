/* eslint-env node */

const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ErrorOverlayPlugin = require( 'error-overlay-webpack-plugin' );

module.exports = {
	entry: './src/index.jsx',
	mode: 'development',
	devtool: 'source-map',
	output: {
		path: path.resolve( __dirname, './public' ),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: [ '.js', '.jsx' ],
		alias: {
			react$: path.resolve( __dirname, './node_modules/react' ),
			'react-dom$': path.resolve( __dirname, './node_modules/react-dom' )
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-react', '@babel/preset-env' ]
					}
				}
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
