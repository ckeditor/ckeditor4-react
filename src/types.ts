/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import CKEditor from './CKEditor';
import { events, namespaceEvents, EVENT_PREFIX } from './events';

/**
 * Eitor event handler's payload.
 */
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
	name: CKEditorEditorEventName;

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
 * Signature of editor event handler.
 */
export type CKEditorEventHandler = ( evt: CKEditorEventPayload ) => void;

/**
 * Signature of namespace event handler.
 */
export type CKEditorNamespaceCb = ( CKEDITOR: CKEditorNamespace ) => void;

/**
 * Editor instance.
 */
export type CKEditorInstance = any;

/**
 * Editor configuration object.
 */
export type CKEditorConfig = Record<string, any>;

/**
 * Namespace object.
 */
export type CKEditorNamespace = any;

/**
 * `useCKEditor` hook arguments.
 */
export interface CKEditorHookProps {

	/**
	 * Config object passed to editor's constructor.
	 *
	 * A new instance of editor will be created everytime a new instance of `config` is provided.
	 * If this is not expected behavior then ensure referential equality of `config` between renders.
	 *
	 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html
	 */
	config?: CKEditorConfig | null;

	/**
	 * Toggles debugging. Logs info related to editor lifecycle events.
	 */
	debug?: boolean | null;

	/**
	 * Dispatches editor / namespace events.
	 */
	dispatchEvent?: CKEditorEventDispatcher;

	/**
	 * List of editor events that will be dispatched. Omit if all events are to be dispatched.
	 */
	subscribeTo?: readonly CKEditorEventName[];

	/**
	 * Url with editor's source code. Uses https://cdn.ckeditor.com domain by default.
	 */
	editorUrl?: string | null;

	/**
	 * DOM element to which editor will be bound.
	 */
	element: HTMLElement | null;

	/**
	 * Initializes editor in either `classic` or `inline` mode.
	 *
	 * See:
	 * - https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-inline
	 * - https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-replace
	 */
	type?: CKEditorType | null;
}

/**
 * Arguments passed to event registeration helper.
 */
export interface CKEditorRegisterEventArgs {

	/**
	 * Toggles debugging. Logs info related to editor lifecycle events.
	 */
	debug?: boolean | null;

	/**
	 * Editor instance.
	 */
	editor: CKEditorInstance;

	/**
	 * Event handler to register.
	 */
	handler: CKEditorEventHandler;

	/**
	 * Editor's event name.
	 */
	evtName: CKEditorEventName;

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
	 * Status of editor's instance. Equivalent of `editor.status`.
	 */
	status?: CKEditorStatus;

	/**
	 * Indicates if an error occurred. This is a non-recoverable state. Hook must be remounted.
	 */
	error?: boolean;

	/**
	 * Indicates if loading of CKEditor is in progress.
	 */
	loading?: boolean;
}

/**
 * Dispatcher of editor events.
 */
export type CKEditorEventDispatcher = ( {
	type,
	payload
}: {
	type: CKEditorPrefixedEventName;
	payload: CKEditorEventPayload | CKEditorNamespace;
} ) => void;

/**
 * Possible types of editor.
 */
export type CKEditorType = 'classic' | 'inline';

/**
 * Editor status.
 *
 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#property-status
 */
export type CKEditorStatus = 'unloaded' | 'loaded' | 'ready' | 'destroyed';

/**
 * Props of `CKEditor` component.
 *
 * Some prop types are overriden to provide better typings than `PropTypes.InferProps` has to offer.
 */
export type CKEditorProps = PropTypes.InferProps<
	Omit<
		typeof CKEditor.propTypes,
		'config' | 'style' | CKEditorEventHandlerName
	>
> & {
	config?: CKEditorConfig | null;
	style?: React.CSSProperties | null;
} & CKEditorEventHandlersProps;

/**
 * Event handlers props of `CKEditor` component.
 */
export type CKEditorEventHandlersProps = Partial<
	Record<CKEditorEventHandlerName, CKEditorEventHandler | null>
>;

/**
 * Combined editor and namespace event names.
 */
export type CKEditorEditorEventName = typeof events[number];

/**
 * Combined editor and namespace event names.
 */
export type CKEditorEventName =
	| CKEditorEditorEventName
	| typeof namespaceEvents[number];

/**
 * Combined editor and namespace handler names.
 */
export type CKEditorEventHandlerName = `on${ Capitalize<CKEditorEventName> }`;

export type CKEditorPrefixedEventName = `${ typeof EVENT_PREFIX }${ CKEditorEventName }`;

/**
 * Action types associated with both editor and namespace events.
 */
export interface CKEditorAction {

	/**
	 * Namespace events.
	 */
	beforeLoad: `${ typeof EVENT_PREFIX }beforeLoad`;
	namespaceLoaded: `${ typeof EVENT_PREFIX }namespaceLoaded`;

	/**
	 * Editor events.
	 */
	activeEnterModeChange: `${ typeof EVENT_PREFIX }activeEnterModeChange`;
	activeFilterChange: `${ typeof EVENT_PREFIX }activeFilterChange`;
	afterCommandExec: `${ typeof EVENT_PREFIX }afterCommandExec`;
	afterInsertHtml: `${ typeof EVENT_PREFIX }afterInsertHtml`;
	afterPaste: `${ typeof EVENT_PREFIX }afterPaste`;
	afterPasteFromWord: `${ typeof EVENT_PREFIX }afterPasteFromWord`;
	afterSetData: `${ typeof EVENT_PREFIX }afterSetData`;
	afterUndoImage: `${ typeof EVENT_PREFIX }afterUndoImage`;
	ariaEditorHelpLabel: `${ typeof EVENT_PREFIX }ariaEditorHelpLabel`;
	ariaWidget: `${ typeof EVENT_PREFIX }ariaWidget`;
	autogrow: `${ typeof EVENT_PREFIX }autogrow`;
	beforeCommandExec: `${ typeof EVENT_PREFIX }beforeCommandExec`;
	beforeDestroy: `${ typeof EVENT_PREFIX }beforeDestroy`;
	beforeGetData: `${ typeof EVENT_PREFIX }beforeGetData`;
	beforeModeUnload: `${ typeof EVENT_PREFIX }beforeModeUnload`;
	beforeSetMode: `${ typeof EVENT_PREFIX }beforeSetMode`;
	beforeUndoImage: `${ typeof EVENT_PREFIX }beforeUndoImage`;
	blur: `${ typeof EVENT_PREFIX }blur`;
	change: `${ typeof EVENT_PREFIX }change`;
	configLoaded: `${ typeof EVENT_PREFIX }configLoaded`;
	contentDirChanged: `${ typeof EVENT_PREFIX }contentDirChanged`;
	contentDom: `${ typeof EVENT_PREFIX }contentDom`;
	contentDomInvalidated: `${ typeof EVENT_PREFIX }contentDomInvalidated`;
	contentDomUnload: `${ typeof EVENT_PREFIX }contentDomUnload`;
	contentPreview: `${ typeof EVENT_PREFIX }contentPreview`;
	customConfigLoaded: `${ typeof EVENT_PREFIX }customConfigLoaded`;
	dataFiltered: `${ typeof EVENT_PREFIX }dataFiltered`;
	dataReady: `${ typeof EVENT_PREFIX }dataReady`;
	destroy: `${ typeof EVENT_PREFIX }destroy`;
	dialogHide: `${ typeof EVENT_PREFIX }dialogHide`;
	dialogShow: `${ typeof EVENT_PREFIX }dialogShow`;
	dirChanged: `${ typeof EVENT_PREFIX }dirChanged`;
	doubleclick: `${ typeof EVENT_PREFIX }doubleclick`;
	dragend: `${ typeof EVENT_PREFIX }dragend`;
	dragstart: `${ typeof EVENT_PREFIX }dragstart`;
	drop: `${ typeof EVENT_PREFIX }drop`;
	elementsPathUpdate: `${ typeof EVENT_PREFIX }elementsPathUpdate`;
	exportPdf: `${ typeof EVENT_PREFIX }exportPdf`;
	fileUploadRequest: `${ typeof EVENT_PREFIX }fileUploadRequest`;
	fileUploadResponse: `${ typeof EVENT_PREFIX }fileUploadResponse`;
	floatingSpaceLayout: `${ typeof EVENT_PREFIX }floatingSpaceLayout`;
	focus: `${ typeof EVENT_PREFIX }focus`;
	getData: `${ typeof EVENT_PREFIX }getData`;
	getSnapshot: `${ typeof EVENT_PREFIX }getSnapshot`;
	insertElement: `${ typeof EVENT_PREFIX }insertElement`;
	insertHtml: `${ typeof EVENT_PREFIX }insertHtml`;
	insertText: `${ typeof EVENT_PREFIX }insertText`;
	instanceReady: `${ typeof EVENT_PREFIX }instanceReady`;
	key: `${ typeof EVENT_PREFIX }key`;
	langLoaded: `${ typeof EVENT_PREFIX }langLoaded`;
	loadSnapshot: `${ typeof EVENT_PREFIX }loadSnapshot`;
	loaded: `${ typeof EVENT_PREFIX }loaded`;
	lockSnapshot: `${ typeof EVENT_PREFIX }lockSnapshot`;
	maximize: `${ typeof EVENT_PREFIX }maximize`;
	menuShow: `${ typeof EVENT_PREFIX }menuShow`;
	mode: `${ typeof EVENT_PREFIX }mode`;
	notificationHide: `${ typeof EVENT_PREFIX }notificationHide`;
	notificationShow: `${ typeof EVENT_PREFIX }notificationShow`;
	notificationUpdate: `${ typeof EVENT_PREFIX }notificationUpdate`;
	paste: `${ typeof EVENT_PREFIX }paste`;
	pasteFromWord: `${ typeof EVENT_PREFIX }pasteFromWord`;
	pluginsLoaded: `${ typeof EVENT_PREFIX }pluginsLoaded`;
	readOnly: `${ typeof EVENT_PREFIX }readOnly`;
	removeFormatCleanup: `${ typeof EVENT_PREFIX }removeFormatCleanup`;
	required: `${ typeof EVENT_PREFIX }required`;
	resize: `${ typeof EVENT_PREFIX }resize`;
	save: `${ typeof EVENT_PREFIX }save`;
	saveSnapshot: `${ typeof EVENT_PREFIX }saveSnapshot`;
	selectionChange: `${ typeof EVENT_PREFIX }selectionChange`;
	setData: `${ typeof EVENT_PREFIX }setData`;
	stylesRemove: `${ typeof EVENT_PREFIX }stylesRemove`;
	stylesSet: `${ typeof EVENT_PREFIX }stylesSet`;
	template: `${ typeof EVENT_PREFIX }template`;
	toDataFormat: `${ typeof EVENT_PREFIX }toDataFormat`;
	toHtml: `${ typeof EVENT_PREFIX }toHtml`;
	uiSpace: `${ typeof EVENT_PREFIX }uiSpace`;
	unlockSnapshot: `${ typeof EVENT_PREFIX }unlockSnapshot`;
	updateSnapshot: `${ typeof EVENT_PREFIX }updateSnapshot`;
	widgetDefinition: `${ typeof EVENT_PREFIX }widgetDefinition`;
}
