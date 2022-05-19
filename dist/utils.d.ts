/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
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
export declare function camelToKebab(str: string): string;
/**
 * Generates reasonably unique value of five lower-case letters.
 *
 * @returns unique value
 */
export declare function uniqueName(): string;
/**
 * Returns style for the root element.
 *
 * @param type editor type
 * @param status editor status
 * @param style custom style
 * @returns style
 */
export declare function getStyle(type: CKEditorType, status?: CKEditorStatus, style?: React.CSSProperties | null): React.CSSProperties | {
    readonly display: "none";
    readonly visibility: "hidden";
};
