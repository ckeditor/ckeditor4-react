import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';

function App() {
	return (
		<div>
			<section>
				{ /* Remember to add the license key to the CKEditor 4 configuration:
			 		https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-licenseKey*/ }
				<CKEditor debug={true} initData="Hello world!" />
			</section>
			<footer>{`Running React v${ React.version }`}</footer>
		</div>
	);
}

export default App;
