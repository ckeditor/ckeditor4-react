/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
import { CKEditorDefaultEvent, CKEditorRegisterEventArgs } from './types';
/**
 * Registers editor event. Allows to toggle debugging mode.
 *
 * @param editor instance of editor
 * @param debug toggles debugger
 */
declare function registerEditorEventHandler<EditorEvent>({ debug, editor, evtName, handler, listenerData, priority }: CKEditorRegisterEventArgs<EditorEvent | CKEditorDefaultEvent>): () => void;
export default registerEditorEventHandler;
