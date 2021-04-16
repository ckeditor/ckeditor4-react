/* eslint-env node */

// Use babel to transform `jest` tests.
module.exports = {
	presets: [
		[ '@babel/preset-env', { targets: { node: 'current' } } ],
		'@babel/preset-typescript',
		'@babel/preset-react'
	]
};
