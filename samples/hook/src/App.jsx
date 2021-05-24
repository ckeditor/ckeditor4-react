import * as React from 'react';
import Sidebar from './Sidebar';
import CKEditor from './CKEditor';

const { version, useReducer } = React;

/**
 * `App` component manages state of underlying `CKEditor` and `Sidebar` components.
 *
 * Custom `CKEditor` component memoizes certain props and it will ignore any new values. For instance, this is true for `config` and `type`.
 * In order to force new `config` or `type` values, use keyed component.
 * This way `CKEditor` component is re-mounted and new instance of editor is created.
 */
function App() {
	const [ { config, readOnly, type, style, toolbar, name }, dispatch ] =
		useReducer( reducer, {
			config: getConfig(),
			readOnly: false,
			type: 'classic',
			style: 'initial',
			toolbar: 'standard',
			name: getUniqueName()
		} );

	const handleToolbarChange = evt => {
		const value = evt.currentTarget.value;
		dispatch( { type: 'toolbar', payload: value } );
	};

	const handleReadOnlyChange = evt => {
		const checked = evt.currentTarget.checked;
		dispatch( { type: 'readOnly', payload: checked } );
	};

	const handleStyleChange = evt => {
		const value = evt.currentTarget.value;
		dispatch( { type: 'style', payload: value } );
	};

	const handleTypeChange = evt => {
		const value = evt.currentTarget.value;
		dispatch( { type: 'type', payload: value } );
	};

	return (
		<div>
			<section className="container">
				<Sidebar
					toolbar={toolbar}
					style={style}
					type={type}
					onReadOnlyChange={handleReadOnlyChange}
					onStyleChange={handleStyleChange}
					onTypeChange={handleTypeChange}
					onToolbarChange={handleToolbarChange}
					readOnly={readOnly}
				/>
				<div className="paper flex-grow-3">
					<CKEditor
						key={name}
						config={config}
						type={type}
						style={getStyle( style )}
						readOnly={readOnly}
						name={name}
					/>
				</div>
			</section>
			<footer>{`Running React v${ version }`}</footer>
		</div>
	);
}

function reducer( state, action ) {
	switch ( action.type ) {
		case 'toolbar':
			return action.payload === state.toolbar ?
				state :
				{
					...state,
					toolbar: action.payload,
					config: getConfig( action.payload === 'bold only' ),
					name: getUniqueName()
				};
		case 'type':
			return action.payload === state.type ?
				state :
				{
					...state,
					type: action.payload,
					name: getUniqueName()
				};
		case 'readOnly':
			return {
				...state,
				readOnly: action.payload
			};
		case 'style':
			return {
				...state,
				style: action.payload
			};
		default:
			return state;
	}
}

function getUniqueName() {
	return Math.random()
		.toString( 36 )
		.replace( /[^a-z]+/g, '' )
		.substr( 0, 5 );
}

function getConfig( boldOnly ) {
	return {
		title: 'CKEditor component',
		...( boldOnly ? { toolbar: [ [ 'Bold' ] ] } : undefined )
	};
}

function getStyle( style ) {
	const common = {
		borderWidth: '1px',
		borderStyle: 'solid'
	};

	switch ( style ) {
		case 'blue':
			return {
				...common,
				borderColor: 'blue'
			};
		case 'green':
			return {
				...common,
				borderColor: 'green'
			};
		default:
			return {};
	}
}

export default App;
