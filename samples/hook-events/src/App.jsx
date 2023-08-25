import * as React from 'react';
import {
	prefixEventName,
	stripPrefix,
	CKEditorEventAction
} from 'ckeditor4-react';
import Sidebar from './Sidebar';
import CKEditor from './CKEditor';

const { version, useReducer, useRef } = React;

function App() {
	const [ { events, uniqueName }, dispatch ] = useReducer( reducer, {
		events: [],
		uniqueName: getUniqueName()
	} );
	const start = useRef( new Date() );

	const handleCustomEvent = () => {
		window.CKEDITOR.instances[ uniqueName ].fire( 'myCustomEvent' );
	};

	const handleRemountClick = () => {
		dispatch( { type: 'reMount', payload: getUniqueName() } );
	};

	return (
		<div>
			<section className="container">
				<Sidebar events={events} start={start.current} />
				<div className="paper flex-grow-3">
					{ /* Remember to add the license key to the CKEditor 4 configuration:
					https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-licenseKey*/}
					<CKEditor
						key={uniqueName}
						uniqueName={uniqueName}
						dispatchEvent={dispatch}
					/>
					<button className="btn" onClick={handleRemountClick}>
						{'Re-mount editor'}
					</button>
					<div>
						<button className="btn" onClick={handleCustomEvent}>
							{'Send custom event'}
						</button>
					</div>
				</div>
			</section>
			<footer>{`Running React v${ version }`}</footer>
		</div>
	);
}

function reducer( state, action ) {
	switch ( action.type ) {
		case 'reMount':
			return {
				...state,
				uniqueName: action.payload
			};

		/**
		 * Event names are prefixed in order to facilitate integration with dispatch from `useReducer`.
		 * Access them via `CKEditorEventAction`.
		 */
		case CKEditorEventAction.namespaceLoaded:
		case CKEditorEventAction.beforeLoad:
			return {
				...state,
				events: state.events.concat( {
					evtName: stripPrefix( action.type ),
					editor: '--',
					date: new Date()
				} )
			};
		case CKEditorEventAction.loaded:
		case CKEditorEventAction.instanceReady:
		case CKEditorEventAction.destroy:
		case CKEditorEventAction.focus:
		case CKEditorEventAction.blur:
		case prefixEventName( 'myCustomEvent' ):
			return {
				...state,
				events: state.events.concat( {
					evtName: stripPrefix( action.type ),
					editor: action.payload.editor.name,
					date: new Date()
				} )
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

export default App;
