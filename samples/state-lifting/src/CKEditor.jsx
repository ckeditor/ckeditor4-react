/* eslint-disable react/prop-types */

import React from 'react';
import throttle from 'lodash/throttle';
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
	const setEditorData = useMemo(
		() =>
			throttle(
				data => {
					if ( editor ) {
						editor.setData( data );
					}
				},
				200,
				{ leading: true, trailing: true }
			),
		[ editor ]
	);

	/**
	 * Sets editor data if it comes from a different source.
	 */
	useEffect( () => {
		if ( state.currentEditor === 'textarea' ) {
			setEditorData( state.data );
		}
	}, [ setEditorData, state ] );

	return <div ref={setElement} />;
}

export default CKEditor;
