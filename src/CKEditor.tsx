/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { eventNameToHandlerName, CKEditorEventAction } from './events';
import registerEditorEventHandler from './registerEditorEventHandler';
import useCKEditor from './useCKEditor';
import { camelToKebab } from './utils';

import type {
	CKEditorEventDispatcher,
	CKEditorEventHandlerName,
	CKEditorEventHandlersProps,
	CKEditorProps,
	CKEditorType
} from './types';

const { useEffect, useRef, useState } = React;

/**
 * `CKEditor` component is a convenient wrapper around low-level hooks.
 * It's useful for simpler use cases. For advanced usage see `useCKEditor` hook.
 */
function CKEditor( {
	config,
	debug,
	editorUrl,
	initData,
	name,
	readOnly,
	style,
	type,

	/**
	 * `handlers` object must contain event handlers props only!
	 */
	...handlers
}: CKEditorProps ): JSX.Element {
	/**
	 * Uses `useState` instead of `useRef` to force re-render.
	 */
	const [ element, setElement ] = useState<HTMLDivElement | null>( null );

	/**
	 * Ensures referential equality of event handlers.
	 */
	const refs = useRef<CKEditorEventHandlersProps>( handlers );

	const dispatchEvent: CKEditorEventDispatcher = ( { type, payload } ) => {
		const handlerName = eventNameToHandlerName( type );
		const handler = refs.current[ handlerName ];

		if ( handler ) {
			handler( payload );
		}
	};

	/**
	 * `readOnly` prop takes precedence over `config.readOnly`.
	 */
	if ( config && typeof readOnly === 'boolean' ) {
		config.readOnly = readOnly;
	}

	const { editor, status } = useCKEditor( {
		config,
		dispatchEvent,
		debug,
		editorUrl,
		element,
		type
	} );

	/**
	 * Sets and updates styles.
	 */
	useEffect( () => {
		const canSetStyles =
			type !== 'inline' &&
			editor &&
			( status === 'loaded' || status === 'ready' );

		if ( style && canSetStyles ) {
			editor.container.setStyles( style );
		}

		return () => {
			if ( style && canSetStyles ) {
				Object.keys( style )
					.map( camelToKebab )
					.forEach( styleName => {
						editor.container.removeStyle( styleName );
					} );
			}
		};
	}, [ editor, status, style, type ] );

	/**
	 * Toggles read-only mode on runtime.
	 */
	useEffect( () => {
		if ( editor && status === 'ready' && typeof readOnly === 'boolean' ) {
			editor.setReadOnly( readOnly );
		}
	}, [ editor, status, readOnly ] );

	/**
	 * Registers listener to `instanceReady` event with high priority.
	 * `initData` can be set only once during lifecycle of an editor instance.
	 */
	useEffect( () => {
		if ( initData ) {
			return registerEditorEventHandler( {
				debug,
				editor,
				evtName: 'instanceReady',
				handler: ( { editor } ) => {
					editor.setData( initData );
				},
				priority: -1
			} );
		}
	}, [ debug, editor, initData ] );

	return (
		<div
			id={name ?? undefined}
			ref={setElement}
			style={style ?? undefined}
		/>
	);
}

const propTypes = {
	/**
	 * Config object passed to editor's constructor.
	 *
	 * A new instance of editor will be created everytime a new instance of `config` is provided.
	 * If this is not expected behavior then ensure referential equality of `config` between renders.
	 *
	 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html
	 */
	config: PropTypes.object,

	/**
	 * Toggles debugging. Logs info related to editor lifecycle events.
	 */
	debug: PropTypes.bool,

	/**
	 * Url with editor's source code. Uses newest version from https://cdn.ckeditor.com domain by default.
	 */
	editorUrl: PropTypes.string,

	/**
	 * Initial data. It will be passed to editor once it's in `ready` state.
	 *
	 * Initial data will be set only once during editor instance's lifecycle.
	 *
	 */
	initData: PropTypes.string,

	/**
	 * A unique identifier of editor instance.
	 *
	 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#property-name
	 */
	name: PropTypes.string,

	/**
	 * This prop has two-fold effect:
	 *
	 * - Serves as a convenience prop to start editor in read-only mode.
	 *   It's an equivalent of passing `{ readOnly: true }` in `config` but takes precedence over it.
	 *
	 * - Allows to toggle editor's `read-only` mode on runtime.
	 *
	 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-readOnly
	 */
	readOnly: PropTypes.bool,

	/**
	 * Styles passed to the root element.
	 */
	style: PropTypes.object,

	/**
	 * Setups editor in either `classic` or `inline` mode.
	 *
	 * A new instance of editor will be created everytime a new value of `type` is provided.
	 * If this is not expected behavior then ensure stable value of `type` between renders.
	 *
	 * See:
	 * - https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-replace
	 * - https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-inline
	 */
	type: PropTypes.oneOf<CKEditorType>( [ 'classic', 'inline' ] ),

	/**
	 * Event handlers.
	 *
	 * Each event handler's name corresponds to its respective event, e.g. `instanceReady` -> `onInstanceReady`.
	 */
	...Object.entries( CKEditorEventAction ).reduce( ( acc, [ , value ] ) => {
		return { ...acc, [ eventNameToHandlerName( value ) ]: PropTypes.func };
	}, {} as Record<CKEditorEventHandlerName, typeof PropTypes.func> )
};

CKEditor.propTypes = propTypes;

export default CKEditor;
