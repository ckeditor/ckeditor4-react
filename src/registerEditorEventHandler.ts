/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { uniqueName } from './utils';

import {
	CKEditorDefaultEvent,
	CKEditorEventHandler,
	CKEditorEventPayload,
	CKEditorRegisterEventArgs
} from './types';

/**
 * Registers editor event. Allows to toggle debugging mode.
 *
 * @param editor instance of editor
 * @param debug toggles debugger
 */
function registerEditorEventHandler<EditorEvent>( {
	debug,
	editor,
	evtName,
	handler,
	listenerData,
	priority
}: CKEditorRegisterEventArgs<EditorEvent | CKEditorDefaultEvent> ) {
	const handlerId = debug && uniqueName();

	let _handler: CKEditorEventHandler<EditorEvent> = handler;

	if ( debug ) {
		_handler = function( args: CKEditorEventPayload<EditorEvent> ) {
			console.log( {
				operation: 'invoke',
				editor: editor.name,
				evtName,
				handlerId,
				data: args.data,
				listenerData: args.listenerData
			} );
			handler( args );
		};
	}

	if ( debug ) {
		console.log( {
			operation: 'register',
			editor: editor.name,
			evtName,
			handlerId
		} );
	}

	editor.on( evtName, _handler, null, listenerData, priority );

	return () => {
		if ( debug ) {
			console.log( {
				operation: 'unregister',
				editor: editor.name,
				evtName,
				handlerId
			} );
		}

		editor.removeListener( evtName, _handler );
	};
}

export default registerEditorEventHandler;
