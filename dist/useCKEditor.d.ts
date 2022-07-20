/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
import { CKEditorDefaultEvent, CKEditorHookProps, CKEditorHookResult } from './types';
/**
 * `useCKEditor` is a low-level hook that holds core logic for editor lifecycle.
 * It is responsible for initializing and destroying editor instance.
 */
declare function useCKEditor<EditorEvent extends string>({ config, debug, dispatchEvent, subscribeTo, editorUrl, element, initContent, type }: CKEditorHookProps<EditorEvent | CKEditorDefaultEvent>): CKEditorHookResult;
export default useCKEditor;
