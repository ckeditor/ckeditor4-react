import * as React from 'react';
import { useCKEditor } from 'ckeditor4-react';

/**
 * Dangerously detaches / re-attaches editor's parent to DOM.
 * Once the editor instance is detached, it cannot be re-attached again.
 *
 * !!! This is a React anti-pattern !!!
 *
 * Rather than manipulating DOM imperatively, use declarative approach.
 */
function CKEditorDangerous() {
	const [ detached, setDetached ] = React.useState( false );
	const [ element, setElement ] = React.useState();
	const ref = React.useRef();

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

	const handleAttachDangerously = () => {
		const container = document.getElementById( 'dangerous-container' );

		if ( !container ) {
			return;
		}

		if ( !detached ) {
			container.removeChild( ref.current );
			setDetached( true );
		} else {
			container.appendChild( ref.current );
			setDetached( false );
		}
	};

	return (
		<section className="container">
			<div>
				<button onClick={handleAttachDangerously}>
					{detached ? 'Re-attach' : 'Detach'}
				</button>
			</div>
			<div id="dangerous-container">
				<div className="paper flex-grow-3" id="editor-parent" ref={ref}>
					<div id="detachable" ref={setElement}>
						<p>{'Hello from detachable editor!'}</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CKEditorDangerous;
