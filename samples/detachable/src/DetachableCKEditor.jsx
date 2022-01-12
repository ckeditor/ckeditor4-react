import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';

/**
 * Detaches / re-attaches editor.
 */
function DetachableCKEditor() {
	const [ reAttached, setReAttached ] = React.useState( false );
	const parent = React.useRef();

	React.useEffect( () => {
		const container = document.getElementById( 'editor-container' );

		if ( container ) {
			container.removeChild( parent.current );
		}
	}, [] );

	const handleReAttach = () => {
		const container = document.getElementById( 'editor-container' );

		if ( container ) {
			container.appendChild( parent.current );
			setReAttached( true );
		}
	};

	return (
		<div>
			{!reAttached && (
				<div className="paper flex-grow-3">
					<button onClick={handleReAttach}>{'Re-attach'}</button>
				</div>
			)}
			<div id="editor-container">
				<div
					className="paper flex-grow-3"
					id="editor-parent"
					ref={parent}
				>
					<CKEditor />
				</div>
			</div>
		</div>
	);
}

export default DetachableCKEditor;
