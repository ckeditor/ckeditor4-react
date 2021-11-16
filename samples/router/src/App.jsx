import React from 'react';
import { CKEditor } from 'ckeditor4-react';
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<HashRouter>
			<div>
				<Routes>
					<Route path="/" element={<h1>{'Home page'}</h1>} />
					<Route path="/editor" element={<CKEditor
						debug={true}
						initData="<p>Hello <strong>world</strong>!</p>"
					/>} />
				</Routes>
				<div>
					<div>
						<NavLink to="/">{'Home page'}</NavLink>
					</div>
					<div>
						<NavLink to="/editor">{'Editor page'}</NavLink>
					</div>
				</div>
				<footer>{`Running React v${ React.version }`}</footer>
			</div>
		</HashRouter>
	);
}

export default App;
