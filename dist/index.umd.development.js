/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CKEditor4React = {}, global.React));
}(this, (function (exports, React) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
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
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
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
    var defaultEvents = __spreadArray(__spreadArray([], events), namespaceEvents);
    var EVENT_PREFIX = '__CKE__';
    function prefixEventName(evtName) {
        return "" + EVENT_PREFIX + evtName;
    }
    function stripPrefix(prefixedEventName) {
        return prefixedEventName.substr(EVENT_PREFIX.length);
    }
    function eventNameToHandlerName(evtName) {
        var cap = evtName.substr(0, 1).toUpperCase() + evtName.substr(1);
        return "on" + cap;
    }
    function handlerNameToEventName(handlerName) {
        return handlerName.substr(2, 1).toLowerCase() + handlerName.substr(3);
    }
    var CKEditorEventAction = __spreadArray(__spreadArray([], events), namespaceEvents).reduce(function (acc, evtName) {
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

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var dist = createCommonjsModule(function (module, exports) {
    !function(t,n){for(var r in n)t[r]=n[r];}(exports,function(t){var n={};function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e});},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)r.d(e,o,function(n){return t[n]}.bind(null,o));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=83)}([function(t,n,r){(function(n){var r=function(t){return t&&t.Math==Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n&&n)||Function("return this")();}).call(this,r(45));},function(t,n,r){var e=r(0),o=r(22),i=r(4),c=r(27),u=r(28),f=r(46),a=o("wks"),s=e.Symbol,p=f?s:s&&s.withoutSetter||c;t.exports=function(t){return i(a,t)||(u&&i(s,t)?a[t]=s[t]:a[t]=p("Symbol."+t)),a[t]};},function(t,n){t.exports=function(t){try{return !!t()}catch(t){return !0}};},function(t,n){t.exports=function(t){return "object"==typeof t?null!==t:"function"==typeof t};},function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)};},function(t,n,r){var e=r(3);t.exports=function(t){if(!e(t))throw TypeError(String(t)+" is not an object");return t};},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)};},function(t,n,r){var e=r(2);t.exports=!e((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}));},function(t,n,r){var e=r(7),o=r(25),i=r(5),c=r(15),u=Object.defineProperty;n.f=e?u:function(t,n,r){if(i(t),n=c(n,!0),i(r),o)try{return u(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return "value"in r&&(t[n]=r.value),t};},function(t,n,r){var e=r(55),o=r(0),i=function(t){return "function"==typeof t?t:void 0};t.exports=function(t,n){return arguments.length<2?i(e[t])||i(o[t]):e[t]&&e[t][n]||o[t]&&o[t][n]};},function(t,n,r){var e=r(7),o=r(8),i=r(16);t.exports=e?function(t,n,r){return o.f(t,n,i(1,r))}:function(t,n,r){return t[n]=r,t};},function(t,n,r){var e=r(0),o=r(10),i=r(4),c=r(14),u=r(17),f=r(29),a=f.get,s=f.enforce,p=String(String).split("String");(t.exports=function(t,n,r,u){var f=!!u&&!!u.unsafe,a=!!u&&!!u.enumerable,l=!!u&&!!u.noTargetGet;"function"==typeof r&&("string"!=typeof n||i(r,"name")||o(r,"name",n),s(r).source=p.join("string"==typeof n?n:"")),t!==e?(f?!l&&t[n]&&(a=!0):delete t[n],a?t[n]=r:o(t,n,r)):a?t[n]=r:c(n,r);})(Function.prototype,"toString",(function(){return "function"==typeof this&&a(this).source||u(this)}));},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t};},function(t,n,r){var e={};e[r(1)("toStringTag")]="z",t.exports="[object z]"===String(e);},function(t,n,r){var e=r(0),o=r(10);t.exports=function(t,n){try{o(e,t,n);}catch(r){e[t]=n;}return n};},function(t,n,r){var e=r(3);t.exports=function(t,n){if(!e(t))return t;var r,o;if(n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!e(o=r.call(t)))return o;if(!n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")};},function(t,n){t.exports=function(t,n){return {enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}};},function(t,n,r){var e=r(24),o=Function.toString;"function"!=typeof e.inspectSource&&(e.inspectSource=function(t){return o.call(t)}),t.exports=e.inspectSource;},function(t,n,r){var e=r(7),o=r(51),i=r(16),c=r(19),u=r(15),f=r(4),a=r(25),s=Object.getOwnPropertyDescriptor;n.f=e?s:function(t,n){if(t=c(t),n=u(n,!0),a)try{return s(t,n)}catch(t){}if(f(t,n))return i(!o.f.call(t,n),t[n])};},function(t,n,r){var e=r(52),o=r(33);t.exports=function(t){return e(o(t))};},function(t,n,r){var e=r(34),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0};},function(t,n,r){var e,o,i=r(0),c=r(40),u=i.process,f=u&&u.versions,a=f&&f.v8;a?o=(e=a.split("."))[0]+e[1]:c&&(!(e=c.match(/Edge\/(\d+)/))||e[1]>=74)&&(e=c.match(/Chrome\/(\d+)/))&&(o=e[1]),t.exports=o&&+o;},function(t,n,r){var e=r(23),o=r(24);(t.exports=function(t,n){return o[t]||(o[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.6.5",mode:e?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"});},function(t,n){t.exports=!1;},function(t,n,r){var e=r(0),o=r(14),i=e["__core-js_shared__"]||o("__core-js_shared__",{});t.exports=i;},function(t,n,r){var e=r(7),o=r(2),i=r(26);t.exports=!e&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}));},function(t,n,r){var e=r(0),o=r(3),i=e.document,c=o(i)&&o(i.createElement);t.exports=function(t){return c?i.createElement(t):{}};},function(t,n){var r=0,e=Math.random();t.exports=function(t){return "Symbol("+String(void 0===t?"":t)+")_"+(++r+e).toString(36)};},function(t,n,r){var e=r(2);t.exports=!!Object.getOwnPropertySymbols&&!e((function(){return !String(Symbol())}));},function(t,n,r){var e,o,i,c=r(47),u=r(0),f=r(3),a=r(10),s=r(4),p=r(48),l=r(30),v=u.WeakMap;if(c){var d=new v,h=d.get,y=d.has,m=d.set;e=function(t,n){return m.call(d,t,n),n},o=function(t){return h.call(d,t)||{}},i=function(t){return y.call(d,t)};}else {var x=p("state");l[x]=!0,e=function(t,n){return a(t,x,n),n},o=function(t){return s(t,x)?t[x]:{}},i=function(t){return s(t,x)};}t.exports={set:e,get:o,has:i,enforce:function(t){return i(t)?o(t):e(t,{})},getterFor:function(t){return function(n){var r;if(!f(n)||(r=o(n)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}}};},function(t,n){t.exports={};},function(t,n,r){var e=r(13),o=r(6),i=r(1)("toStringTag"),c="Arguments"==o(function(){return arguments}());t.exports=e?o:function(t){var n,r,e;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=function(t,n){try{return t[n]}catch(t){}}(n=Object(t),i))?r:c?o(n):"Object"==(e=o(n))&&"function"==typeof n.callee?"Arguments":e};},function(t,n,r){var e=r(0),o=r(18).f,i=r(10),c=r(11),u=r(14),f=r(53),a=r(35);t.exports=function(t,n){var r,s,p,l,v,d=t.target,h=t.global,y=t.stat;if(r=h?e:y?e[d]||u(d,{}):(e[d]||{}).prototype)for(s in n){if(l=n[s],p=t.noTargetGet?(v=o(r,s))&&v.value:r[s],!a(h?s:d+(y?".":"#")+s,t.forced)&&void 0!==p){if(typeof l==typeof p)continue;f(l,p);}(t.sham||p&&p.sham)&&i(l,"sham",!0),c(r,s,l,t);}};},function(t,n){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t};},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)};},function(t,n,r){var e=r(2),o=/#|\.prototype\./,i=function(t,n){var r=u[c(t)];return r==a||r!=f&&("function"==typeof n?e(n):!!n)},c=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},u=i.data={},f=i.NATIVE="N",a=i.POLYFILL="P";t.exports=i;},function(t,n){t.exports={};},function(t,n,r){var e=r(12);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 0:return function(){return t.call(n)};case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}};},function(t,n,r){var e,o,i,c=r(0),u=r(2),f=r(6),a=r(37),s=r(73),p=r(26),l=r(39),v=c.location,d=c.setImmediate,h=c.clearImmediate,y=c.process,m=c.MessageChannel,x=c.Dispatch,g=0,b={},w=function(t){if(b.hasOwnProperty(t)){var n=b[t];delete b[t],n();}},j=function(t){return function(){w(t);}},S=function(t){w(t.data);},O=function(t){c.postMessage(t+"",v.protocol+"//"+v.host);};d&&h||(d=function(t){for(var n=[],r=1;arguments.length>r;)n.push(arguments[r++]);return b[++g]=function(){("function"==typeof t?t:Function(t)).apply(void 0,n);},e(g),g},h=function(t){delete b[t];},"process"==f(y)?e=function(t){y.nextTick(j(t));}:x&&x.now?e=function(t){x.now(j(t));}:m&&!l?(i=(o=new m).port2,o.port1.onmessage=S,e=a(i.postMessage,i,1)):!c.addEventListener||"function"!=typeof postMessage||c.importScripts||u(O)||"file:"===v.protocol?e="onreadystatechange"in p("script")?function(t){s.appendChild(p("script")).onreadystatechange=function(){s.removeChild(this),w(t);};}:function(t){setTimeout(j(t),0);}:(e=O,c.addEventListener("message",S,!1))),t.exports={set:d,clear:h};},function(t,n,r){var e=r(40);t.exports=/(iphone|ipod|ipad).*applewebkit/i.test(e);},function(t,n,r){var e=r(9);t.exports=e("navigator","userAgent")||"";},function(t,n,r){var e=r(12),o=function(t){var n,r;this.promise=new t((function(t,e){if(void 0!==n||void 0!==r)throw TypeError("Bad Promise constructor");n=t,r=e;})),this.resolve=e(n),this.reject=e(r);};t.exports.f=function(t){return new o(t)};},function(t,n,r){var e=r(6);t.exports=Array.isArray||function(t){return "Array"==e(t)};},function(t,n){function r(t,n){t.onload=function(){this.onerror=this.onload=null,n(null,t);},t.onerror=function(){this.onerror=this.onload=null,n(new Error("Failed to load "+this.src),t);};}function e(t,n){t.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,n(null,t));};}t.exports=function(t,n,o){var i=document.head||document.getElementsByTagName("head")[0],c=document.createElement("script");"function"==typeof n&&(o=n,n={}),n=n||{},o=o||function(){},c.type=n.type||"text/javascript",c.charset=n.charset||"utf8",c.async=!("async"in n)||!!n.async,c.src=t,n.attrs&&function(t,n){for(var r in n)t.setAttribute(r,n[r]);}(c,n.attrs),n.text&&(c.text=""+n.text),("onload"in c?r:e)(c,o),c.onload||r(c,o),i.appendChild(c);};},function(t,n,r){var e=r(13),o=r(11),i=r(49);e||o(Object.prototype,"toString",i,{unsafe:!0});},function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")();}catch(t){"object"==typeof window&&(r=window);}t.exports=r;},function(t,n,r){var e=r(28);t.exports=e&&!Symbol.sham&&"symbol"==typeof Symbol.iterator;},function(t,n,r){var e=r(0),o=r(17),i=e.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i));},function(t,n,r){var e=r(22),o=r(27),i=e("keys");t.exports=function(t){return i[t]||(i[t]=o(t))};},function(t,n,r){var e=r(13),o=r(31);t.exports=e?{}.toString:function(){return "[object "+o(this)+"]"};},function(t,n,r){var e,o,i,c,u=r(32),f=r(23),a=r(0),s=r(9),p=r(62),l=r(11),v=r(63),d=r(64),h=r(65),y=r(3),m=r(12),x=r(66),g=r(6),b=r(17),w=r(67),j=r(71),S=r(72),O=r(38).set,E=r(74),T=r(75),P=r(76),M=r(41),_=r(77),A=r(29),C=r(35),I=r(1),k=r(21),D=I("species"),L="Promise",F=A.get,N=A.set,R=A.getterFor(L),K=p,z=a.TypeError,U=a.document,B=a.process,W=s("fetch"),q=M.f,G=q,H="process"==g(B),V=!!(U&&U.createEvent&&a.dispatchEvent),Y=C(L,(function(){if(!(b(K)!==String(K))){if(66===k)return !0;if(!H&&"function"!=typeof PromiseRejectionEvent)return !0}if(f&&!K.prototype.finally)return !0;if(k>=51&&/native code/.test(K))return !1;var t=K.resolve(1),n=function(t){t((function(){}),(function(){}));};return (t.constructor={})[D]=n,!(t.then((function(){}))instanceof n)})),J=Y||!j((function(t){K.all(t).catch((function(){}));})),Q=function(t){var n;return !(!y(t)||"function"!=typeof(n=t.then))&&n},X=function(t,n,r){if(!n.notified){n.notified=!0;var e=n.reactions;E((function(){for(var o=n.value,i=1==n.state,c=0;e.length>c;){var u,f,a,s=e[c++],p=i?s.ok:s.fail,l=s.resolve,v=s.reject,d=s.domain;try{p?(i||(2===n.rejection&&nt(t,n),n.rejection=1),!0===p?u=o:(d&&d.enter(),u=p(o),d&&(d.exit(),a=!0)),u===s.promise?v(z("Promise-chain cycle")):(f=Q(u))?f.call(u,l,v):l(u)):v(o);}catch(t){d&&!a&&d.exit(),v(t);}}n.reactions=[],n.notified=!1,r&&!n.rejection&&$(t,n);}));}},Z=function(t,n,r){var e,o;V?((e=U.createEvent("Event")).promise=n,e.reason=r,e.initEvent(t,!1,!0),a.dispatchEvent(e)):e={promise:n,reason:r},(o=a["on"+t])?o(e):"unhandledrejection"===t&&P("Unhandled promise rejection",r);},$=function(t,n){O.call(a,(function(){var r,e=n.value;if(tt(n)&&(r=_((function(){H?B.emit("unhandledRejection",e,t):Z("unhandledrejection",t,e);})),n.rejection=H||tt(n)?2:1,r.error))throw r.value}));},tt=function(t){return 1!==t.rejection&&!t.parent},nt=function(t,n){O.call(a,(function(){H?B.emit("rejectionHandled",t):Z("rejectionhandled",t,n.value);}));},rt=function(t,n,r,e){return function(o){t(n,r,o,e);}},et=function(t,n,r,e){n.done||(n.done=!0,e&&(n=e),n.value=r,n.state=2,X(t,n,!0));},ot=function(t,n,r,e){if(!n.done){n.done=!0,e&&(n=e);try{if(t===r)throw z("Promise can't be resolved itself");var o=Q(r);o?E((function(){var e={done:!1};try{o.call(r,rt(ot,t,e,n),rt(et,t,e,n));}catch(r){et(t,e,r,n);}})):(n.value=r,n.state=1,X(t,n,!1));}catch(r){et(t,{done:!1},r,n);}}};Y&&(K=function(t){x(this,K,L),m(t),e.call(this);var n=F(this);try{t(rt(ot,this,n),rt(et,this,n));}catch(t){et(this,n,t);}},(e=function(t){N(this,{type:L,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:void 0});}).prototype=v(K.prototype,{then:function(t,n){var r=R(this),e=q(S(this,K));return e.ok="function"!=typeof t||t,e.fail="function"==typeof n&&n,e.domain=H?B.domain:void 0,r.parent=!0,r.reactions.push(e),0!=r.state&&X(this,r,!1),e.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new e,n=F(t);this.promise=t,this.resolve=rt(ot,t,n),this.reject=rt(et,t,n);},M.f=q=function(t){return t===K||t===i?new o(t):G(t)},f||"function"!=typeof p||(c=p.prototype.then,l(p.prototype,"then",(function(t,n){var r=this;return new K((function(t,n){c.call(r,t,n);})).then(t,n)}),{unsafe:!0}),"function"==typeof W&&u({global:!0,enumerable:!0,forced:!0},{fetch:function(t){return T(K,W.apply(a,arguments))}}))),u({global:!0,wrap:!0,forced:Y},{Promise:K}),d(K,L,!1,!0),h(L),i=s(L),u({target:L,stat:!0,forced:Y},{reject:function(t){var n=q(this);return n.reject.call(void 0,t),n.promise}}),u({target:L,stat:!0,forced:f||Y},{resolve:function(t){return T(f&&this===i?K:this,t)}}),u({target:L,stat:!0,forced:J},{all:function(t){var n=this,r=q(n),e=r.resolve,o=r.reject,i=_((function(){var r=m(n.resolve),i=[],c=0,u=1;w(t,(function(t){var f=c++,a=!1;i.push(void 0),u++,r.call(n,t).then((function(t){a||(a=!0,i[f]=t,--u||e(i));}),o);})),--u||e(i);}));return i.error&&o(i.value),r.promise},race:function(t){var n=this,r=q(n),e=r.reject,o=_((function(){var o=m(n.resolve);w(t,(function(t){o.call(n,t).then(r.resolve,e);}));}));return o.error&&e(o.value),r.promise}});},function(t,n,r){var e={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!e.call({1:2},1);n.f=i?function(t){var n=o(this,t);return !!n&&n.enumerable}:e;},function(t,n,r){var e=r(2),o=r(6),i="".split;t.exports=e((function(){return !Object("z").propertyIsEnumerable(0)}))?function(t){return "String"==o(t)?i.call(t,""):Object(t)}:Object;},function(t,n,r){var e=r(4),o=r(54),i=r(18),c=r(8);t.exports=function(t,n){for(var r=o(n),u=c.f,f=i.f,a=0;a<r.length;a++){var s=r[a];e(t,s)||u(t,s,f(n,s));}};},function(t,n,r){var e=r(9),o=r(56),i=r(61),c=r(5);t.exports=e("Reflect","ownKeys")||function(t){var n=o.f(c(t)),r=i.f;return r?n.concat(r(t)):n};},function(t,n,r){var e=r(0);t.exports=e;},function(t,n,r){var e=r(57),o=r(60).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return e(t,o)};},function(t,n,r){var e=r(4),o=r(19),i=r(58).indexOf,c=r(30);t.exports=function(t,n){var r,u=o(t),f=0,a=[];for(r in u)!e(c,r)&&e(u,r)&&a.push(r);for(;n.length>f;)e(u,r=n[f++])&&(~i(a,r)||a.push(r));return a};},function(t,n,r){var e=r(19),o=r(20),i=r(59),c=function(t){return function(n,r,c){var u,f=e(n),a=o(f.length),s=i(c,a);if(t&&r!=r){for(;a>s;)if((u=f[s++])!=u)return !0}else for(;a>s;s++)if((t||s in f)&&f[s]===r)return t||s||0;return !t&&-1}};t.exports={includes:c(!0),indexOf:c(!1)};},function(t,n,r){var e=r(34),o=Math.max,i=Math.min;t.exports=function(t,n){var r=e(t);return r<0?o(r+n,0):i(r,n)};},function(t,n){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"];},function(t,n){n.f=Object.getOwnPropertySymbols;},function(t,n,r){var e=r(0);t.exports=e.Promise;},function(t,n,r){var e=r(11);t.exports=function(t,n,r){for(var o in n)e(t,o,n[o],r);return t};},function(t,n,r){var e=r(8).f,o=r(4),i=r(1)("toStringTag");t.exports=function(t,n,r){t&&!o(t=r?t:t.prototype,i)&&e(t,i,{configurable:!0,value:n});};},function(t,n,r){var e=r(9),o=r(8),i=r(1),c=r(7),u=i("species");t.exports=function(t){var n=e(t),r=o.f;c&&n&&!n[u]&&r(n,u,{configurable:!0,get:function(){return this}});};},function(t,n){t.exports=function(t,n,r){if(!(t instanceof n))throw TypeError("Incorrect "+(r?r+" ":"")+"invocation");return t};},function(t,n,r){var e=r(5),o=r(68),i=r(20),c=r(37),u=r(69),f=r(70),a=function(t,n){this.stopped=t,this.result=n;};(t.exports=function(t,n,r,s,p){var l,v,d,h,y,m,x,g=c(n,r,s?2:1);if(p)l=t;else {if("function"!=typeof(v=u(t)))throw TypeError("Target is not iterable");if(o(v)){for(d=0,h=i(t.length);h>d;d++)if((y=s?g(e(x=t[d])[0],x[1]):g(t[d]))&&y instanceof a)return y;return new a(!1)}l=v.call(t);}for(m=l.next;!(x=m.call(l)).done;)if("object"==typeof(y=f(l,g,x.value,s))&&y&&y instanceof a)return y;return new a(!1)}).stop=function(t){return new a(!0,t)};},function(t,n,r){var e=r(1),o=r(36),i=e("iterator"),c=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||c[i]===t)};},function(t,n,r){var e=r(31),o=r(36),i=r(1)("iterator");t.exports=function(t){if(null!=t)return t[i]||t["@@iterator"]||o[e(t)]};},function(t,n,r){var e=r(5);t.exports=function(t,n,r,o){try{return o?n(e(r)[0],r[1]):n(r)}catch(n){var i=t.return;throw void 0!==i&&e(i.call(t)),n}};},function(t,n,r){var e=r(1)("iterator"),o=!1;try{var i=0,c={next:function(){return {done:!!i++}},return:function(){o=!0;}};c[e]=function(){return this},Array.from(c,(function(){throw 2}));}catch(t){}t.exports=function(t,n){if(!n&&!o)return !1;var r=!1;try{var i={};i[e]=function(){return {next:function(){return {done:r=!0}}}},t(i);}catch(t){}return r};},function(t,n,r){var e=r(5),o=r(12),i=r(1)("species");t.exports=function(t,n){var r,c=e(t).constructor;return void 0===c||null==(r=e(c)[i])?n:o(r)};},function(t,n,r){var e=r(9);t.exports=e("document","documentElement");},function(t,n,r){var e,o,i,c,u,f,a,s,p=r(0),l=r(18).f,v=r(6),d=r(38).set,h=r(39),y=p.MutationObserver||p.WebKitMutationObserver,m=p.process,x=p.Promise,g="process"==v(m),b=l(p,"queueMicrotask"),w=b&&b.value;w||(e=function(){var t,n;for(g&&(t=m.domain)&&t.exit();o;){n=o.fn,o=o.next;try{n();}catch(t){throw o?c():i=void 0,t}}i=void 0,t&&t.enter();},g?c=function(){m.nextTick(e);}:y&&!h?(u=!0,f=document.createTextNode(""),new y(e).observe(f,{characterData:!0}),c=function(){f.data=u=!u;}):x&&x.resolve?(a=x.resolve(void 0),s=a.then,c=function(){s.call(a,e);}):c=function(){d.call(p,e);}),t.exports=w||function(t){var n={fn:t,next:void 0};i&&(i.next=n),o||(o=n,c()),i=n;};},function(t,n,r){var e=r(5),o=r(3),i=r(41);t.exports=function(t,n){if(e(t),o(n)&&n.constructor===t)return n;var r=i.f(t);return (0, r.resolve)(n),r.promise};},function(t,n,r){var e=r(0);t.exports=function(t,n){var r=e.console;r&&r.error&&(1===arguments.length?r.error(t):r.error(t,n));};},function(t,n){t.exports=function(t){try{return {error:!1,value:t()}}catch(t){return {error:!0,value:t}}};},function(t,n,r){var e=r(32),o=r(2),i=r(42),c=r(3),u=r(79),f=r(20),a=r(80),s=r(81),p=r(82),l=r(1),v=r(21),d=l("isConcatSpreadable"),h=v>=51||!o((function(){var t=[];return t[d]=!1,t.concat()[0]!==t})),y=p("concat"),m=function(t){if(!c(t))return !1;var n=t[d];return void 0!==n?!!n:i(t)};e({target:"Array",proto:!0,forced:!h||!y},{concat:function(t){var n,r,e,o,i,c=u(this),p=s(c,0),l=0;for(n=-1,e=arguments.length;n<e;n++)if(m(i=-1===n?c:arguments[n])){if(l+(o=f(i.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(r=0;r<o;r++,l++)r in i&&a(p,l,i[r]);}else {if(l>=9007199254740991)throw TypeError("Maximum allowed index exceeded");a(p,l++,i);}return p.length=l,p}});},function(t,n,r){var e=r(33);t.exports=function(t){return Object(e(t))};},function(t,n,r){var e=r(15),o=r(8),i=r(16);t.exports=function(t,n,r){var c=e(n);c in t?o.f(t,c,i(0,r)):t[c]=r;};},function(t,n,r){var e=r(3),o=r(42),i=r(1)("species");t.exports=function(t,n){var r;return o(t)&&("function"!=typeof(r=t.constructor)||r!==Array&&!o(r.prototype)?e(r)&&null===(r=r[i])&&(r=void 0):r=void 0),new(void 0===r?Array:r)(0===n?0:n)};},function(t,n,r){var e=r(2),o=r(1),i=r(21),c=o("species");t.exports=function(t){return i>=51||!e((function(){var n=[];return (n.constructor={})[c]=function(){return {foo:1}},1!==n[t](Boolean).foo}))};},function(t,n,r){r.r(n),r.d(n,"getEditorNamespace",(function(){return c})),r.d(n,"debounce",(function(){return u}));r(44),r(50);var e,o=r(43),i=r.n(o);function c(t,n){return "CKEDITOR"in window?Promise.resolve(CKEDITOR):t.length<1?Promise.reject(new TypeError("CKEditor URL must be a non-empty string.")):(e||(e=c.scriptLoader(t).then((function(t){return n&&n(t),t}))),e)}c.scriptLoader=function(t){return new Promise((function(n,r){i()(t,(function(t){return e=void 0,t?r(t):window.CKEDITOR?void n(CKEDITOR):r(new Error("Script loaded from editorUrl doesn't provide CKEDITOR namespace."))}));}))};r(78);var u=function(t,n){var r,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(){clearTimeout(r);for(var o=arguments.length,i=new Array(o),c=0;c<o;c++)i[c]=arguments[c];r=setTimeout(t.bind.apply(t,[e].concat(i)),n);}};}]));
    });
    getDefaultExportFromCjs(dist);

    var useEffect$1 = React__namespace.useEffect, useReducer = React__namespace.useReducer, useRef$1 = React__namespace.useRef;
    var defEditorUrl = 'https://cdn.ckeditor.com/4.16.1/standard-all/ckeditor.js';
    var defConfig = {};
    function useCKEditor(_a) {
        var config = _a.config, debug = _a.debug, dispatchEvent = _a.dispatchEvent, _b = _a.subscribeTo, subscribeTo = _b === void 0 ? defaultEvents : _b, editorUrl = _a.editorUrl, element = _a.element, _c = _a.type, type = _c === void 0 ? 'classic' : _c;
        var editorUrlRef = useRef$1(editorUrl || defEditorUrl);
        var subscribeToRef = useRef$1(subscribeTo !== null && subscribeTo !== void 0 ? subscribeTo : defaultEvents);
        var debugRef = useRef$1(debug);
        var dispatchEventRef = useRef$1(dispatchEvent);
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
                                    type: "" + EVENT_PREFIX + evtName,
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
                dist.getEditorNamespace(editorUrlRef.current, onNamespaceLoaded)
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

    var reactIs_development = createCommonjsModule(function (module, exports) {
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
    exports.AsyncMode = AsyncMode;
    exports.ConcurrentMode = ConcurrentMode;
    exports.ContextConsumer = ContextConsumer;
    exports.ContextProvider = ContextProvider;
    exports.Element = Element;
    exports.ForwardRef = ForwardRef;
    exports.Fragment = Fragment;
    exports.Lazy = Lazy;
    exports.Memo = Memo;
    exports.Portal = Portal;
    exports.Profiler = Profiler;
    exports.StrictMode = StrictMode;
    exports.Suspense = Suspense;
    exports.isAsyncMode = isAsyncMode;
    exports.isConcurrentMode = isConcurrentMode;
    exports.isContextConsumer = isContextConsumer;
    exports.isContextProvider = isContextProvider;
    exports.isElement = isElement;
    exports.isForwardRef = isForwardRef;
    exports.isFragment = isFragment;
    exports.isLazy = isLazy;
    exports.isMemo = isMemo;
    exports.isPortal = isPortal;
    exports.isProfiler = isProfiler;
    exports.isStrictMode = isStrictMode;
    exports.isSuspense = isSuspense;
    exports.isValidElementType = isValidElementType;
    exports.typeOf = typeOf;
      })();
    }
    });

    var reactIs = createCommonjsModule(function (module) {
    {
      module.exports = reactIs_development;
    }
    });

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

    var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

    var printWarning$1 = function() {};
    {
      var ReactPropTypesSecret = ReactPropTypesSecret_1;
      var loggedTypeFailures = {};
      var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
      printWarning$1 = function(text) {
        var message = 'Warning: ' + text;
        if (typeof console !== 'undefined') {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {}
      };
    }
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      {
        for (var typeSpecName in typeSpecs) {
          if (has$1(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== 'function') {
                var err = Error(
                  (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                  'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
                );
                err.name = 'Invariant Violation';
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
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
    checkPropTypes.resetWarningCache = function() {
      {
        loggedTypeFailures = {};
      }
    };
    var checkPropTypes_1 = checkPropTypes;

    var has = Function.call.bind(Object.prototype.hasOwnProperty);
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
      function PropTypeError(message) {
        this.message = message;
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
          if (secret !== ReactPropTypesSecret_1) {
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
                  'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
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
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
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
            var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
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
          if (!reactIs.isValidElementType(propValue)) {
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
              var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
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
          for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];
            if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
              return null;
            }
          }
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
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
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (!checker) {
              continue;
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
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
          var allKeys = objectAssign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (!checker) {
              return new PropTypeError(
                'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
                '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
                '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
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
      ReactPropTypes.checkPropTypes = checkPropTypes_1;
      ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };

    var propTypes$1 = createCommonjsModule(function (module) {
    {
      var ReactIs = reactIs;
      var throwOnDirectAccess = true;
      module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
    }
    });

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
        return (React__namespace.createElement("div", { id: name !== null && name !== void 0 ? name : undefined, ref: setElement, style: getStyle(type !== null && type !== void 0 ? type : 'classic', status, style) }, initData));
    }
    var propTypes = __assign({
        config: propTypes$1.object,
        debug: propTypes$1.bool,
        editorUrl: propTypes$1.string,
        initData: propTypes$1.node,
        name: propTypes$1.string,
        readOnly: propTypes$1.bool,
        style: propTypes$1.object,
        type: propTypes$1.oneOf(['classic', 'inline']) }, defaultEvents.reduce(function (acc, key) {
        var _a;
        return __assign(__assign({}, acc), (_a = {}, _a[eventNameToHandlerName(key)] = propTypes$1.func, _a));
    }, {}));
    CKEditor.propTypes = propTypes;

    exports.CKEditor = CKEditor;
    exports.CKEditorEventAction = CKEditorEventAction;
    exports.prefixEventName = prefixEventName;
    exports.registerEditorEventHandler = registerEditorEventHandler;
    exports.stripPrefix = stripPrefix;
    exports.useCKEditor = useCKEditor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
