/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
import * as React from 'react';
import { getEditorNamespace } from 'ckeditor4-integrations-common';
import * as PropTypes from 'prop-types';

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var events = [
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
];
var namespaceEvents = ['beforeLoad', 'namespaceLoaded'];
var defaultEvents = __spreadArray(__spreadArray([], events, true), namespaceEvents, true);
var EVENT_PREFIX = '__CKE__';
function prefixEventName(evtName) {
    return "".concat(EVENT_PREFIX).concat(evtName);
}
function stripPrefix(prefixedEventName) {
    return prefixedEventName.substr(EVENT_PREFIX.length);
}
function eventNameToHandlerName(evtName) {
    var cap = evtName.substr(0, 1).toUpperCase() + evtName.substr(1);
    return "on".concat(cap);
}
function handlerNameToEventName(handlerName) {
    return handlerName.substr(2, 1).toLowerCase() + handlerName.substr(3);
}
var CKEditorEventAction = __spreadArray(__spreadArray([], events, true), namespaceEvents, true).reduce(function (acc, evtName) {
    var _a;
    return __assign(__assign({}, acc), (_a = {}, _a[evtName] = prefixEventName(evtName), _a));
}, {});

function camelToKebab(str) {
    return str
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase();
}
function uniqueName() {
    return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
}
function getStyle(type, status, style) {
    var hidden = { display: 'none', visibility: 'hidden' };
    if (type === 'classic') {
        return hidden;
    }
    return status === 'ready' ? style !== null && style !== void 0 ? style : undefined : hidden;
}

function registerEditorEventHandler(_a) {
    var debug = _a.debug, editor = _a.editor, evtName = _a.evtName, handler = _a.handler, listenerData = _a.listenerData, priority = _a.priority;
    var handlerId = debug && uniqueName();
    var _handler = handler;
    if (debug) {
        _handler = function (args) {
            console.log({
                operation: 'invoke',
                editor: editor.name,
                evtName: evtName,
                handlerId: handlerId,
                data: args.data,
                listenerData: args.listenerData
            });
            handler(args);
        };
    }
    if (debug) {
        console.log({
            operation: 'register',
            editor: editor.name,
            evtName: evtName,
            handlerId: handlerId
        });
    }
    editor.on(evtName, _handler, null, listenerData, priority);
    return function () {
        if (debug) {
            console.log({
                operation: 'unregister',
                editor: editor.name,
                evtName: evtName,
                handlerId: handlerId
            });
        }
        editor.removeListener(evtName, _handler);
    };
}

var useEffect$1 = React.useEffect, useReducer = React.useReducer, useRef$1 = React.useRef;
var defEditorUrl = 'https://cdn.ckeditor.com/4.17.2/standard-all/ckeditor.js';
var defConfig = {};
function useCKEditor(_a) {
    var config = _a.config, debug = _a.debug, dispatchEvent = _a.dispatchEvent, _b = _a.subscribeTo, subscribeTo = _b === void 0 ? defaultEvents : _b, editorUrl = _a.editorUrl, element = _a.element, initContent = _a.initContent, _c = _a.type, type = _c === void 0 ? 'classic' : _c;
    var editorUrlRef = useRef$1(editorUrl || defEditorUrl);
    var subscribeToRef = useRef$1(subscribeTo !== null && subscribeTo !== void 0 ? subscribeTo : defaultEvents);
    var debugRef = useRef$1(debug);
    var dispatchEventRef = useRef$1(dispatchEvent);
    var initContentRef = useRef$1(initContent);
    var configRef = useRef$1(config || defConfig);
    var typeRef = useRef$1(type);
    var _d = useReducer(reducer, {
        editor: undefined,
        hookStatus: 'init'
    }), _e = _d[0], editor = _e.editor, hookStatus = _e.hookStatus, dispatch = _d[1];
    useEffect$1(function () {
        if (element && !editor) {
            dispatch({ type: 'loading' });
            var onNamespaceLoaded = function (CKEDITOR) {
                var _a;
                if (subscribeToRef.current.indexOf('namespaceLoaded') !== -1) {
                    (_a = dispatchEventRef.current) === null || _a === void 0 ? void 0 : _a.call(dispatchEventRef, {
                        type: CKEditorEventAction.namespaceLoaded,
                        payload: CKEDITOR
                    });
                }
            };
            var initEditor = function (CKEDITOR) {
                var _a;
                var isInline = typeRef.current === 'inline';
                var isReadOnly = configRef.current.readOnly;
                if (subscribeToRef.current.indexOf('beforeLoad') !== -1) {
                    (_a = dispatchEventRef.current) === null || _a === void 0 ? void 0 : _a.call(dispatchEventRef, {
                        type: CKEditorEventAction.beforeLoad,
                        payload: CKEDITOR
                    });
                }
                var editor = CKEDITOR[isInline ? 'inline' : 'replace'](element, configRef.current);
                var subscribedEditorEvents = subscribeToRef.current.filter(function (evtName) { return namespaceEvents.indexOf(evtName) === -1; });
                subscribedEditorEvents.forEach(function (evtName) {
                    registerEditorEventHandler({
                        debug: debugRef.current,
                        editor: editor,
                        evtName: evtName,
                        handler: function (payload) {
                            var _a;
                            (_a = dispatchEventRef.current) === null || _a === void 0 ? void 0 : _a.call(dispatchEventRef, {
                                type: "".concat(EVENT_PREFIX).concat(evtName),
                                payload: payload
                            });
                        }
                    });
                });
                registerEditorEventHandler({
                    debug: debugRef.current,
                    editor: editor,
                    evtName: 'loaded',
                    handler: function () {
                        dispatch({ type: 'loaded' });
                    },
                    priority: -1
                });
                registerEditorEventHandler({
                    debug: debugRef.current,
                    editor: editor,
                    evtName: 'instanceReady',
                    handler: function (_a) {
                        var editor = _a.editor;
                        dispatch({ type: 'ready' });
                        if (isInline && !isReadOnly) {
                            editor.setReadOnly(false);
                        }
                        if (initContentRef.current) {
                            editor.setData(initContentRef.current, {
                                noSnapshot: true,
                                callback: function () {
                                    editor.resetUndo();
                                }
                            });
                        }
                    },
                    priority: -1
                });
                registerEditorEventHandler({
                    debug: debugRef.current,
                    editor: editor,
                    evtName: 'destroy',
                    handler: function () {
                        dispatch({ type: 'destroyed' });
                    },
                    priority: -1
                });
                dispatch({
                    type: 'unloaded',
                    payload: editor
                });
            };
            getEditorNamespace(editorUrlRef.current, onNamespaceLoaded)
                .then(initEditor)
                .catch(function (error) {
                if (process.env.NODE_ENV !== 'test') {
                    console.error(error);
                }
                dispatch({ type: 'error' });
            });
        }
        return function () {
            if (editor) {
                editor.destroy();
            }
        };
    }, [editor, element]);
    return {
        editor: editor,
        status: editor === null || editor === void 0 ? void 0 : editor.status,
        error: hookStatus === 'error',
        loading: hookStatus === 'loading'
    };
}
function reducer(state, action) {
    switch (action.type) {
        case 'init':
            return __assign(__assign({}, state), { hookStatus: 'init' });
        case 'loading':
            return __assign(__assign({}, state), { hookStatus: 'loading' });
        case 'unloaded':
            return {
                editor: action.payload,
                hookStatus: 'unloaded'
            };
        case 'loaded':
            return __assign(__assign({}, state), { hookStatus: 'loaded' });
        case 'ready':
            return __assign(__assign({}, state), { hookStatus: 'ready' });
        case 'destroyed':
            return {
                editor: undefined,
                hookStatus: 'destroyed'
            };
        case 'error':
            return {
                editor: undefined,
                hookStatus: 'error'
            };
        default:
            return state;
    }
}

var useEffect = React.useEffect, useRef = React.useRef, useState = React.useState;
function CKEditor(_a) {
    var _b = _a.config, config = _b === void 0 ? {} : _b, debug = _a.debug, editorUrl = _a.editorUrl, initData = _a.initData, name = _a.name, readOnly = _a.readOnly, style = _a.style, type = _a.type,
    handlers = __rest(_a, ["config", "debug", "editorUrl", "initData", "name", "readOnly", "style", "type"]);
    var _c = useState(null), element = _c[0], setElement = _c[1];
    var refs = useRef(handlers);
    var dispatchEvent = function (_a) {
        var type = _a.type, payload = _a.payload;
        var handlerName = eventNameToHandlerName(stripPrefix(type));
        var handler = refs.current[handlerName];
        if (handler) {
            handler(payload);
        }
    };
    if (config && typeof readOnly === 'boolean') {
        config.readOnly = readOnly;
    }
    var _d = useCKEditor({
        config: config,
        dispatchEvent: dispatchEvent,
        debug: debug,
        editorUrl: editorUrl,
        element: element,
        initContent: typeof initData === 'string' ? initData : undefined,
        subscribeTo: Object.keys(handlers)
            .filter(function (key) { return key.indexOf('on') === 0; })
            .map(handlerNameToEventName),
        type: type
    }), editor = _d.editor, status = _d.status;
    useEffect(function () {
        var canSetStyles = type !== 'inline' &&
            editor &&
            (status === 'loaded' || status === 'ready');
        if (style && canSetStyles) {
            editor.container.setStyles(style);
        }
        return function () {
            if (style && canSetStyles) {
                Object.keys(style)
                    .map(camelToKebab)
                    .forEach(function (styleName) {
                    editor.container.removeStyle(styleName);
                });
            }
        };
    }, [editor, status, style, type]);
    useEffect(function () {
        if (editor && status === 'ready' && typeof readOnly === 'boolean') {
            editor.setReadOnly(readOnly);
        }
    }, [editor, status, readOnly]);
    return (React.createElement("div", { id: name !== null && name !== void 0 ? name : undefined, ref: setElement, style: getStyle(type !== null && type !== void 0 ? type : 'classic', status, style) }, typeof initData === 'string' ? null : initData));
}
var propTypes = __assign({
    config: PropTypes.object,
    debug: PropTypes.bool,
    editorUrl: PropTypes.string,
    initData: PropTypes.node,
    name: PropTypes.string,
    readOnly: PropTypes.bool,
    style: PropTypes.object,
    type: PropTypes.oneOf(['classic', 'inline']) }, defaultEvents.reduce(function (acc, key) {
    var _a;
    return __assign(__assign({}, acc), (_a = {}, _a[eventNameToHandlerName(key)] = PropTypes.func, _a));
}, {}));
CKEditor.propTypes = propTypes;

export { CKEditor, CKEditorEventAction, prefixEventName, registerEditorEventHandler, stripPrefix, useCKEditor };
