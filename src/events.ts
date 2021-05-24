/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { CKEditorAction } from './types';

/**
 * Two types of events are discerned:
 *
 * - `editor` events are associated with native editor events. In addition, custom events can be specified.
 * - `namespace` events are additional events provided by React integration.
 */

/**
 * Available `editor` events.
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
 * Available `namespace` events.
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
 * Prefixes event name: `instanceReady` -> `__CKE__instanceReady`.
 *
 * @param evtName event name
 * @returns prefixed event name
 */
export function prefixEventName( evtName: string ) {
	return `${ EVENT_PREFIX }${ evtName }`;
}

/**
 * Strips prefix from event name. `__CKE__instanceReady` -> `instanceReady`.
 *
 * @param evtName prefixed event name
 * @returns event name
 */
export function stripPrefix( prefixedEventName: string ) {
	return prefixedEventName.substr( EVENT_PREFIX.length );
}

/**
 * Transforms prefixed event name to a handler name, e.g. `instanceReady` -> `onInstanceReady`.
 *
 * @param evtName event name
 * @returns handler name
 */
export function eventNameToHandlerName( evtName: string ) {
	const cap = evtName.substr( 0, 1 ).toUpperCase() + evtName.substr( 1 );
	return `on${ cap }`;
}

/**
 * Transforms handler name to event name, e.g. `onInstanceReady` -> `instanceReady`.
 *
 * @param evtName event name
 * @returns handler name
 */
export function handlerNameToEventName( handlerName: string ) {
	return handlerName.substr( 2, 1 ).toLowerCase() + handlerName.substr( 3 );
}

/**
 * Provides an object with event names as keys and prefixed names as values, e.g. `{ instanceReady: __CKE__instanceReady }`.
 * This allows to easily mix editor event actions and own actions in downstream reducers.
 */
export const CKEditorEventAction = [ ...events, ...namespaceEvents ].reduce(
	( acc, evtName ) => {
		return {
			...acc,
			[ evtName ]: prefixEventName( evtName )
		};
	},
	{} as CKEditorAction
);
