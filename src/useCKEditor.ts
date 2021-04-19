/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import { getEditorNamespace } from 'ckeditor4-integrations-common';

const { useState, useEffect } = React;

const defaultEditorUrl =
	'https://cdn.ckeditor.com/4.16.0/standard-all/ckeditor.js';

function useCKEditor( { element, editorUrl }: CKEditorHookArgs ) {
	const [ editor, setEditor ] = useState<any>( undefined );
	const [ editorState, setEditorState ] = useState<CKEditorState>( 'loading' );

	useEffect( () => {
		if ( element && !editor ) {
			getEditorNamespace( editorUrl || defaultEditorUrl )
				.then( ( CKEDITOR: any ) => {
					const editor = CKEDITOR.replace( element );
					setEditor( editor );
					setEditorState( 'unloaded' );

					editor.on( 'loaded', () => {
						setEditorState( 'loaded' );
					} );

					editor.on( 'instanceReady', () => {
						setEditorState( 'ready' );
					} );
				} )
				.catch( console.error );
		}

		return () => {
			if ( editor ) {
				editor.destroy();
			}
		};
	}, [ editor, element ] );

	return { editor, editorState };
}

export default useCKEditor;

export interface CKEditorHookArgs {
	element: HTMLElement | null;
	editorUrl?: string;
}

export type CKEditorState = 'loading' | 'unloaded' | 'loaded' | 'ready';
