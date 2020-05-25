var { useState } = React;
var { HashRouter, Switch, Route, Link } = ReactRouterDOM;

var startingData = '<p>This is a CKEditor 4 WYSIWYG editor instance created by ️⚛️ React.</p>';

ReactDOM.render(
	<HashRouter>
		<Navigation />
		<Router />
	</HashRouter>,
	document.getElementById( 'app' )
);

function Navigation() {
	return (
		<ul class='routes'>
			<li>
				<Link to="/">Editor Types</Link>
				<Link to="/events">Component Events</Link>
				<Link to="/binding">Two-way Data Binding</Link>
			</li>
		</ul>
	);
}

function Router() {
	return (
		<Switch>
			<Route exact path="/">
				<EditorTypes />
			</Route>
			<Route path="/events">
				<EditorEvents />
			</Route>
			<Route path="/binding">
				<EditorTwoWayDataBinding />
			</Route>
		</Switch>
	);
}

function EditorTypes() {
	var [ readOnly, setReadOnly ] = useState( false );

	return (
		<main>
			<h2>Editor types</h2>
			<section>
				<h3>Classic editor</h3>
				<CKEditor
					type="classic"
					data={ startingData }
					readOnly={ readOnly }
				/>
			</section>
			<section>
				<h3>Inline editor</h3>
				<CKEditor
					type="inline"
					data={ startingData }
					readOnly={ readOnly }
				/>
			</section>

			<p>
				<label>
					<input
						type="checkbox"
						checked={ readOnly }
						onChange={ evt => setReadOnly( evt.target.checked ) }
					/>
					Read-only
				</label>
			</p>
		</main>
	);
}

function EditorEvents() {
	var [ events, setEvents ] = useState( [] );

	return (
		<main>
			<h2>Editor events</h2>
			<CKEditor
				type="classic"
				data={ startingData }

				onFocus={ logEvent }
				onBlur={ logEvent }
				onChange={ logEvent }
				onSelectionChange={ logEvent }
			/>
			<h3>Events Log</h3>
			<p><small>To check additional details about every event, consult the console in the browser developer tools.</small></p>
			<EventLog stream={ events } />
			<button onClick={ clearEvents }>Clear events log</button>
		</main>
	);

	function logEvent( event ) {
		event.timestamp = new Intl.DateTimeFormat( 'en', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		} ).format( new Date() );

		console.log( event.timestamp, event.name, event.data || 'No additional data was provided' );

		setEvents( [ event, ...events ] );
	}

	function clearEvents() {
		setEvents( [] );
	}
}

function EventLog ( { stream } ) {
	return (
		<div className="event-log">
			<ul>
				{
					stream.map( ( { name, timestamp } ) => {
						return (
							<li>
								{ timestamp } – { name }
							</li>
						);
					} )
				}
			</ul>
		</div>
	);
}

function EditorTwoWayDataBinding() {
	var [ data, setData ] = useState( startingData );

	return (
		<div>
			<h2>Two-way data binding</h2>

			<p>
				Using the internal state of React components,
				it is possible to create a simple two-way data binding between the CKEditor 4 WYSIWYG editor component and other components,
				for example the preview component that renders the content of the editor.
			</p>

			<div>
				<SourceEditor data={ data } handler={ ( { target: { value } } ) => setData( value ) } />

				<CKEditor
					data={ data }
					onChange={ ( { editor } ) => setData( editor.getData() ) }
				/>

				<EditorPreview data={ data } />
			</div>
		</div>
	);
}

function SourceEditor( { data, handler } ) {
	return (
		<div>
			<p>
				<textarea
					className="binding-editor"
					value={ data }
					onChange={ handler }
				/>
			</p>
		</div>
	);
}

function EditorPreview( { data } ) {
	return (
		<div className="editor-preview">
			<h2>Rendered content</h2>
			<div dangerouslySetInnerHTML={ { __html: data } }></div>
		</div>
	);
}