import React from 'react';
import { CKEditor } from 'ckeditor4-react';

function App() {
	return (
		<div>
			<CKEditor initData="Hello world!" />
		</div>
	);
}

export default App;
