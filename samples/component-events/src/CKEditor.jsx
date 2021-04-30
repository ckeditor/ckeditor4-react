/* eslint-disable react/prop-types */

import * as React from 'react';
import { CKEditor, useCKEditorEvent } from 'ckeditor4-react';

const { useCallback, useState } = React;

function CKEditorCmp( { pushEvent, uniqueName } ) {
	const [ editor, setEditor ] = useState( undefined );

	/**
	 * `CKEditor` component supports lifecycle event handlers:
	 *
	 * - onBeforeLoad
	 * - onDestroyed
	 * - onInstanceReady
	 * - onLoaded
	 * - onNamespaceLoaded
	 *
	 */
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

	/**
	 * Custom events can be registered with the help of `useCKEditorEvent` hook.
	 */
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
