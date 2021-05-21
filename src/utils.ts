/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import type { CKEditorStatus } from './types';

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

/**
 * Returns supplied `style` if editor instance is ready. Otherwise sets visibility to `hidden`.
 *
 * @param style style object
 * @param status editor status
 * @returns adjusted style object
 */
export function getRootStyle(
	style: React.CSSProperties | null | undefined,
	status?: CKEditorStatus
) {
	if ( status === 'ready' ) {
		return style ?? undefined;
	}
	return { visibility: 'hidden' as const };
}
