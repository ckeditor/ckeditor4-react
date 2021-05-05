import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';

function App() {
	return (
		<div>
			<section>
				<CKEditor initData="Hello world!" />
			</section>
			<footer>{`Running React v${ React.version }`}</footer>
		</div>
	);
}

export default App;
