/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import { getEditorNamespace } from 'ckeditor4-integrations-common';
import useCKEditorEvent from './useCKEditorEvent';
import type {
	CKEditorConfig,
	CKEditorEventHandler,
	CKEditorHookProps,
	CKEditorHookResult,
	CKEditorInstance,
	CKEditorNamespace,
	CKEditorStatus
} from './types';
import registerEditorEventHandler from './registerEditorEventHandler';

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
	onLoaded,
	onNamespaceLoaded,
	type = 'classic'
}: CKEditorHookProps ): CKEditorHookResult {
	const configInit = config || defConfig;
	const editorUrlInit = editorUrl || defEditorUrl;

	/**
	 * Holds current editor instance and editor's enhanced status.
	 */
	const [ { editor, _status }, dispatch ] = useReducer( reducer, {
		editor: undefined,
		_status: 'init'
	} );

	/**
	 * Callback that initializes editor instance if none has been set yet.
	 * A new instance of this callback will be created whenever new url, config, type, or lifecycle callbacks are provided.
	 */
	const initEditor = useCallback( () => {
		if ( element && !editor ) {
			dispatch( { type: 'loading' } );

			getEditorNamespace( editorUrlInit, onNamespaceLoaded )
				.then( ( CKEDITOR: CKEditorNamespace ) => {
					if ( onBeforeLoad ) {
						onBeforeLoad( CKEDITOR );
					}

					const editor = CKEDITOR[
						type === 'inline' ? 'inline' : 'replace'
					]( element, configInit );

					dispatch( {
						type: 'unloaded',
						payload: editor
					} );

					/**
					 * `loaded` event listeners should be registered as soon as possible.
					 * Otherwise we risk missing the event.
					 */

					registerEditorEventHandler( {
						editor,
						evtName: 'loaded',
						handler: () => {
							dispatch( {
								type: 'loaded'
							} );
						}
					} );

					if ( onLoaded ) {
						registerEditorEventHandler( {
							editor,
							evtName: 'loaded',
							handler: onLoaded
						} );
					}
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
		onLoaded,
		onNamespaceLoaded,
		editor,
		type
	] );

	/**
	 * Callback that destroys editor.
	 */
	const destroyEditor = useCallback( () => {
		if ( editor ) {
			editor.destroy();
		}
	}, [ editor ] );

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
		dispatch( { type: 'destroyed' } );
	}, [] );

	/**
	 * Registers handler for `instanceReady` event.
	 */
	useCKEditorEvent( {
		editor,
		evtName: 'instanceReady',
		handler: handleInstanceReady,
		debug,
		priority: -1
	} );

	/**
	 * Registers handler for `destroy` event.
	 */
	useCKEditorEvent( {
		editor,
		evtName: 'destroy',
		handler: handleDestroyed,
		debug,
		priority: -1
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

	return {
		editor,
		status: editor?.status,
		error: _status === 'error',
		loading: _status === 'loading'
	};
}

function reducer( state: HookState, action: HookAction ): HookState {
	switch ( action.type ) {
		case 'init':
			return { ...state, _status: 'init' };
		case 'loading':
			return { ...state, _status: 'loading' };
		case 'unloaded':
			return {
				editor: action.payload,
				_status: 'unloaded'
			};
		case 'loaded':
			return {
				...state,
				_status: 'loaded'
			};
		case 'ready':
			return {
				...state,
				_status: 'ready'
			};
		case 'destroyed':
			return {
				editor: undefined,
				_status: 'destroyed'
			};
		case 'error':
			return {
				editor: undefined,
				_status: 'error'
			};
		default:
			return state;
	}
}

type HookInternalStatus = 'init' | 'loading' | 'error' | CKEditorStatus;

interface HookState {
	editor?: CKEditorInstance;
	_status?: HookInternalStatus;
}

interface HookAction {
	type: HookInternalStatus;
	payload?: CKEditorInstance;
}

export default useCKEditor;
