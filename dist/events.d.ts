/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
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
export declare const events: readonly ["activeEnterModeChange", "activeFilterChange", "afterCommandExec", "afterInsertHtml", "afterPaste", "afterPasteFromWord", "afterSetData", "afterUndoImage", "ariaEditorHelpLabel", "ariaWidget", "autogrow", "beforeCommandExec", "beforeDestroy", "beforeGetData", "beforeModeUnload", "beforeSetMode", "beforeUndoImage", "blur", "change", "configLoaded", "contentDirChanged", "contentDom", "contentDomInvalidated", "contentDomUnload", "contentPreview", "customConfigLoaded", "dataFiltered", "dataReady", "destroy", "dialogHide", "dialogShow", "dirChanged", "doubleclick", "dragend", "dragstart", "drop", "elementsPathUpdate", "exportPdf", "fileUploadRequest", "fileUploadResponse", "floatingSpaceLayout", "focus", "getData", "getSnapshot", "insertElement", "insertHtml", "insertText", "instanceReady", "key", "langLoaded", "loadSnapshot", "loaded", "lockSnapshot", "maximize", "menuShow", "mode", "notificationHide", "notificationShow", "notificationUpdate", "paste", "pasteFromWord", "pluginsLoaded", "readOnly", "removeFormatCleanup", "required", "resize", "save", "saveSnapshot", "selectionChange", "setData", "stylesRemove", "stylesSet", "template", "toDataFormat", "toHtml", "uiSpace", "unlockSnapshot", "updateSnapshot", "widgetDefinition"];
/**
 * Available `namespace` events.
 *
 * - `beforeLoad`: fired before an editor instance is created
 * - `namespaceLoaded`: fired after CKEDITOR namespace is created; fired only once regardless of number of editor instances
 */
export declare const namespaceEvents: readonly ["beforeLoad", "namespaceLoaded"];
/**
 * Combines `editor` and `namespace` events.
 */
export declare const defaultEvents: ("required" | "key" | "loaded" | "resize" | "template" | "paste" | "blur" | "change" | "dragend" | "dragstart" | "drop" | "focus" | "maximize" | "mode" | "readOnly" | "activeEnterModeChange" | "activeFilterChange" | "afterCommandExec" | "afterInsertHtml" | "afterPaste" | "afterPasteFromWord" | "afterSetData" | "afterUndoImage" | "ariaEditorHelpLabel" | "ariaWidget" | "autogrow" | "beforeCommandExec" | "beforeDestroy" | "beforeGetData" | "beforeModeUnload" | "beforeSetMode" | "beforeUndoImage" | "configLoaded" | "contentDirChanged" | "contentDom" | "contentDomInvalidated" | "contentDomUnload" | "contentPreview" | "customConfigLoaded" | "dataFiltered" | "dataReady" | "destroy" | "dialogHide" | "dialogShow" | "dirChanged" | "doubleclick" | "elementsPathUpdate" | "exportPdf" | "fileUploadRequest" | "fileUploadResponse" | "floatingSpaceLayout" | "getData" | "getSnapshot" | "insertElement" | "insertHtml" | "insertText" | "instanceReady" | "langLoaded" | "loadSnapshot" | "lockSnapshot" | "menuShow" | "notificationHide" | "notificationShow" | "notificationUpdate" | "pasteFromWord" | "pluginsLoaded" | "removeFormatCleanup" | "save" | "saveSnapshot" | "selectionChange" | "setData" | "stylesRemove" | "stylesSet" | "toDataFormat" | "toHtml" | "uiSpace" | "unlockSnapshot" | "updateSnapshot" | "widgetDefinition" | "beforeLoad" | "namespaceLoaded")[];
/**
 * Events as action types should be prefixed to allow easier consumption by downstream reducers.
 */
export declare const EVENT_PREFIX = "__CKE__";
/**
 * Prefixes event name: `instanceReady` -> `__CKE__instanceReady`.
 *
 * @param evtName event name
 * @returns prefixed event name
 */
export declare function prefixEventName(evtName: string): string;
/**
 * Strips prefix from event name. `__CKE__instanceReady` -> `instanceReady`.
 *
 * @param evtName prefixed event name
 * @returns event name
 */
export declare function stripPrefix(prefixedEventName: string): string;
/**
 * Transforms prefixed event name to a handler name, e.g. `instanceReady` -> `onInstanceReady`.
 *
 * @param evtName event name
 * @returns handler name
 */
export declare function eventNameToHandlerName(evtName: string): string;
/**
 * Transforms handler name to event name, e.g. `onInstanceReady` -> `instanceReady`.
 *
 * @param evtName event name
 * @returns handler name
 */
export declare function handlerNameToEventName(handlerName: string): string;
/**
 * Provides an object with event names as keys and prefixed names as values, e.g. `{ instanceReady: __CKE__instanceReady }`.
 * This allows to easily mix editor event actions and own actions in downstream reducers.
 */
export declare const CKEditorEventAction: CKEditorAction;
