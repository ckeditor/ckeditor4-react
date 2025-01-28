/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import { CKEditorStatus, CKEditorType } from './types';

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
 * Returns style for the root element.
 *
 * @param type editor type
 * @param status editor status
 * @param style custom style
 * @returns style
 */
export function getStyle(
	type: CKEditorType,
	status?: CKEditorStatus,
	style?: React.CSSProperties | null
) {
	const hidden = { display: 'none', visibility: 'hidden' } as const;

	if ( type === 'classic' ) {
		return hidden;
	}

	return status === 'ready' ? style ?? undefined : hidden;
}
