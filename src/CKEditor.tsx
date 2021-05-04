/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import useCKEditor from './useCKEditor';
import useCKEditorEvent from './useCKEditorEvent';
import type {
	CKEditorEventHandler,
	CKEditorProps,
	CKEditorType
} from './types';
import { camelToKebab } from './utils';

const { useCallback, useEffect, useState } = React;

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
	onBeforeLoad,
	onDestroyed,
	onInstanceReady,
	onLoaded,
	onNamespaceLoaded,
	readOnly,
	style,
	type
}: CKEditorProps ): JSX.Element {
	/**
	 * Use `useState` instead of `useRef` to force re-render.
	 */
	const [ element, setElement ] = useState<HTMLDivElement | null>( null );

	/**
	 * `readOnly` prop takes precedence over `config.readOnly`.
	 */
	if ( config && typeof readOnly === 'boolean' ) {
		config.readOnly = readOnly;
	}

	const { editor, status } = useCKEditor( {
		config,
		debug,
		editorUrl,
		element,
		onBeforeLoad,
		onLoaded,
		onNamespaceLoaded,
		type
	} );

	const handleInitData = useCallback<CKEditorEventHandler>(
		( { editor } ) => {
			if ( initData ) {
				editor.setData( initData );
			}
		},
		[ initData ]
	);

	/**
	 * Toggles styles.
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
	 * Passes custom handler for `destroy` event.
	 */
	useCKEditorEvent( {
		handler: onDestroyed,
		evtName: 'destroy',
		editor,
		debug
	} );

	/**
	 * Passes custom handler for `instanceReady` event.
	 */
	useCKEditorEvent( {
		handler: onInstanceReady,
		evtName: 'instanceReady',
		editor,
		debug
	} );

	/**
	 * Sets init data.
	 */
	useCKEditorEvent( {
		handler: handleInitData,
		evtName: 'instanceReady',
		editor,
		debug,
		priority: 0
	} );

	return (
		<div
			style={style ?? undefined}
			id={name ?? undefined}
			ref={setElement}
		/>
	);
}

const propTypes = {
	/**
	 * Config object passed to editor's constructor.
	 *
	 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html
	 */
	config: PropTypes.object,

	/**
	 * Turns on debugging. Logs info related to editor lifecycle events.
	 */
	debug: PropTypes.bool,

	/**
	 * Url with editor's source code. Uses newest version from https://cdn.ckeditor.com domain by default.
	 */
	editorUrl: PropTypes.string,

	/**
	 * Initial data. It will be passed to editor once it's in `ready` state.
	 */
	initData: PropTypes.string,

	/**
	 * A unique identifier of editor instance.
	 *
	 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#property-name
	 */
	name: PropTypes.string,

	/**
	 * Callback function with CKEDITOR namespace passed as the only argument.
	 * It is invoked each time a new editor instance is loaded.
	 */
	onBeforeLoad: PropTypes.func,

	/**
	 * Callback invoked once the editor instance is destroyed.
	 */
	onDestroyed: PropTypes.func,

	/**
	 * Callback invoked once the editor instance is ready.
	 */
	onInstanceReady: PropTypes.func,

	/**
	 * Callback invoked once the editor instance is loaded.
	 */
	onLoaded: PropTypes.func,

	/**
	 * Callback function with CKEDITOR namespace passed as the only argument.
	 * It is invoked exactly once regardless the number of editor instances.
	 * It is called after CKEDITOR namespace is loaded and before any editor instances are initialized.
	 */
	onNamespaceLoaded: PropTypes.func,

	/**
	 * This prop has two-fold effect:
	 *
	 * - Serves as a convenience prop to start editor in read-only mode.
	 *   It's an equivalent of passing `config.readOnly = true` but the former way takes precedence.
	 * - Allows to change editor's mode to read-only on runtime, once the editor is in `ready` state.
	 *
	 * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-readOnly
	 */
	readOnly: PropTypes.bool,

	/**
	 * Styles passed to the root element.
	 */
	styles: PropTypes.object,

	/**
	 * Setups editor in either `classic` or `inline` mode.
	 *
	 * See:
	 * - https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-replace
	 * - https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-inline
	 */
	type: PropTypes.oneOf<CKEditorType>( [ 'classic', 'inline' ] )
};

CKEditor.propTypes = propTypes;

export default CKEditor;
