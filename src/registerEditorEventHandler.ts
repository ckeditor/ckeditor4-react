/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { uniqueName } from './utils';

import {
	CKEditorEventHandler,
	CKEditorEventPayload,
	CKEditorRegisterEventArgs
} from './types';

/**
 * Registers editor event.
 *
 * @param editor instance of editor
 * @param debug toggles debugger
 */
function registerEditorEventHandler( {
	debug,
	editor,
	evtName,
	handler,
	listenerData,
	priority
}: CKEditorRegisterEventArgs ) {
	const handlerId = debug && uniqueName();

	let _handler: CKEditorEventHandler | undefined | null;

	if ( handler ) {
		if ( debug ) {
			_handler = function( args: CKEditorEventPayload ) {
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
		} else {
			_handler = handler;
		}
	}

	if ( editor && _handler ) {
		if ( debug ) {
			console.log( {
				operation: 'register',
				editor: editor.name,
				evtName,
				handlerId
			} );
		}
		editor.on( evtName, _handler, null, listenerData, priority );
	}

	return () => {
		if ( editor && _handler ) {
			if ( debug ) {
				console.log( {
					operation: 'unregister',
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
