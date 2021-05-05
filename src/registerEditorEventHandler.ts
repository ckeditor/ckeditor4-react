/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
	CKEditorEventHandler,
	CKEditorEventPayload,
	CKEditorRegisterEventArgs
} from './types';
import { uniqueName } from './utils';

/**
 * Registers editor event.
 *
 * @param editor instance of editor
 * @param debug turns on debugger
 */
function registerEditorEventHandler( {
	debug,
	editor,
	evtName,
	handler,
	listenerData,
	priority
}: CKEditorRegisterEventArgs ) {
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
}

export default registerEditorEventHandler;
