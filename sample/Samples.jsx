import CKEditor from '../src/ckeditor.jsx';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';

import LiveFeed from './LiveFeed.jsx';

class Subpage extends Component {
	render() {
		return (
			<CKEditor data="<p>Hi, I'm CKEditor 4 instance on subpage!</p>" />
		);
	}
}

const initialData = '<p>This is an example CKEditor 4 instance.</p>';

const Home = () => (
	<div>
		<h2>Classic Example</h2>
		<CKEditor data={initialData} />
		<h2>Inline Example</h2>
		<CKEditor type="inline" data={initialData} />
	</div>
);

class Samples extends Component {
	render() {
		return (
			<HashRouter>
				<main>
					<h1>CKEditor 4 – React Component – development sample</h1>
					<nav>
						<Link to="/">Home Page</Link>
						<Link to="/subpage">Sample Subpage</Link>
						<Link to="/livefeed">Live Feed</Link>
					</nav>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/subpage" component={Subpage} />
						<Route path="/livefeed" component={LiveFeed} />
					</Switch>
				</main>
			</HashRouter>
		);
	}
}

ReactDOM.render(
	<Samples />,
	window.document.getElementById( 'app' )
);

export default { React, ReactDOM, Samples };
