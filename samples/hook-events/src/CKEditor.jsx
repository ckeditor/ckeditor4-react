/* eslint-disable react/prop-types */

import * as React from 'react';
import { useCKEditor, useCKEditorEvent } from 'ckeditor4-react';

const { useCallback, useState } = React;

function CKEditor( { pushEvent, uniqueName } ) {
	const [ element, setElement ] = useState();

	const handleNamespaceLoaded = useCallback( () => {
		pushEvent( 'namespaceLoaded' );
	}, [ pushEvent ] );

	const handleBeforeLoad = useCallback( () => {
		pushEvent( 'beforeLoad' );
	}, [ pushEvent ] );

	const { editor } = useCKEditor( {
		element,
		debug: true,
		onNamespaceLoaded: handleNamespaceLoaded,
		onBeforeLoad: handleBeforeLoad
	} );

	/**
	 * Custom events can be registered with the help of `useCKEditorEvent` hook.
	 */
	const handleDestroyed = useCallback( () => {
		pushEvent( 'destroy' );
	}, [ pushEvent ] );

	const handleInstanceReady = useCallback( () => {
		pushEvent( 'instanceReady' );
	}, [ pushEvent ] );

	const handleLoaded = useCallback( () => {
		pushEvent( 'loaded' );
	}, [ pushEvent ] );

	const handleBlur = useCallback( () => {
		pushEvent( 'blur' );
	}, [ pushEvent ] );

	const handleFocus = useCallback( () => {
		pushEvent( 'focus' );
	}, [ pushEvent ] );

	useCKEditorEvent( {
		editor,
		handler: handleDestroyed,
		evtName: 'destroy',
		debug: true
	} );

	useCKEditorEvent( {
		editor,
		handler: handleInstanceReady,
		evtName: 'instanceReady',
		debug: true
	} );

	useCKEditorEvent( {
		editor,
		handler: handleLoaded,
		evtName: 'loaded',
		debug: true
	} );

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

	return <div id={uniqueName} ref={setElement} />;
}

export default CKEditor;
