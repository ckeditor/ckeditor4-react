/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import CKEditor from './CKEditor';
import { events, namespaceEvents } from './events';
/**
 * Event names associated with `editor` events.
 */
export declare type CKEditorEditorEventName = typeof events[number];
/**
 * Event names associated with `namespace` events.
 */
export declare type CKEditorNamespaceEventName = typeof namespaceEvents[number];
/**
 * Combined `editor` and `namespace` events.
 */
export declare type CKEditorDefaultEvent = CKEditorEditorEventName | CKEditorNamespaceEventName;
/**
 * Payload passed to `editor` event handlers.
 */
export interface CKEditorEventPayload<EventName> {
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
    name: EventName;
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
 * Signature of `editor` event handler.
 */
export declare type CKEditorEventHandler<EventName> = (evt: CKEditorEventPayload<EventName>) => void;
/**
 * Signature of `namespace` event handler.
 */
export declare type CKEditorNamespaceHandler = (CKEDITOR: CKEditorNamespace) => void;
/**
 * Editor instance.
 */
export declare type CKEditorInstance = any;
/**
 * Editor configuration object.
 */
export declare type CKEditorConfig = Record<string, any>;
/**
 * Namespace object.
 */
export declare type CKEditorNamespace = any;
/**
 * `useCKEditor` hook arguments.
 */
export interface CKEditorHookProps<EventName extends string> {
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
     * Dispatches `editor` / `namespace` events.
     */
    dispatchEvent?: CKEditorEventDispatcher;
    /**
     * List of editor events that will be dispatched. Omit if all events are to be dispatched.
     */
    subscribeTo?: readonly EventName[];
    /**
     * Url with editor's source code. Uses https://cdn.ckeditor.com domain by default.
     */
    editorUrl?: string | null;
    /**
     * DOM element to which editor will be bound.
     */
    element: HTMLElement | null;
    /**
     * Initial editor content. Only `string` values are accepted.
     */
    initContent?: string | null;
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
export interface CKEditorRegisterEventArgs<EventName> {
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
    handler: CKEditorEventHandler<EventName>;
    /**
     * Editor's event name.
     */
    evtName: EventName;
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
export declare type CKEditorEventDispatcher = ({ type, payload }: {
    type: string;
    payload: any;
}) => void;
/**
 * Possible types of editor.
 */
export declare type CKEditorType = 'classic' | 'inline';
/**
 * Editor status.
 *
 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#property-status
 */
export declare type CKEditorStatus = 'unloaded' | 'loaded' | 'ready' | 'destroyed';
/**
 * Props of `CKEditor` component.
 *
 * Some prop types are overriden to provide better typings than `PropTypes.InferProps` has to offer.
 */
export declare type CKEditorProps<EventHandlerProp> = PropTypes.InferProps<Omit<typeof CKEditor.propTypes, 'config' | 'style' | keyof CKEditorEventHandlerProp>> & {
    config?: CKEditorConfig | null;
    style?: React.CSSProperties | null;
} & Partial<CKEditorEventHandlerProp> & EventHandlerProp;
/**
 * Event handler props.
 */
export interface CKEditorEventHandlerProp {
    /**
     * Namespace events.
     */
    onBeforeLoad: CKEditorNamespaceHandler;
    onNamespaceLoaded: CKEditorNamespaceHandler;
    /**
     * Editor events.
     */
    onActiveEnterModeChange: CKEditorEventHandler<'activeEnterModeChange'>;
    onActiveFilterChange: CKEditorEventHandler<'activeFilterChange'>;
    onAfterCommandExec: CKEditorEventHandler<'afterCommandExec'>;
    onAfterInsertHtml: CKEditorEventHandler<'afterInsertHtml'>;
    onAfterPaste: CKEditorEventHandler<'afterPaste'>;
    onAfterPasteFromWord: CKEditorEventHandler<'afterPasteFromWord'>;
    onAfterSetData: CKEditorEventHandler<'afterSetData'>;
    onAfterUndoImage: CKEditorEventHandler<'afterUndoImage'>;
    onAriaEditorHelpLabel: CKEditorEventHandler<'ariaEditorHelpLabel'>;
    onAriaWidget: CKEditorEventHandler<'ariaWidget'>;
    onAutogrow: CKEditorEventHandler<'autogrow'>;
    onBeforeCommandExec: CKEditorEventHandler<'beforeCommandExec'>;
    onBeforeDestroy: CKEditorEventHandler<'beforeDestroy'>;
    onBeforeGetData: CKEditorEventHandler<'beforeGetData'>;
    onBeforeModeUnload: CKEditorEventHandler<'beforeModeUnload'>;
    onBeforeSetMode: CKEditorEventHandler<'beforeSetMode'>;
    onBeforeUndoImage: CKEditorEventHandler<'beforeUndoImage'>;
    onBlur: CKEditorEventHandler<'blur'>;
    onChange: CKEditorEventHandler<'change'>;
    onConfigLoaded: CKEditorEventHandler<'configLoaded'>;
    onContentDirChanged: CKEditorEventHandler<'contentDirChanged'>;
    onContentDom: CKEditorEventHandler<'contentDom'>;
    onContentDomInvalidated: CKEditorEventHandler<'contentDomInvalidated'>;
    onContentDomUnload: CKEditorEventHandler<'contentDomUnload'>;
    onContentPreview: CKEditorEventHandler<'contentPreview'>;
    onCustomConfigLoaded: CKEditorEventHandler<'customConfigLoaded'>;
    onDataFiltered: CKEditorEventHandler<'dataFiltered'>;
    onDataReady: CKEditorEventHandler<'dataReady'>;
    onDestroy: CKEditorEventHandler<'destroy'>;
    onDialogHide: CKEditorEventHandler<'dialogHide'>;
    onDialogShow: CKEditorEventHandler<'dialogShow'>;
    onDirChanged: CKEditorEventHandler<'dirChanged'>;
    onDoubleclick: CKEditorEventHandler<'doubleclick'>;
    onDragend: CKEditorEventHandler<'dragend'>;
    onDragstart: CKEditorEventHandler<'dragstart'>;
    onDrop: CKEditorEventHandler<'drop'>;
    onElementsPathUpdate: CKEditorEventHandler<'elementsPathUpdate'>;
    onExportPdf: CKEditorEventHandler<'exportPdf'>;
    onFileUploadRequest: CKEditorEventHandler<'fileUploadRequest'>;
    onFileUploadResponse: CKEditorEventHandler<'fileUploadResponse'>;
    onFloatingSpaceLayout: CKEditorEventHandler<'floatingSpaceLayout'>;
    onFocus: CKEditorEventHandler<'focus'>;
    onGetData: CKEditorEventHandler<'getData'>;
    onGetSnapshot: CKEditorEventHandler<'getSnapshot'>;
    onInsertElement: CKEditorEventHandler<'insertElement'>;
    onInsertHtml: CKEditorEventHandler<'insertHtml'>;
    onInsertText: CKEditorEventHandler<'insertText'>;
    onInstanceReady: CKEditorEventHandler<'instanceReady'>;
    onKey: CKEditorEventHandler<'key'>;
    onLangLoaded: CKEditorEventHandler<'langLoaded'>;
    onLoadSnapshot: CKEditorEventHandler<'loadSnapshot'>;
    onLoaded: CKEditorEventHandler<'loaded'>;
    onLockSnapshot: CKEditorEventHandler<'lockSnapshot'>;
    onMaximize: CKEditorEventHandler<'maximize'>;
    onMenuShow: CKEditorEventHandler<'menuShow'>;
    onMode: CKEditorEventHandler<'mode'>;
    onNotificationHide: CKEditorEventHandler<'notificationHide'>;
    onNotificationShow: CKEditorEventHandler<'notificationShow'>;
    onNotificationUpdate: CKEditorEventHandler<'notificationUpdate'>;
    onPaste: CKEditorEventHandler<'paste'>;
    onPasteFromWord: CKEditorEventHandler<'pasteFromWord'>;
    onPluginsLoaded: CKEditorEventHandler<'pluginsLoaded'>;
    onReadOnly: CKEditorEventHandler<'readOnly'>;
    onRemoveFormatCleanup: CKEditorEventHandler<'removeFormatCleanup'>;
    onRequired: CKEditorEventHandler<'required'>;
    onResize: CKEditorEventHandler<'resize'>;
    onSave: CKEditorEventHandler<'save'>;
    onSaveSnapshot: CKEditorEventHandler<'saveSnapshot'>;
    onSelectionChange: CKEditorEventHandler<'selectionChange'>;
    onSetData: CKEditorEventHandler<'setData'>;
    onStylesRemove: CKEditorEventHandler<'stylesRemove'>;
    onStylesSet: CKEditorEventHandler<'stylesSet'>;
    onTemplate: CKEditorEventHandler<'template'>;
    onToDataFormat: CKEditorEventHandler<'toDataFormat'>;
    onToHtml: CKEditorEventHandler<'toHtml'>;
    onUiSpace: CKEditorEventHandler<'uiSpace'>;
    onUnlockSnapshot: CKEditorEventHandler<'unlockSnapshot'>;
    onUpdateSnapshot: CKEditorEventHandler<'updateSnapshot'>;
    onWidgetDefinition: CKEditorEventHandler<'widgetDefinition'>;
}
/**
 * Event action types.
 */
export interface CKEditorAction {
    /**
     * Namespace events.
     */
    beforeLoad: '__CKE__beforeLoad';
    namespaceLoaded: '__CKE__namespaceLoaded';
    /**
     * Editor events.
     */
    activeEnterModeChange: '__CKE__activeEnterModeChange';
    activeFilterChange: '__CKE__activeFilterChange';
    afterCommandExec: '__CKE__afterCommandExec';
    afterInsertHtml: '__CKE__afterInsertHtml';
    afterPaste: '__CKE__afterPaste';
    afterPasteFromWord: '__CKE__afterPasteFromWord';
    afterSetData: '__CKE__afterSetData';
    afterUndoImage: '__CKE__afterUndoImage';
    ariaEditorHelpLabel: '__CKE__ariaEditorHelpLabel';
    ariaWidget: '__CKE__ariaWidget';
    autogrow: '__CKE__autogrow';
    beforeCommandExec: '__CKE__beforeCommandExec';
    beforeDestroy: '__CKE__beforeDestroy';
    beforeGetData: '__CKE__beforeGetData';
    beforeModeUnload: '__CKE__beforeModeUnload';
    beforeSetMode: '__CKE__beforeSetMode';
    beforeUndoImage: '__CKE__beforeUndoImage';
    blur: '__CKE__blur';
    change: '__CKE__change';
    configLoaded: '__CKE__configLoaded';
    contentDirChanged: '__CKE__contentDirChanged';
    contentDom: '__CKE__contentDom';
    contentDomInvalidated: '__CKE__contentDomInvalidated';
    contentDomUnload: '__CKE__contentDomUnload';
    contentPreview: '__CKE__contentPreview';
    customConfigLoaded: '__CKE__customConfigLoaded';
    dataFiltered: '__CKE__dataFiltered';
    dataReady: '__CKE__dataReady';
    destroy: '__CKE__destroy';
    dialogHide: '__CKE__dialogHide';
    dialogShow: '__CKE__dialogShow';
    dirChanged: '__CKE__dirChanged';
    doubleclick: '__CKE__doubleclick';
    dragend: '__CKE__dragend';
    dragstart: '__CKE__dragstart';
    drop: '__CKE__drop';
    elementsPathUpdate: '__CKE__elementsPathUpdate';
    exportPdf: '__CKE__exportPdf';
    fileUploadRequest: '__CKE__fileUploadRequest';
    fileUploadResponse: '__CKE__fileUploadResponse';
    floatingSpaceLayout: '__CKE__floatingSpaceLayout';
    focus: '__CKE__focus';
    getData: '__CKE__getData';
    getSnapshot: '__CKE__getSnapshot';
    insertElement: '__CKE__insertElement';
    insertHtml: '__CKE__insertHtml';
    insertText: '__CKE__insertText';
    instanceReady: '__CKE__instanceReady';
    key: '__CKE__key';
    langLoaded: '__CKE__langLoaded';
    loadSnapshot: '__CKE__loadSnapshot';
    loaded: '__CKE__loaded';
    lockSnapshot: '__CKE__lockSnapshot';
    maximize: '__CKE__maximize';
    menuShow: '__CKE__menuShow';
    mode: '__CKE__mode';
    notificationHide: '__CKE__notificationHide';
    notificationShow: '__CKE__notificationShow';
    notificationUpdate: '__CKE__notificationUpdate';
    paste: '__CKE__paste';
    pasteFromWord: '__CKE__pasteFromWord';
    pluginsLoaded: '__CKE__pluginsLoaded';
    readOnly: '__CKE__readOnly';
    removeFormatCleanup: '__CKE__removeFormatCleanup';
    required: '__CKE__required';
    resize: '__CKE__resize';
    save: '__CKE__save';
    saveSnapshot: '__CKE__saveSnapshot';
    selectionChange: '__CKE__selectionChange';
    setData: '__CKE__setData';
    stylesRemove: '__CKE__stylesRemove';
    stylesSet: '__CKE__stylesSet';
    template: '__CKE__template';
    toDataFormat: '__CKE__toDataFormat';
    toHtml: '__CKE__toHtml';
    uiSpace: '__CKE__uiSpace';
    unlockSnapshot: '__CKE__unlockSnapshot';
    updateSnapshot: '__CKE__updateSnapshot';
    widgetDefinition: '__CKE__widgetDefinition';
}
