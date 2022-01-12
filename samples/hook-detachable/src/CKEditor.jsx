import * as React from 'react';
import { useCKEditor } from 'ckeditor4-react';

/**
 * Detaches / re-attaches editor.
 *
 * Underneath, editor's instance is destroyed anytime `element` is nullified (i.e. when `#detachable` element is removed from DOM).
 * Editor instance is re-created anytime `#detachable` element is added to DOM.
 */
function CKEditor() {
	const [ detached, setDetached ] = React.useState( false );
	const [ element, setElement ] = React.useState();

	useCKEditor( {
		element,
		debug: true,
		subscribeTo: [
			'beforeLoad',
			'destroy',
			'instanceReady',
			'loaded',
			'namespaceLoaded'
		]
	} );

	const handleAttach = () => {
		setDetached( current => !current );
	};

	return (
		<section className="container">
			<div>
				<button onClick={handleAttach}>
					{detached ? 'Re-attach' : 'Detach'}
				</button>
			</div>
			<div>
				{!detached && (
					<div className="paper flex-grow-3" id="editor-parent">
						<div id="detachable" ref={setElement}>
							<p>{'Hello from detachable editor!'}</p>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export default CKEditor;
