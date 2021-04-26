/* eslint-disable react/prop-types */

import React from 'react';
import { useCKEditor, useCKEditorEvent } from 'ckeditor4-react';

const { useCallback, useEffect, useMemo, useState } = React;

function CKEditor( { dispatch, state } ) {
	const [ element, setElement ] = useState( null );
	const { editor } = useCKEditor( { element } );

	const handleChange = useCallback(
		( { editor } ) => {
			dispatch( { type: 'data', payload: editor.getData() } );
		},
		[ dispatch ]
	);

	const handleFocus = useCallback( () => {
		dispatch( { type: 'CKEditor' } );
	}, [ dispatch ] );

	const handleBlur = useCallback( () => {
		dispatch( { type: 'blur' } );
	}, [ dispatch ] );

	/**
	 * Invoking `editor.setData` too often might freeze the browser.
	 */
	const setEditorData = useMemo(
		() =>
			throttle( data => {
				if ( editor ) {
					editor.setData( data );
				}
			}, 150 ),
		[ editor ]
	);

	/**
	 * Sets editor data if it comes from a different source.
	 */
	useEffect( () => {
		if ( state.editorType === 'textarea' ) {
			setEditorData( state.data );
		}
	}, [ setEditorData, state ] );

	/**
	 * Register custom editor events.
	 */
	useCKEditorEvent( {
		editor,
		evtName: 'change',
		handler: handleChange
	} );

	useCKEditorEvent( {
		editor,
		evtName: 'focus',
		handler: handleFocus
	} );

	useCKEditorEvent( {
		editor,
		evtName: 'blur',
		handler: handleBlur
	} );

	return <div ref={setElement} />;
}

function throttle( fn, limit ) {
	let waiting = false;

	return ( ...args ) => {
		if ( !waiting ) {
			fn.apply( this, args );
			waiting = true;
			setTimeout( function() {
				waiting = false;
			}, limit );
		}
	};
}

export default CKEditor;
