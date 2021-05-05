/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import type { CKEditorEventHookProps } from './types';
import registerEditorEventHandler from './registerEditorEventHandler';

const { useEffect } = React;

/**
 * `useCKEditorEvent` is a helper hook that registers and unregisters editor's event handlers.
 */
function useCKEditorEvent( {
	editor,
	evtName,
	debug,
	handler,
	listenerData,
	priority
}: CKEditorEventHookProps ) {
	useEffect( () => {
		const unregister = registerEditorEventHandler( {
			editor,
			evtName,
			debug,
			handler,
			listenerData,
			priority
		} );

		return unregister;
	}, [ editor, evtName, debug, handler, listenerData, priority ] );
}

export default useCKEditorEvent;
