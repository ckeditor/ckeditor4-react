/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import { getEditorNamespace } from 'ckeditor4-integrations-common';
import type {
	CKEditorConfig,
	CKEditorEventHandler,
	CKEditorHookProps,
	CKEditorHookResult,
	CKEditorInstance,
	CKEditorNamespace,
	CKEditorStatus
} from './types';
import useCKEditorEvent from './useCKEditorEvent';

const { useCallback, useEffect, useReducer } = React;

const defEditorUrl = 'https://cdn.ckeditor.com/4.16.0/standard-all/ckeditor.js';
const defConfig: CKEditorConfig = {};

/**
 * `useCKEditor` is a low-level hook that holds core logic for editor lifecycle.
 * It is responsible for initializing and destroying editor instance.
 */
function useCKEditor( {
	config,
	debug,
	editorUrl,
	element,
	onBeforeLoad,
	onNamespaceLoaded,
	type = 'classic'
}: CKEditorHookProps ): CKEditorHookResult {
	const configInit = config || defConfig;
	const editorUrlInit = editorUrl || defEditorUrl;

	/**
	 * Holds current editor instance and editor's enhanced status.
	 */
	const [ state, dispatch ] = useReducer( reducer, {
		editor: undefined,
		status: 'init'
	} );

	/**
	 * Callback that initializes editor instance if none has been set yet.
	 * A new instance of this callback will be created whenever new url, config, type, or lifecycle callbacks are provided.
	 */
	const initEditor = useCallback( () => {
		if ( element && !state.editor ) {
			dispatch( { type: 'loading' } );

			getEditorNamespace( editorUrlInit, onNamespaceLoaded )
				.then( ( CKEDITOR: CKEditorNamespace ) => {
					if ( onBeforeLoad ) {
						onBeforeLoad( CKEDITOR );
					}

					dispatch( {
						type: 'unloaded',
						payload: CKEDITOR[
							type === 'inline' ? 'inline' : 'replace'
						]( element, configInit )
					} );
				} )
				.catch( ( error: Error ) => {
					if ( process.env.NODE_ENV !== 'test' ) {
						console.error( error );
					}
					dispatch( { type: 'error' } );
				} );
		}
	}, [
		configInit,
		editorUrlInit,
		element,
		onBeforeLoad,
		onNamespaceLoaded,
		state.editor,
		type
	] );

	/**
	 * Callback that destroys editor.
	 */
	const destroyEditor = useCallback( () => {
		if ( state.editor ) {
			state.editor.destroy();
		}
	}, [ state.editor ] );

	/**
	 * Handler for `loaded` event.
	 */
	const handleLoaded = useCallback<CKEditorEventHandler>( () => {
		dispatch( { type: 'loaded' } );
	}, [] );

	const isInline = type === 'inline';
	const isReadOnly = configInit.readOnly;

	/**
	 * Handler for `instanceReady` event.
	 */
	const handleInstanceReady = useCallback<CKEditorEventHandler>(
		( { editor } ) => {
			dispatch( { type: 'ready' } );

			/**
			 * Force editability of inline editor due to an upstream issue (ckeditor/ckeditor4#3866)
			 */
			if ( isInline && !isReadOnly ) {
				editor.setReadOnly( false );
			}
		},
		[ isInline, isReadOnly ]
	);

	/**
	 * Handler for `destroy` event.
	 */
	const handleDestroyed = useCallback<CKEditorEventHandler>( () => {
		dispatch( { type: 'destroy' } );
	}, [] );

	/**
	 * Registers handler for `loaded` event.
	 */
	useCKEditorEvent( {
		editor: state.editor,
		evtName: 'loaded',
		handler: handleLoaded,
		debug
	} );

	/**
	 * Registers handler for `instanceReady` event.
	 */
	useCKEditorEvent( {
		editor: state.editor,
		evtName: 'instanceReady',
		handler: handleInstanceReady,
		debug
	} );

	/**
	 * Registers handler for `destroy` event.
	 */
	useCKEditorEvent( {
		editor: state.editor,
		evtName: 'destroy',
		handler: handleDestroyed,
		debug
	} );

	/**
	 * Whenever one of the lifecycle methods change, effect is performed, for example:
	 * - new instance of `initEditor` is created due to a fresh `config`, `editorUrl`, or change in editor type
	 * - new instance of `initEditor` is created due to new element being supplied
	 * - new instance of `destroyEditor` is created due to new editor's instance creation
	 */
	useEffect( () => {
		initEditor();
		return destroyEditor;
	}, [ destroyEditor, initEditor ] );

	return state;
}

function reducer( state: HookState, action: HookAction ): HookState {
	switch ( action.type ) {
		case 'init':
			return { editor: undefined, status: 'init' };
		case 'loading':
			return { editor: undefined, status: 'loading' };
		case 'unloaded':
			return {
				editor: action.payload,
				status: 'unloaded'
			};
		case 'loaded':
			return {
				...state,
				status: 'loaded'
			};
		case 'ready':
			return {
				...state,
				status: 'ready'
			};
		case 'destroy':
			return {
				editor: undefined,
				status: 'destroyed'
			};
		case 'error':
			return {
				editor: undefined,
				status: 'error'
			};
		default:
			return state;
	}
}

interface HookState {
	editor?: CKEditorInstance;
	status: CKEditorStatus;
}

interface HookAction {
	type:
		| 'init'
		| 'loading'
		| 'unloaded'
		| 'loaded'
		| 'ready'
		| 'destroy'
		| 'error';
	payload?: CKEditorInstance;
}

export default useCKEditor;
