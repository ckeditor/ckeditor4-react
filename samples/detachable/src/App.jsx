import * as React from 'react';
import DetachableCKEditor from './DetachableCKEditor';

const { version } = React;

/**
 * Showcase of delayed attaching of the editor.
 */
function App() {
	return (
		<div>
			<section className="container">
				<DetachableCKEditor />
			</section>
			<footer>{`Running React v${ version }`}</footer>
		</div>
	);
}

export default App;
