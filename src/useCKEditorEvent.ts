import * as React from 'react';
import type { CKEditorEventHookProps } from './types';

const { useEffect } = React;

/**
 * `useCKEditorEvent` is a helper hook that registers and unregisters editor's event handlers.
 */
function useCKEditorEvent( { editor, evtName, handler }: CKEditorEventHookProps ) {
	useEffect( () => {
		if ( editor && handler ) {
			editor.on( evtName, handler );
		}

		return () => {
			if ( editor && handler ) {
				editor.removeListener( evtName, handler );
			}
		};
	}, [ editor, evtName, handler ] );
}

export default useCKEditorEvent;
