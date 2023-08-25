/* eslint-disable react/prop-types */

import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';

/**
 * `CKEditor` component accepts handlers for all editor events, e.g. `instanceReady` -> `onInstanceReady`.
 *
 * `CKEditor` component ensures referential equality between renders for event handlers.
 * This means that first value of an event handler will be memoized and used through the lifecycle of `CKEditor` component.
 */
function CKEditorCmp( { pushEvent, uniqueName } ) {
	const handleBeforeLoad = () => {
		pushEvent( 'beforeLoad', '--' );
	};

	const handleDestroyed = () => {
		pushEvent( 'destroy', uniqueName );
	};

	const handleInstanceReady = () => {
		pushEvent( 'instanceReady', uniqueName );
	};

	const handleLoaded = () => {
		pushEvent( 'loaded', uniqueName );
	};

	const handleNamespaceLoaded = () => {
		pushEvent( 'namespaceLoaded', '--' );
	};

	const handleBlur = () => {
		pushEvent( 'blur', uniqueName );
	};

	const handleFocus = () => {
		pushEvent( 'focus', uniqueName );
	};

	const handleCustomEvent = () => {
		pushEvent( 'myCustomEvent', uniqueName );
	};

	return (
		<div>
			{ /* Remember to add the license key to the CKEditor 4 configuration:
			https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-licenseKey*/}
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
				onMyCustomEvent={handleCustomEvent}
			/>
		</div>
	);
}

export default CKEditorCmp;
