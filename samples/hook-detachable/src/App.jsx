import * as React from 'react';
import CKEditor from './CKEditor';
import CKEditorDangerous from './CKEditorDangerous';

const { version } = React;

/**
 * Showcase of two approaches to detaching / re-attaching editor.
 *
 * The first one is a viable option and the second one is an anti-pattern that will lead to errors.
 */
function App() {
	return (
		<div>
			<div>
				<h3>{'Detach / re-attach'}</h3>
				<CKEditor />
			</div>
			<div>
				<h3 style={{ color: 'red' }}>
					{'Dangerously detach / re-attach'}
				</h3>
				<CKEditorDangerous />
			</div>
			<footer>{`Running React v${ version }`}</footer>
		</div>
	);
}

export default App;
