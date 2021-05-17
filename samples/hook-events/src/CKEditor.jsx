/* eslint-disable react/prop-types */

import * as React from 'react';
import { useCKEditor } from 'ckeditor4-react';

const { useState } = React;

/**
 * Pass `dispatch` from `useReducer` in order to listen to editor's events and derive state of your components as needed.
 */
function CKEditorCmp( { dispatchEvent, uniqueName } ) {
	const [ element, setElement ] = useState();

	useCKEditor( {
		element,
		debug: true,
		dispatchEvent,
		subscribeTo: [
			'namespaceLoaded',
			'beforeLoad',
			'instanceReady',
			'focus',
			'blur',
			'loaded',
			'destroy'
		]
	} );

	return <div id={uniqueName} ref={setElement} />;
}

export default CKEditorCmp;
