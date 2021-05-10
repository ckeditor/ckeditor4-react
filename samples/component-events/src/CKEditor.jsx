/* eslint-disable react/prop-types */

import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';

/**
 * `CKEditor` component accepts handlers for all editor events, e.g. `instanceReady` -> `onInstanceReady`.
 *
 * `CKEditor` component ensures referential equality between renders for event handlers.
 * This means that first value of an event handler will be memoized and used through the lifecycle of `CKEditor` component.
 * If this behavior is not expected, then use `useCKEditor` hook directly.
 */
function CKEditorCmp( { pushEvent, uniqueName } ) {
	const handleBeforeLoad = () => {
		pushEvent( 'beforeLoad' );
	};

	const handleDestroyed = () => {
		pushEvent( 'destroy' );
	};

	const handleInstanceReady = () => {
		pushEvent( 'instanceReady' );
	};

	const handleLoaded = () => {
		pushEvent( 'loaded' );
	};

	const handleNamespaceLoaded = () => {
		pushEvent( 'namespaceLoaded' );
	};

	const handleBlur = () => {
		pushEvent( 'blur' );
	};

	const handleFocus = () => {
		pushEvent( 'focus' );
	};

	return (
		<CKEditor
			debug={true}
			name={uniqueName}
			onBeforeLoad={handleBeforeLoad}
			onDestroy={handleDestroyed}
			onInstanceReady={handleInstanceReady}
			onNamespaceLoaded={handleNamespaceLoaded}
			onLoaded={handleLoaded}
			onFocus={handleFocus}
			onBlur={handleBlur}
		/>
	);
}

export default CKEditorCmp;
