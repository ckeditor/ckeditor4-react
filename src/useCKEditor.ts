import { useEffect, useState } from 'react';
import { getEditorNamespace } from 'ckeditor4-integrations-common';

const version = 'https://cdn.ckeditor.com/4.16.0/standard-all/ckeditor.js';

interface CKEditorArgs {
	ref: any;
}

type EditorState = 'loading' | 'unloaded' | 'loaded' | 'ready';

function useCKEditor( { ref }: CKEditorArgs ) {
	const [ editor, setEditor ] = useState<any>( undefined );
	const [ editorState, setEditorState ] = useState<EditorState>( 'loading' );

	useEffect( () => {
		getEditorNamespace( version )
			.then( ( CKEDITOR: any ) => {
				const editor = CKEDITOR.replace( ref.current );
				setEditor( editor );
				editor.on( 'instanceReady', () => {
					setEditorState( 'ready' );
				} );
			} )
			.catch( console.error );
	}, [] );

	return { editor, editorState };
}

export default useCKEditor;
