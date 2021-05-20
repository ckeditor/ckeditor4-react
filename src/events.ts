/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import type {
	CKEditorAction,
	CKEditorEventHandlerName,
	CKEditorPrefixedEventName
} from './types';

/**
 * Available editor events.
 *
 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html
 */
export const events = [
	'activeEnterModeChange',
	'activeFilterChange',
	'afterCommandExec',
	'afterInsertHtml',
	'afterPaste',
	'afterPasteFromWord',
	'afterSetData',
	'afterUndoImage',
	'ariaEditorHelpLabel',
	'ariaWidget',
	'autogrow',
	'beforeCommandExec',
	'beforeDestroy',
	'beforeGetData',
	'beforeModeUnload',
	'beforeSetMode',
	'beforeUndoImage',
	'blur',
	'change',
	'configLoaded',
	'contentDirChanged',
	'contentDom',
	'contentDomInvalidated',
	'contentDomUnload',
	'contentPreview',
	'customConfigLoaded',
	'dataFiltered',
	'dataReady',
	'destroy',
	'dialogHide',
	'dialogShow',
	'dirChanged',
	'doubleclick',
	'dragend',
	'dragstart',
	'drop',
	'elementsPathUpdate',
	'exportPdf',
	'fileUploadRequest',
	'fileUploadResponse',
	'floatingSpaceLayout',
	'focus',
	'getData',
	'getSnapshot',
	'insertElement',
	'insertHtml',
	'insertText',
	'instanceReady',
	'key',
	'langLoaded',
	'loadSnapshot',
	'loaded',
	'lockSnapshot',
	'maximize',
	'menuShow',
	'mode',
	'notificationHide',
	'notificationShow',
	'notificationUpdate',
	'paste',
	'pasteFromWord',
	'pluginsLoaded',
	'readOnly',
	'removeFormatCleanup',
	'required',
	'resize',
	'save',
	'saveSnapshot',
	'selectionChange',
	'setData',
	'stylesRemove',
	'stylesSet',
	'template',
	'toDataFormat',
	'toHtml',
	'uiSpace',
	'unlockSnapshot',
	'updateSnapshot',
	'widgetDefinition'
] as const;

/**
 * Additional events related to CKEDITOR namespace. These are provided by the React integration, not CKEditor itself.
 *
 * - `beforeLoad`: fired before an editor instance is created
 * - `namespaceLoaded`: fired after CKEDITOR namespace is created; fired only once regardless of number of editor instances
 */
export const namespaceEvents = [ 'beforeLoad', 'namespaceLoaded' ] as const;

/**
 * Combines `editor` and `namespace` events.
 */
export const defaultEvents = [ ...events, ...namespaceEvents ];

/**
 * Events as action types should be prefixed to allow easier consumption by downstream reducers.
 */
export const EVENT_PREFIX = '__CKE__';

/**
 * Transforms event name to a handler name, e.g. `instanceReady` -> `onInstanceReady`.
 *
 * @param evtName event name
 * @returns handler name
 */
export function eventNameToHandlerName( evtName: CKEditorPrefixedEventName ) {
	const cap =
		evtName.substr( EVENT_PREFIX.length, 1 ).toUpperCase() +
		evtName.substr( EVENT_PREFIX.length + 1 );
	return `on${ cap }` as CKEditorEventHandlerName;
}

/**
 * Provides an object with event names as keys and prefixed names as values, e.g. `{ instanceReady: __CKE__instanceReady }`.
 *
 * It allows to easily mix editor event actions and own actions in downstream reducers.
 */
export const CKEditorEventAction = [ ...events, ...namespaceEvents ].reduce(
	( acc, evtName ) => {
		return {
			...acc,
			[ evtName ]: `${ EVENT_PREFIX }${ evtName }`
		};
	},
	{} as CKEditorAction
);
