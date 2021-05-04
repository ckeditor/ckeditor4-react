/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import CKEditor from './CKEditor';

export interface CKEditorEventPayload {

	/**
	 * Additional event data.
	 */
	data?: Record<string, unknown> | null;

	/**
	 * Editor instance that holds the event sender.
	 */
	editor?: CKEditorInstance | null;

	/**
	 * Extra data appended during listener registration.
	 */
	listenerData?: any;

	/**
	 * Event name.
	 */
	name: CKEditorEvent;

	/**
	 * Object that publishes event.
	 */
	sender: Record<string, unknown>;

	/**
	 * Cancels event (if cancelable).
	 */
	cancel?: () => void | null;

	/**
	 * Removes current listener.
	 */
	removeListener?: () => void | null;

	/**
	 * No listeners will be called afterwards.
	 */
	stop?: () => void | null;
}

/**
 * Event handler signature.
 */
export type CKEditorEventHandler = ( evt: CKEditorEventPayload ) => void;

/**
 * Editor namespace callback.
 */
export type CKEditorNamespaceCb = ( CKEDITOR: CKEditorNamespace ) => void;

/**
 * Editor instance.
 */
export type CKEditorInstance = any;

/**
 * Editor instance's config.
 */
export type CKEditorConfig = Record<string, any>;

/**
 * Editor namespace
 */
export type CKEditorNamespace = any;

export interface CKEditorHookProps {

	/**
	 * Custom configuration object passed to editor's constructor.
	 *
	 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html
	 */
	config?: CKEditorConfig | null;

	/**
	 * Turns on debugging. Logs info related to editor lifecycle events.
	 */
	debug?: boolean | null;

	/**
	 * Url with editor's source code. Uses https://cdn.ckeditor.com domain by default.
	 */
	editorUrl?: string | null;

	/**
	 * Element to be replaced with editor.
	 *
	 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-replace
	 */
	element: HTMLElement | null;

	/**
	 * Callback function with CKEDITOR namespace passed as the only argument.
	 * It is invoked each time a new editor instance is loaded.
	 */
	onBeforeLoad?: CKEditorNamespaceCb | null;

	/**
	 * Callback invoked once the editor instance is loaded.
	 */
	onLoaded?: CKEditorEventHandler | null;

	/**
	 * Callback function with CKEDITOR namespace passed as the only argument.
	 * It is invoked exactly once regardless the number of editor instances.
	 * It is called after CKEDITOR namespace is loaded and before any editor instances are initialized.
	 */
	onNamespaceLoaded?: CKEditorNamespaceCb | null;

	/**
	 * Initializes editor in either `classic` or `inline` mode.
	 *
	 * See:
	 * - https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-inline
	 * - https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-replace
	 */
	type?: CKEditorType | null;
}

export interface CKEditorEventHookProps {

	/**
	 * Turns on debugging. Logs info related to editor lifecycle events.
	 */
	debug?: boolean | null;

	/**
	 * Instance of editor.
	 */
	editor?: CKEditorInstance;

	/**
	 * Event handler to register.
	 */
	handler?: CKEditorEventHandler | null;

	/**
	 * Editor's event name.
	 */
	evtName: CKEditorEvent;

	/**
	 * Custom data passed to listener.
	 */
	listenerData?: any;

	/**
	 * Sets handler's priority.
	 */
	priority?: number;
}

export interface CKEditorHookResult {

	/**
	 * Instance of editor.
	 */
	editor?: CKEditorInstance;

	/**
	 * Current status of editor's instance.
	 */
	status?: CKEditorStatus;
}

/**
 * Possible types of editor.
 */
export type CKEditorType = 'classic' | 'inline';

/**
 * Enhances `editor.status` with `init`, `loading` and `error` state.
 *
 * Possible values:
 * - `init`: editor initialization has not started yet
 * - `loading`: editor is being loaded
 * - `unloaded`: editor is initialized but its components (plugins, languages, etc.) are not
 * - `loaded`: editor components are fully loaded
 * - `ready`: editor is ready for interaction
 * - `destroyed`: editor instance was destroyed
 * - `error`: an error happened during editor initialization
 *
 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#property-status
 */
export type CKEditorStatus =
	| 'init'
	| 'loading'
	| 'unloaded'
	| 'loaded'
	| 'ready'
	| 'destroyed'
	| 'error';

export type CKEditorProps = PropTypes.InferProps<

	/**
	 * Overrides some inferred types in order to get more detailed typings.
	 */
	Omit<
		typeof CKEditor.propTypes,
		| 'onBeforeLoad'
		| 'onDestroyed'
		| 'onInstanceReady'
		| 'onLoaded'
		| 'onNamespaceLoaded'
	>
> & {
	config?: CKEditorConfig | null;
	onBeforeLoad?: CKEditorNamespaceCb | null;
	onDestroyed?: CKEditorEventHandler | null;
	onInstanceReady?: CKEditorEventHandler | null;
	onLoaded?: CKEditorEventHandler | null;
	onNamespaceLoaded?: CKEditorNamespaceCb | null;
	style?: React.CSSProperties | null;
};

export type CKEditorEvent =
	| 'activeEnterModeChange'
	| 'activeFilterChange'
	| 'afterCommandExec'
	| 'afterInsertHtml'
	| 'afterPaste'
	| 'afterPasteFromWord'
	| 'afterSetData'
	| 'afterUndoImage'
	| 'ariaEditorHelpLabel'
	| 'ariaWidget'
	| 'autogrow'
	| 'beforeCommandExec'
	| 'beforeDestroy'
	| 'beforeGetData'
	| 'beforeModeUnload'
	| 'beforeSetMode'
	| 'beforeUndoImage'
	| 'blur'
	| 'change'
	| 'configLoaded'
	| 'contentDirChanged'
	| 'contentDom'
	| 'contentDomInvalidated'
	| 'contentDomUnload'
	| 'contentPreview'
	| 'customConfigLoaded'
	| 'dataFiltered'
	| 'dataReady'
	| 'destroy'
	| 'dialogHide'
	| 'dialogShow'
	| 'dirChanged'
	| 'doubleclick'
	| 'dragend'
	| 'dragstart'
	| 'drop'
	| 'elementsPathUpdate'
	| 'exportPdf'
	| 'fileUploadRequest'
	| 'fileUploadResponse'
	| 'floatingSpaceLayout'
	| 'focus'
	| 'getData'
	| 'getSnapshot'
	| 'insertElement'
	| 'insertHtml'
	| 'insertText'
	| 'instanceReady'
	| 'key'
	| 'langLoaded'
	| 'loadSnapshot'
	| 'loaded'
	| 'lockSnapshot'
	| 'maximize'
	| 'menuShow'
	| 'mode'
	| 'notificationHide'
	| 'notificationShow'
	| 'notificationUpdate'
	| 'paste'
	| 'pasteFromWord'
	| 'pluginsLoaded'
	| 'readOnly'
	| 'removeFormatCleanup'
	| 'required'
	| 'resize'
	| 'save'
	| 'saveSnapshot'
	| 'selectionChange'
	| 'setData'
	| 'stylesRemove'
	| 'stylesSet'
	| 'template'
	| 'toDataFormat'
	| 'toHtml'
	| 'uiSpace'
	| 'unlockSnapshot'
	| 'updateSnapshot'
	| 'widgetDefinition';
