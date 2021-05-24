/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * Transforms `camelCaseValue` into `kebab-case-value`.
 *
 * @param str string to transform
 * @returns transformed string
 */
export function camelToKebab( str: string ) {
	return str
		.split( /(?=[A-Z])/ )
		.join( '-' )
		.toLowerCase();
}

/**
 * Generates reasonably unique value of five lower-case letters.
 *
 * @returns unique value
 */
export function uniqueName() {
	return Math.random()
		.toString( 36 )
		.replace( /[^a-z]+/g, '' )
		.substr( 0, 5 );
}
