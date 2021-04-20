/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import * as React from 'react';
import useCKEditor from './useCKEditor';

const { useState, useEffect } = React;

export interface CKEditorProps {
	initData?: string;
}

function CKEditor( { initData }: CKEditorProps ): JSX.Element {
	const [ element, setElement ] = useState<HTMLDivElement | null>( null );
	const { editor, editorState } = useCKEditor( { element } );

	useEffect( () => {
		if ( editor && editorState === 'ready' ) {
			editor.setData( initData );
		}
	}, [ editor, initData, editorState ] );

	return <div ref={setElement} />;
}

export default CKEditor;
