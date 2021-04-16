import * as React from 'react';
import useCKEditor from './useCKEditor';

const { useRef, useEffect } = React;

interface Props {
	initData?: string;
}

function CKEditor( { initData }: Props ): JSX.Element {
	const ref = useRef( null );
	const { editor, editorState } = useCKEditor( { ref } );

	useEffect( () => {
		console.log( 'lolz' );
		if ( editor && editorState === 'ready' ) {
			console.log( 'lolz2' );
			// console.log( editor.getData() );
			// editor.setData( initData );
		}
	}, [ editor, initData, editorState ] );

	return <div ref={ref} />;
}

export default CKEditor;
