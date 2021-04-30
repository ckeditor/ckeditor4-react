import * as React from 'react';
import { uniqueName } from './utils';
import type {
	CKEditorEventHandler,
	CKEditorEventHookProps,
	CKEditorEventPayload
} from './types';

const { useEffect } = React;

/**
 * `useCKEditorEvent` is a helper hook that registers and unregisters editor's event handlers.
 */
function useCKEditorEvent( {
	editor,
	debug,
	evtName,
	handler
}: CKEditorEventHookProps ) {
	useEffect( () => {
		const handlerId = uniqueName();

		let _handler: CKEditorEventHandler | undefined | null;

		if ( handler ) {
			if ( debug ) {
				_handler = function( args: CKEditorEventPayload ) {
					console.log( 'Invoked: ', {
						editor: editor.name,
						evtName,
						handlerId,
						data: args.data
					} );
					handler( args );
				};
			} else {
				_handler = handler;
			}
		}

		if ( editor && _handler ) {
			editor.on( evtName, _handler );
		}

		return () => {
			if ( editor && _handler ) {
				if ( debug ) {
					console.log( 'Removed: ', {
						editor: editor.name,
						evtName,
						handlerId
					} );
				}
				editor.removeListener( evtName, _handler );
			}
		};
	}, [ editor, evtName, debug, handler ] );
}

export default useCKEditorEvent;
