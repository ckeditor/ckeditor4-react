/* global require */

require( '@babel/register' )( {
	compact: false,
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
				targets: {
					node: 10
				}
			}
		],
		'@babel/preset-react'
	]
} );
