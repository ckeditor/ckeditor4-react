/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CKEditor4React = {}, global.React));
})(this, (function (exports, React) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespace(React);

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

    var index_cjs = {};

    Object.defineProperty(index_cjs, '__esModule', { value: true });
    function loadScript (src, opts, cb) {
      var head = document.head || document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      if (typeof opts === 'function') {
        cb = opts;
        opts = {};
      }
      opts = opts || {};
      cb = cb || function () {};
      script.type = opts.type || 'text/javascript';
      script.charset = opts.charset || 'utf8';
      script.async = 'async' in opts ? !!opts.async : true;
      script.src = src;
      if (opts.attrs) {
        setAttributes(script, opts.attrs);
      }
      if (opts.text) {
        script.text = String(opts.text);
      }
      var onend = 'onload' in script ? stdOnEnd : ieOnEnd;
      onend(script, cb);
      if (!script.onload) {
        stdOnEnd(script, cb);
      }
      head.appendChild(script);
    }
    function setAttributes(script, attrs) {
      for (var attr in attrs) {
        script.setAttribute(attr, attrs[attr]);
      }
    }
    function stdOnEnd(script, cb) {
      script.onload = function () {
        this.onerror = this.onload = null;
        cb(null, script);
      };
      script.onerror = function () {
        this.onerror = this.onload = null;
        cb(new Error('Failed to load ' + this.src), script);
      };
    }
    function ieOnEnd(script, cb) {
      script.onreadystatechange = function () {
        if (this.readyState != 'complete' && this.readyState != 'loaded') {
          return;
        }
        this.onreadystatechange = null;
        cb(null, script);
      };
    }
    var promise;
    function getEditorNamespace(editorURL, onNamespaceLoaded) {
      if ('CKEDITOR' in window) {
        return Promise.resolve(CKEDITOR);
      }
      if (typeof editorURL !== 'string' || editorURL.length < 1) {
        return Promise.reject(new TypeError('CKEditor URL must be a non-empty string.'));
      }
      if (!promise) {
        promise = getEditorNamespace.scriptLoader(editorURL).then(function (res) {
          if (onNamespaceLoaded) {
            onNamespaceLoaded(res);
          }
          return res;
        });
      }
      return promise;
    }
    getEditorNamespace.scriptLoader = function (editorURL) {
      return new Promise(function (scriptResolve, scriptReject) {
        loadScript(editorURL, function (err) {
          promise = undefined;
          if (err) {
            return scriptReject(err);
          } else if (!window.CKEDITOR) {
            return scriptReject(new Error('Script loaded from editorUrl doesn\'t provide CKEDITOR namespace.'));
          }
          scriptResolve(CKEDITOR);
        });
      });
    };
    function debounce(fn, delay) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var cancel;
      return function () {
        clearTimeout(cancel);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        cancel = setTimeout(fn.bind.apply(fn, [context].concat(args)), delay);
      };
    }
    index_cjs.debounce = debounce;
    var getEditorNamespace_1 = index_cjs.getEditorNamespace = getEditorNamespace;

    var useEffect$1 = React__namespace.useEffect, useReducer = React__namespace.useReducer, useRef$1 = React__namespace.useRef;
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
                getEditorNamespace_1(editorUrlRef.current, onNamespaceLoaded)
                    .then(initEditor)
                    .catch(function (error) {
                    {
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

    var propTypes$1 = {exports: {}};

    var reactIs = {exports: {}};

    var reactIs_development = {};

    {
      (function() {
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' ||
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }
    function typeOf(object) {
      if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;
            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;
              default:
                var $$typeofType = type && type.$$typeof;
                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;
                  default:
                    return $$typeof;
                }
            }
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }
      return undefined;
    }
    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false;
    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true;
          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }
    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }
    reactIs_development.AsyncMode = AsyncMode;
    reactIs_development.ConcurrentMode = ConcurrentMode;
    reactIs_development.ContextConsumer = ContextConsumer;
    reactIs_development.ContextProvider = ContextProvider;
    reactIs_development.Element = Element;
    reactIs_development.ForwardRef = ForwardRef;
    reactIs_development.Fragment = Fragment;
    reactIs_development.Lazy = Lazy;
    reactIs_development.Memo = Memo;
    reactIs_development.Portal = Portal;
    reactIs_development.Profiler = Profiler;
    reactIs_development.StrictMode = StrictMode;
    reactIs_development.Suspense = Suspense;
    reactIs_development.isAsyncMode = isAsyncMode;
    reactIs_development.isConcurrentMode = isConcurrentMode;
    reactIs_development.isContextConsumer = isContextConsumer;
    reactIs_development.isContextProvider = isContextProvider;
    reactIs_development.isElement = isElement;
    reactIs_development.isForwardRef = isForwardRef;
    reactIs_development.isFragment = isFragment;
    reactIs_development.isLazy = isLazy;
    reactIs_development.isMemo = isMemo;
    reactIs_development.isPortal = isPortal;
    reactIs_development.isProfiler = isProfiler;
    reactIs_development.isStrictMode = isStrictMode;
    reactIs_development.isSuspense = isSuspense;
    reactIs_development.isValidElementType = isValidElementType;
    reactIs_development.typeOf = typeOf;
      })();
    }

    {
      reactIs.exports = reactIs_development;
    }

    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
    	if (val === null || val === undefined) {
    		throw new TypeError('Object.assign cannot be called with null or undefined');
    	}
    	return Object(val);
    }
    function shouldUseNative() {
    	try {
    		if (!Object.assign) {
    			return false;
    		}
    		var test1 = new String('abc');
    		test1[5] = 'de';
    		if (Object.getOwnPropertyNames(test1)[0] === '5') {
    			return false;
    		}
    		var test2 = {};
    		for (var i = 0; i < 10; i++) {
    			test2['_' + String.fromCharCode(i)] = i;
    		}
    		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
    			return test2[n];
    		});
    		if (order2.join('') !== '0123456789') {
    			return false;
    		}
    		var test3 = {};
    		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
    			test3[letter] = letter;
    		});
    		if (Object.keys(Object.assign({}, test3)).join('') !==
    				'abcdefghijklmnopqrst') {
    			return false;
    		}
    		return true;
    	} catch (err) {
    		return false;
    	}
    }
    var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    	var from;
    	var to = toObject(target);
    	var symbols;
    	for (var s = 1; s < arguments.length; s++) {
    		from = Object(arguments[s]);
    		for (var key in from) {
    			if (hasOwnProperty.call(from, key)) {
    				to[key] = from[key];
    			}
    		}
    		if (getOwnPropertySymbols) {
    			symbols = getOwnPropertySymbols(from);
    			for (var i = 0; i < symbols.length; i++) {
    				if (propIsEnumerable.call(from, symbols[i])) {
    					to[symbols[i]] = from[symbols[i]];
    				}
    			}
    		}
    	}
    	return to;
    };

    var ReactPropTypesSecret$2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    var ReactPropTypesSecret_1 = ReactPropTypesSecret$2;

    var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

    var printWarning$1 = function() {};
    {
      var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
      var loggedTypeFailures = {};
      var has$1 = has$2;
      printWarning$1 = function(text) {
        var message = 'Warning: ' + text;
        if (typeof console !== 'undefined') {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {  }
      };
    }
    function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
      {
        for (var typeSpecName in typeSpecs) {
          if (has$1(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== 'function') {
                var err = Error(
                  (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                  'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
                  'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
                );
                err.name = 'Invariant Violation';
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning$1(
                (componentName || 'React class') + ': type specification of ' +
                location + ' `' + typeSpecName + '` is invalid; the type checker ' +
                'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
                'You may have forgotten to pass an argument to the type checker ' +
                'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                'shape all require an argument).'
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : '';
              printWarning$1(
                'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
              );
            }
          }
        }
      }
    }
    checkPropTypes$1.resetWarningCache = function() {
      {
        loggedTypeFailures = {};
      }
    };
    var checkPropTypes_1 = checkPropTypes$1;

    var ReactIs$1 = reactIs.exports;
    var assign = objectAssign;
    var ReactPropTypesSecret = ReactPropTypesSecret_1;
    var has = has$2;
    var checkPropTypes = checkPropTypes_1;
    var printWarning = function() {};
    {
      printWarning = function(text) {
        var message = 'Warning: ' + text;
        if (typeof console !== 'undefined') {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {}
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = '@@iterator';
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === 'function') {
          return iteratorFn;
        }
      }
      var ANONYMOUS = '<<anonymous>>';
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker('array'),
        bigint: createPrimitiveTypeChecker('bigint'),
        bool: createPrimitiveTypeChecker('boolean'),
        func: createPrimitiveTypeChecker('function'),
        number: createPrimitiveTypeChecker('number'),
        object: createPrimitiveTypeChecker('object'),
        string: createPrimitiveTypeChecker('string'),
        symbol: createPrimitiveTypeChecker('symbol'),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker,
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === 'object' ? data: {};
        this.stack = '';
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
                'Use `PropTypes.checkPropTypes()` to call them. ' +
                'Read more at http://fb.me/use-check-prop-types'
              );
              err.name = 'Invariant Violation';
              throw err;
            } else if (typeof console !== 'undefined') {
              var cacheKey = componentName + ':' + propName;
              if (
                !manualPropTypeCallCache[cacheKey] &&
                manualPropTypeWarningCount < 3
              ) {
                printWarning(
                  'You are manually calling a React.PropTypes validation ' +
                  'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
                  'and will throw in the standalone `prop-types` package. ' +
                  'You may be seeing this warning due to a third-party PropTypes ' +
                  'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
              }
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
              {expectedType: expectedType}
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== 'function') {
            return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs$1.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          {
            if (arguments.length > 1) {
              printWarning(
                'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
                'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
              );
            } else {
              printWarning('Invalid argument supplied to oneOf, expected an array.');
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === 'symbol') {
              return String(value);
            }
            return value;
          });
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== 'function') {
            return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') ;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== 'function') {
            printWarning(
              'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
              'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];
            var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
          'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== 'function') {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== 'function') {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
                '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
                '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case 'number':
          case 'string':
          case 'undefined':
            return true;
          case 'boolean':
            return !propValue;
          case 'object':
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === 'symbol') {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue['@@toStringTag'] === 'Symbol') {
          return true;
        }
        if (typeof Symbol === 'function' && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return 'array';
        }
        if (propValue instanceof RegExp) {
          return 'object';
        }
        if (isSymbol(propType, propValue)) {
          return 'symbol';
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === 'undefined' || propValue === null) {
          return '' + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === 'object') {
          if (propValue instanceof Date) {
            return 'date';
          } else if (propValue instanceof RegExp) {
            return 'regexp';
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case 'array':
          case 'object':
            return 'an ' + type;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };

    {
      var ReactIs = reactIs.exports;
      var throwOnDirectAccess = true;
      propTypes$1.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
    }

    var useEffect = React__namespace.useEffect, useRef = React__namespace.useRef, useState = React__namespace.useState;
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
        return (React__namespace.createElement("div", { id: name !== null && name !== void 0 ? name : undefined, ref: setElement, style: getStyle(type !== null && type !== void 0 ? type : 'classic', status, style) }, typeof initData === 'string' ? null : initData));
    }
    var propTypes = __assign({
        config: propTypes$1.exports.object,
        debug: propTypes$1.exports.bool,
        editorUrl: propTypes$1.exports.string,
        initData: propTypes$1.exports.node,
        name: propTypes$1.exports.string,
        readOnly: propTypes$1.exports.bool,
        style: propTypes$1.exports.object,
        type: propTypes$1.exports.oneOf(['classic', 'inline']) }, defaultEvents.reduce(function (acc, key) {
        var _a;
        return __assign(__assign({}, acc), (_a = {}, _a[eventNameToHandlerName(key)] = propTypes$1.exports.func, _a));
    }, {}));
    CKEditor.propTypes = propTypes;

    exports.CKEditor = CKEditor;
    exports.CKEditorEventAction = CKEditorEventAction;
    exports.prefixEventName = prefixEventName;
    exports.registerEditorEventHandler = registerEditorEventHandler;
    exports.stripPrefix = stripPrefix;
    exports.useCKEditor = useCKEditor;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
