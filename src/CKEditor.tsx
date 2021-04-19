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
		if ( editor && editorState === 'ready' ) {
			editor.setData( initData );
		}
	}, [ editor, initData, editorState ] );

	return <div ref={ref} />;
}

export default CKEditor;
