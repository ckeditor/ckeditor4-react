import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Test from './Test.jsx';

function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Test />
			</Route>
		</Switch>
	);
}

export default Routes;
