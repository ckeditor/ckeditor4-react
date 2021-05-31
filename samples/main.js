/* eslint-disable react/react-in-jsx-scope, react/jsx-no-undef */

const { useState, useEffect } = React;
const { HashRouter, Switch, Route, Link } = ReactRouterDOM;
const Modal = ReactModal;

Modal.setAppElement( '#app' );

const startingData = '<p>This is a CKEditor 4 WYSIWYG editor instance created by ️⚛️ React.</p>';

ReactDOM.render(
	<HashRouter>
		<Navigation />
		<Router />
	</HashRouter>,
	document.getElementById( 'app' )
);

function Navigation() {
	return (
		<ul className='routes'>
			<li>
				<Link to="/">Editor Types</Link>
				<Link to="/events">Component Events</Link>
				<Link to="/binding">Two-way Data Binding</Link>
				<Link to="/data-prop">Data Prop Changes</Link>
				<Link to="/re-order">List re-order</Link>
				<Link to="/modal">Editor in modal</Link>
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
			<Route path="/data-prop">
				<EditorDataPropChanges />
			</Route>
			<Route path="/re-order">
				<EditorReOrder />
			</Route>
			<Route path="/modal">
				<EditorModal />
			</Route>
		</Switch>
	);
}

function EditorTypes() {
	const [ readOnly, setReadOnly ] = useState( false );

	return (
		<main>
			<h2>Editor types</h2>
			<section>
				<h3>Classic editor</h3>
				<CKEditor
					type="classic"
					data={ startingData }
					readOnly={ readOnly }
					onNamespaceLoaded={ onNamespaceLoaded }
				/>
			</section>
			<section>
				<h3>Inline editor</h3>
				<CKEditor
					type="inline"
					data={ startingData }
					readOnly={ readOnly }
					onNamespaceLoaded={ onNamespaceLoaded }
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
	const [ events, setEvents ] = useState( [] );

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
				onNamespaceLoaded={ onNamespaceLoaded }
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

function EventLog( { stream } ) {
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
	const [ data, setData ] = useState( startingData );
	const [ sourceEditorFocused, setSourceEditorFocus ] = useState( false );

	return (
		<div>
			<h2>Two-way data binding</h2>

			<p>
				Using the internal state of React components,
				it is possible to create a simple two-way data binding between the CKEditor 4 WYSIWYG editor component and other components,
				for example the preview component that renders the content of the editor.
			</p>

			<div>
				<SourceEditor
					data={ data }
					textHandler={ value => setData( value ) }
					focused={ sourceEditorFocused }
					setFocus={ setSourceEditorFocus }
				/>

				<CKEditor
					data={ data }
					onChange={ ( { editor } ) => setData( editor.getData() ) }
					onNamespaceLoaded={ onNamespaceLoaded }
				/>

				<EditorPreview data={ data } />
			</div>
		</div>
	);
}

function SourceEditor( { data, textHandler, focused, setFocus } ) {
	const textareaValue = {};
	// Updating editor on every keystroke may freeze a browser.
	const onChange = debounce( textHandler, 300 );

	// Value should be only updated if source editor is not focused.
	// Otherwise it will interrupt typing with new data set.
	if ( !focused ) {
		textareaValue.value = data;
	}

	return (
		<div>
			<p>
				<textarea
					className="binding-editor"
					{ ...textareaValue }
					onChange={ ( { target: { value } } ) => onChange( value ) }
					onFocus={ () => setFocus( true ) }
					onBlur={ () => setFocus( false ) }
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

function EditorDataPropChanges() {
	const [ data, setData ] = useState( startingData );

	useEffect( () => {
		const fakeApi = () => {
			timeout( 50 ).then( () => {
				setData( 'Init data arrived!' );
				return timeout( 3000 );
			} ).then( () => {
				setData( 'Final data arrived!' );
			} );
		};

		fakeApi();
	}, [] );

	const generateData = () => {
		setData( `Passed new data: ${ new Date().getTime() }` );
	};

	return (
		<main>
			<h2>Data Prop Changes</h2>
			<p>
				Editor component will show the freshest data set via `data` prop once the editor is ready.
			</p>
			<section>
				<h3>Generate data</h3>
				<button onClick={ generateData }>Set `data` prop</button>
			</section>
			<section>
				<h3>Classic editor</h3>
				<CKEditor
					type="classic"
					data={ data }
					onNamespaceLoaded={ onNamespaceLoaded }
				/>
			</section>
			<section>
				<h3>Inline editor</h3>
				<CKEditor
					type="inline"
					data={ data }
					onNamespaceLoaded={ onNamespaceLoaded }
				/>
			</section>
		</main>
	);
}

function EditorReOrder() {
	const config = { height: 50, toolbar: [ [ 'Bold' ] ] };

	const [ order, setOrder ] = useState( [ 'toast', 'bagel', 'taco', 'avocado' ] );

	const handleReorderClick = () => {
		setOrder( current => shuffle( [ ...current ] ) );
	};

	return (
		<div>
			<button onClick={handleReorderClick}>{'Click to re-order'}</button>
			<div>
				<h4>{'Classic editors'}</h4>
				{order.map( value => (
					<div key={value}>
						<CKEditor
							name={value}
							data={value}
							debug={true}
							type="classic"
							config={config}
						/>
					</div>
				) )}
			</div>
			<div>
				<h4>{'Inline editors'}</h4>
				{order.map( value => (
					<div key={value}>
						<CKEditor
							name={`${ value }-inline`}
							data={value}
							debug={true}
							type="inline"
							config={config}
						/>
					</div>
				) )}
			</div>
		</div>
	);
}

function EditorModal() {
	const [ modalIsOpen, setIsOpen ] = useState( false );
	const toggleModal = () => {
		setIsOpen( open => !open );
	};

	return (
		<div>
			<button onClick={toggleModal}>Open Modal</button>
			<Modal
				isOpen={modalIsOpen}
			>
				<CKEditor
					data="<p>Hello from modal!</p>"
					type="classic"
				/>
				<button onClick={toggleModal}>Close Modal</button>
			</Modal>
		</div>
	);
}

function shuffle( array ) {
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;

	while ( currentIndex !== 0 ) {
		randomIndex = Math.floor( Math.random() * currentIndex );
		currentIndex -= 1;

		temporaryValue = array[ currentIndex ];
		array[ currentIndex ] = array[ randomIndex ];
		array[ randomIndex ] = temporaryValue;
	}

	return array;
}

function debounce( fn, wait ) {
	let timeout;

	return function( ...args ) {
		const context = this;

		clearTimeout( timeout );

		timeout = setTimeout( function() {
			fn.apply( context, args );
		}, wait );
	};
}

function timeout( time ) {
	return new Promise( resolve => {
		setTimeout( resolve, time );
	} );
}

function onNamespaceLoaded( namespace ) {
	console.log( 'CKEDITOR version: ', namespace.version );
}
