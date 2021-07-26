/* eslint-disable react/prop-types */

import * as React from 'react';
import { useCKEditor } from 'ckeditor4-react';

const { useEffect, useState } = React;

/**
 * Custom `CKEditor` component built on top of `useCKEditor` hook.
 */
function CKEditor( { config, readOnly, type, style, name } ) {
	const [ element, setElement ] = useState();

	/**
	 * Sets initial value of `readOnly`.
	 */
	if ( config && readOnly ) {
		config.readOnly = readOnly;
	}

	const { editor, status } = useCKEditor( {
		config,
		element,
		type
	} );

	/**
	 * Toggles `readOnly` on runtime.
	 */
	useEffect( () => {
		if ( editor && editor.status === 'ready' ) {
			editor.setReadOnly( readOnly );
		}
	}, [ editor, readOnly ] );

	/**
	 * Updates editor container's style on runtime.
	 */
	useEffect( () => {
		if ( editor && status === 'ready' ) {
			editor.container.setStyles( style );
		}
	}, [ editor, status, style ] );

	return (
		<div
			id={name}
			style={status !== 'ready' ? { visibility: 'hidden' } : style}
			ref={setElement}
		>
			<p>{`Hello from ${ type } editor!`}</p>
		</div>
	);
}

export default CKEditor;
