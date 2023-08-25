import React from 'react';
import { CKEditor } from 'ckeditor4-react';

/**
 * `initData` can be either string with markup or JSX:
 *
 * <CKEditor initData="<p>Hello <strong>world</strong>!</p>" />
 *
 * Or:
 *
 * <CKEditor initData={<p>Hello <strong>world</strong>!</p>} />
 *
 */
function App() {
	return (
		<div>
			<section>
				{ /* Remember to add the license key to the CKEditor 4 configuration:
			 		https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-licenseKey */ }
				<CKEditor
					debug={true}
					initData="<p>Hello <strong>world</strong>!</p>"
				/>
			</section>
			<footer>{`Running React v${ React.version }`}</footer>
		</div>
	);
}

export default App;
