/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import { getEditorNamespace } from 'ckeditor4-integrations-common';
import registerEditorEventHandler from './registerEditorEventHandler';
import {
	CKEditorEventAction,
	defaultEvents,
	EVENT_PREFIX,
	namespaceEvents
} from './events';

import {
	CKEditorConfig,
	CKEditorDefaultEvent,
	CKEditorHookProps,
	CKEditorHookResult,
	CKEditorInstance,
	CKEditorNamespace,
	CKEditorStatus
} from './types';

const { useEffect, useReducer, useRef } = React;

const defEditorUrl = 'https://cdn.ckeditor.com/4.17.1/standard-all/ckeditor.js';
const defConfig: CKEditorConfig = { on: {}, delayIfDetached: true };

/**
 * `useCKEditor` is a low-level hook that holds core logic for editor lifecycle.
 * It is responsible for initializing and destroying editor instance.
 */
function useCKEditor<EditorEvent extends string>( {
	config,
	debug,
	dispatchEvent,
	subscribeTo = defaultEvents,
	editorUrl,
	element,
	initContent,
	type = 'classic'
}: CKEditorHookProps<EditorEvent | CKEditorDefaultEvent> ): CKEditorHookResult {
	/**
	 * Ensures stable value of `editorUrl` between renders.
	 */
	const editorUrlRef = useRef( editorUrl ?? defEditorUrl );

	/**
	 * Ensures stable value of `subscribeTo` between renders.
	 */
	const subscribeToRef = useRef( subscribeTo ?? defaultEvents );

	/**
	 * Ensures stable value of `debug` between renders.
	 */
	const debugRef = useRef( debug );

	/**
	 * Ensures referential stability of `dispatchEvent` between renders.
	 */
	const dispatchEventRef = useRef( dispatchEvent );

	/**
	 * Ensures referential stability of `initContent`.
	 */
	const initContentRef = useRef( initContent );

	/**
	 * Ensures referential stability of editor config.
	 */
	const configRef = useRef( { ...defConfig, ...config } );

	/**
	 * Ensures referential stability of editor type.
	 */
	const typeRef = useRef( type );

	/**
	 * Holds current editor instance and hook status.
	 */
	const [ { editor, hookStatus }, dispatch ] = useReducer( reducer, {
		editor: undefined,
		hookStatus: 'init'
	} );

	/**
	 * Effect that intializes editor anytime a new `element` instance is provided.
	 * By default, `delayIfDetached` feature is enabled.
	 *
	 * This means that if `element` is no longer present in the DOM during editor instantion,
	 * editor instance will still be created.
	 */
	useEffect( () => {
		if ( element ) {
			dispatch( { type: 'loading' } );

			/**
			 * Helper callback that dispatches `namespaceLoaded` event.
			 * This callback is invoked once for all editor instances.
			 */
			const onNamespaceLoaded = ( CKEDITOR: CKEditorNamespace ) => {
				if ( subscribeToRef.current.indexOf( 'namespaceLoaded' ) !== -1 ) {
					dispatchEventRef.current?.( {
						type: CKEditorEventAction.namespaceLoaded,
						payload: CKEDITOR
					} );
				}
			};

			/**
			 * Initializes editor.
			 *
			 * @param CKEDITOR global namespace
			 */
			const initEditor = ( CKEDITOR: CKEditorNamespace ) => {
				const isInline = typeRef.current === 'inline';

				/**
				 * Dispatches `beforeLoad` event.
				 * This event is dispatched before editor initialization.
				 */
				if ( subscribeToRef.current.indexOf( 'beforeLoad' ) !== -1 ) {
					dispatchEventRef.current?.( {
						type: CKEditorEventAction.beforeLoad,
						payload: CKEDITOR
					} );
				}

				CKEDITOR[ isInline ? 'inline' : 'replace' ](
					element,
					configRef.current
				);
			};

			getEditorNamespace( editorUrlRef.current, onNamespaceLoaded )
				.then( initEditor )
				.catch( ( error: Error ) => {
					if ( process.env.NODE_ENV !== 'test' ) {
						console.error( error );
					}
					dispatch( { type: 'error' } );
				} );
		}
	}, [ element ] );

	/**
	 * Effect that is responsible for setting `editor` instance
	 * and registering event callbacks.
	 */
	useEffect( () => {
		configRef.current.on.loaded = ( payload: any ) => {
			const editor = payload.editor as CKEditorInstance;
			const isInline = typeRef.current === 'inline';
			const isReadOnly = configRef.current.readOnly;

			dispatch( { type: 'loaded', payload: editor } );

			/**
			 * Dispatches `loaded` event. It's handled as a special case, similarly to namespace events.
			 */
			if ( subscribeToRef.current.indexOf( 'loaded' ) !== -1 ) {
				dispatchEventRef.current?.( {
					type: CKEditorEventAction.loaded,
					payload
				} );
			}

			/**
			 * Gets all subscribed events other than namespace events and `loaded` event.
			 */
			const subscribedEditorEvents = subscribeToRef.current.filter(
				( evtName: any ) =>
					namespaceEvents.indexOf( evtName ) === -1 &&
					evtName !== 'loaded'
			);

			/**
			 * Registers all subscribed events.
			 */
			subscribedEditorEvents.forEach( evtName => {
				registerEditorEventHandler( {
					debug: debugRef.current,
					editor,
					evtName,
					handler: payload => {
						dispatchEventRef.current?.( {
							type: `${ EVENT_PREFIX }${ evtName }`,
							payload
						} );
					}
				} );
			} );

			/**
			 * Registers internal handler for `instanceReady` event.
			 */
			registerEditorEventHandler( {
				debug: debugRef.current,
				editor,
				evtName: 'instanceReady',
				handler: ( { editor } ) => {
					dispatch( { type: 'ready' } );

					/**
					 * Forces editability of inline editor due to an upstream issue (ckeditor/ckeditor4#3866)
					 */
					if ( isInline && !isReadOnly ) {
						editor.setReadOnly( false );
					}

					/**
					 * Sets initial content of editor's instance if provided.
					 */
					if ( initContentRef.current ) {
						editor.setData( initContentRef.current, {
							/**
							 * Prevents undo icon flickering.
							 */
							noSnapshot: true,

							/**
							 * Resets undo stack.
							 */
							callback: () => {
								editor.resetUndo();
							}
						} );
					}
				},
				priority: -1
			} );

			/**
			 * Registers internal handler for `destroy` event.
			 */
			registerEditorEventHandler( {
				debug: debugRef.current,
				editor,
				evtName: 'destroy',
				handler: () => {
					dispatch( { type: 'destroyed' } );
				},
				priority: -1
			} );
		};
	}, [] );

	/**
	 * Whenever a new instance of the editor is created, the old one is destroyed.
	 */
	useEffect( () => {
		return () => {
			if ( editor ) {
				editor.destroy();
			}
		};
	}, [ editor ] );

	return {
		editor,
		status: editor?.status,
		error: hookStatus === 'error',
		loading: hookStatus === 'loading'
	};
}

function reducer( state: HookState, action: HookAction ): HookState {
	switch ( action.type ) {
		case 'init':
			return { ...state, hookStatus: 'init' };
		case 'loading':
			return { ...state, hookStatus: 'loading' };
		case 'loaded':
			return {
				editor: action.payload,
				hookStatus: 'loaded'
			};
		case 'ready':
			return {
				...state,
				hookStatus: 'ready'
			};
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

type HookInternalStatus = 'init' | 'loading' | 'error' | CKEditorStatus;

interface HookState {
	editor?: CKEditorInstance;
	hookStatus?: HookInternalStatus;
}

interface HookAction {
	type: HookInternalStatus;
	payload?: CKEditorInstance;
}

export default useCKEditor;
