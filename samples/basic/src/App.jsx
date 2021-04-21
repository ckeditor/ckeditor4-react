import React from 'react';
import { CKEditor } from 'ckeditor4-react';

function App() {
	return (
		<section>
			<div title="React version">{`Running React v${ React.version }`}</div>
			<CKEditor initData="Hello world!" />
		</section>
	);
}

export default App;
