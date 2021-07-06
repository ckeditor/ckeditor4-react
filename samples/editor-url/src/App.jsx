import React from 'react';
import { CKEditor } from 'ckeditor4-react';

function App() {
	return (
		<div>
			<section>
				<CKEditor debug={true} initData="Hello world!" editorUrl="/ckeditor/ckeditor.js" />
			</section>
			<footer>{`Running React v${ React.version }`}</footer>
		</div>
	);
}

export default App;
