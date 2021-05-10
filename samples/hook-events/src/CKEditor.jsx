/* eslint-disable react/prop-types */

import * as React from 'react';
import { useCKEditor } from 'ckeditor4-react';

const { useState } = React;

/**
 * `useCKEditor` hook supports lifecycle event handlers:
 *
 * - onBeforeLoad
 * - onNamespaceLoaded
 *
 * All other event handlers can be registered with help of `useCKEditorEvent`.
 *
 * Please notice how each handler is wrapped with `useCallback`. This is required to avoid endless render loop.
 *
 */
function CKEditorCmp( { dispatchEvent, uniqueName } ) {
	const [ element, setElement ] = useState();

	useCKEditor( {
		element,
		debug: true,
		dispatchEvent
	} );

	return <div id={uniqueName} ref={setElement} />;
}

export default CKEditorCmp;
