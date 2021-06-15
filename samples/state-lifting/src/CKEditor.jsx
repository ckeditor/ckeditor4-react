/* eslint-disable react/prop-types */

import React from 'react';
import { useCKEditor } from 'ckeditor4-react';

const { useEffect, useMemo, useState } = React;

function CKEditor( { dispatch, state } ) {
	const [ element, setElement ] = useState();

	const { editor } = useCKEditor( {
		element,
		debug: true,
		dispatchEvent: dispatch,
		subscribeTo: [ 'blur', 'focus', 'change' ]
	} );

	/**
	 * Invoking `editor.setData` too often might freeze the browser.
	 */
	const setEditorData = useMemo( () => {
		if ( editor ) {
			/* eslint-disable-next-line */
			return new CKEDITOR.tools.buffers.throttle( 500, data => {
				if ( editor ) {
					editor.setData( data );
				}
			} ).input;
		}
	}, [ editor ] );

	/**
	 * Sets editor data if it comes from a different source.
	 */
	useEffect( () => {
		if ( state.currentEditor === 'textarea' && setEditorData ) {
			setEditorData( state.data );
		}
	}, [ setEditorData, state ] );

	return <div ref={setElement} />;
}

export default CKEditor;
