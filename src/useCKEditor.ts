/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import { getEditorNamespace } from 'ckeditor4-integrations-common';
import registerEditorEventHandler from './registerEditorEventHandler';
import { CKEditorEventAction, events } from './events';

import type {
	CKEditorConfig,
	CKEditorHookProps,
	CKEditorHookResult,
	CKEditorInstance,
	CKEditorNamespace,
	CKEditorStatus
} from './types';

const { useEffect, useReducer, useRef } = React;

const defEditorUrl = 'https://cdn.ckeditor.com/4.16.0/standard-all/ckeditor.js';
const defConfig: CKEditorConfig = {};

/**
 * `useCKEditor` is a low-level hook that holds core logic for editor lifecycle.
 * It is responsible for initializing and destroying editor instance.
 */
function useCKEditor( {
	config,
	debug,
	dispatchEvent,
	subscribeTo,
	editorUrl,
	element,
	type = 'classic'
}: CKEditorHookProps ): CKEditorHookResult {
	/**
	 * Ensures stable value of `editorUrl` between renders.
	 */
	const editorUrlRef = useRef( editorUrl || defEditorUrl );

	/**
	 * Ensures stable value of `subscribeTo` between renders.
	 */
	const subscribeToRef = useRef( subscribeTo );

	/**
	 * Ensures stable value of `debug` between renders.
	 */
	const debugRef = useRef( debug );

	/**
	 * Ensures referential stability of `dispatchEvent` between renders.
	 */
	const dispatchEventRef = useRef( dispatchEvent );

	/**
	 * Ensures referential stability of editor config.
	 */
	const configRef = useRef( config || defConfig );

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
	 * Main effect. It takes care of:
	 * - fetching CKEditor from remote source
	 * - creating new instances of editor
	 * - registering event handlers
	 * - destroying editor instances
	 *
	 * New instance of editor will be created whenever new config is passed, new DOM element is passed, or editor type is changed.
	 */
	useEffect( () => {
		if ( element && !editor ) {
			dispatch( { type: 'loading' } );

			/**
			 * Helper callback that dispatches `namespaceLoaded` event.
			 */
			const onNamespaceLoaded = ( CKEDITOR: CKEditorNamespace ) => {
				dispatchEventRef.current?.( {
					type: CKEditorEventAction.namespaceLoaded,
					payload: CKEDITOR
				} );
			};

			const initEditor = ( CKEDITOR: CKEditorNamespace ) => {
				const isInline = typeRef.current === 'inline';
				const isReadOnly = configRef.current.readOnly;

				/**
				 * Dispatches `beforeLoad` event.
				 */
				dispatchEventRef.current?.( {
					type: CKEditorEventAction.beforeLoad,
					payload: CKEDITOR
				} );

				const editor = CKEDITOR[ isInline ? 'inline' : 'replace' ](
					element,
					configRef.current
				);

				let subscribed = [ ...events ];

				if ( subscribeToRef.current ) {
					subscribed = events.filter(
						evtName =>
							subscribeToRef.current?.indexOf( evtName ) !== -1
					);
				}

				/**
				 * Registers all subscribed events.
				 */
				subscribed.forEach( evtName => {
					registerEditorEventHandler( {
						debug: debugRef.current,
						editor,
						evtName,
						handler: payload => {
							dispatchEventRef.current?.( {
								type: CKEditorEventAction[ evtName ],
								payload
							} );
						}
					} );
				} );

				/**
				 * Registers `loaded` event for the sake of hook lifecycle.
				 */
				registerEditorEventHandler( {
					debug: debugRef.current,
					editor,
					evtName: 'loaded',
					handler: () => {
						dispatch( { type: 'loaded' } );
					},
					priority: -1
				} );

				/**
				 * Registers `instanceReady` event for the sake of hook lifecycle.
				 */
				registerEditorEventHandler( {
					debug: debugRef.current,
					editor,
					evtName: 'instanceReady',
					handler: ( { editor } ) => {
						dispatch( { type: 'ready' } );

						/**
						 * Force editability of inline editor due to an upstream issue (ckeditor/ckeditor4#3866)
						 */
						if ( isInline && !isReadOnly ) {
							editor.setReadOnly( false );
						}
					},
					priority: -1
				} );

				/**
				 * Registers `destroy` event for the sake of hook lifecycle.
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

				dispatch( {
					type: 'unloaded',
					payload: editor
				} );
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

		return () => {
			if ( editor ) {
				editor.destroy();
			}
		};
	}, [ editor, element ] );

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
		case 'unloaded':
			return {
				editor: action.payload,
				hookStatus: 'unloaded'
			};
		case 'loaded':
			return {
				...state,
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
