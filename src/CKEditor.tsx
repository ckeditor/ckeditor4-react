/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
	eventNameToHandlerName,
	defaultEvents,
	stripPrefix,
	handlerNameToEventName
} from './events';
import useCKEditor from './useCKEditor';
import { camelToKebab, getStyle } from './utils';

import {
	CKEditorEventDispatcher,
	CKEditorEventHandlerProp,
	CKEditorProps,
	CKEditorType
} from './types';

const { useEffect, useRef, useState } = React;

/**
 * `CKEditor` component is a convenient wrapper around low-level hooks.
 * It's useful for simpler use cases. For advanced usage see `useCKEditor` hook.
 */
function CKEditor<EventHandlerProp>( {
	config = {},
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
}: CKEditorProps<EventHandlerProp> ): JSX.Element {
	/**
	 * Uses `useState` instead of `useRef` to force re-render.
	 */
	const [ element, setElement ] = useState<HTMLDivElement | null>( null );

	/**
	 * Ensures referential equality of event handlers.
	 */
	const refs = useRef( handlers );

	const dispatchEvent: CKEditorEventDispatcher = ( { type, payload } ) => {
		const handlerName = eventNameToHandlerName(
			stripPrefix( type )
		) as keyof CKEditorEventHandlerProp;
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

		/**
		 * String nodes are handled by the hook.
		 * `initData` as JSX is handled in the component.
		 */
		initContent: typeof initData === 'string' ? initData : undefined,

		/**
		 * Subscribe only to those events for which handler was supplied.
		 */
		subscribeTo: Object.keys( handlers )
			.filter( key => key.indexOf( 'on' ) === 0 )
			.map( handlerNameToEventName ),
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

	return (
		<div
			id={name ?? undefined}
			ref={setElement}
			style={getStyle( type ?? 'classic', status, style )}
		>
			{typeof initData === 'string' ? null : initData}
		</div>
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
	 * Initial data will be set only once during editor instance's lifecycle.
	 */
	initData: PropTypes.node,

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
	...defaultEvents.reduce( ( acc, key ) => {
		return {
			...acc,
			[ eventNameToHandlerName( key ) ]: PropTypes.func
		};
	}, {} as Record<keyof CKEditorEventHandlerProp, typeof PropTypes.func> )
};

CKEditor.propTypes = propTypes;

export default CKEditor;
