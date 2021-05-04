/* eslint-disable react/prop-types */

import * as React from 'react';
import { CKEditor, useCKEditorEvent } from 'ckeditor4-react';

const { useCallback, useState } = React;

/**
 * `CKEditor` component supports lifecycle event handlers:
 *
 * - onBeforeLoad
 * - onDestroyed
 * - onInstanceReady
 * - onLoaded
 * - onNamespaceLoaded
 *
 * All other event handlers can be registered with help of `useCKEditorEvent`.
 *
 * Please notice how each handler is wrapped with `useCallback`. This is required to avoid endless render loop.
 *
 */
function CKEditorCmp( { pushEvent, uniqueName } ) {
	const [ editor, setEditor ] = useState( undefined );

	const handleBeforeLoad = useCallback( () => {
		pushEvent( 'beforeLoad' );
	}, [ pushEvent ] );

	const handleDestroyed = useCallback( () => {
		pushEvent( 'destroy' );
		setEditor( undefined );
	}, [ pushEvent ] );

	const handleInstanceReady = useCallback(
		( { editor } ) => {
			pushEvent( 'instanceReady' );
			setEditor( editor );
		},
		[ pushEvent ]
	);

	const handleLoaded = useCallback( () => {
		pushEvent( 'loaded' );
	}, [ pushEvent ] );

	const handleNamespaceLoaded = useCallback( () => {
		pushEvent( 'namespaceLoaded' );
	}, [ pushEvent ] );

	const handleBlur = useCallback( () => {
		pushEvent( 'blur' );
	}, [ pushEvent ] );

	const handleFocus = useCallback( () => {
		pushEvent( 'focus' );
	}, [ pushEvent ] );

	useCKEditorEvent( {
		editor,
		handler: handleFocus,
		evtName: 'focus',
		debug: true
	} );

	useCKEditorEvent( {
		editor,
		handler: handleBlur,
		evtName: 'blur',
		debug: true
	} );

	return (
		<CKEditor
			debug={true}
			name={uniqueName}
			onBeforeLoad={handleBeforeLoad}
			onDestroyed={handleDestroyed}
			onInstanceReady={handleInstanceReady}
			onNamespaceLoaded={handleNamespaceLoaded}
			onLoaded={handleLoaded}
		/>
	);
}

export default CKEditorCmp;
