/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

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
	debug,
	editor,
	evtName,
	handler,
	listenerData,
	priority
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
			editor.on( evtName, _handler, null, listenerData, priority );
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
	}, [ editor, evtName, debug, handler, listenerData, priority ] );
}

export default useCKEditorEvent;
