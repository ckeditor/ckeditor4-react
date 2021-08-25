import React from 'react';
import { CKEditor } from 'ckeditor4-react';
import { HashRouter, NavLink, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<HashRouter>
			<div>
				<Switch>
					<Route exact={true} path="/">
						<h1>{'Home page'}</h1>
					</Route>
					<Route exact={true} path="/editor">
						<CKEditor
							debug={true}
							initData="<p>Hello <strong>world</strong>!</p>"
						/>
					</Route>
				</Switch>
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
