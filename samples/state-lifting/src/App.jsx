import React from 'react';
import TextAreaEditor from './TextAreaEditor';
import CKEditor from './CKEditor';

const { useReducer } = React;

function App() {
	const [ state, dispatch ] = useReducer( reducer, {
		data: '',
		editorType: undefined
	} );

	return (
		<div>
			<section className="container">
				<div className="paper flex-grow-1">
					<TextAreaEditor dispatch={dispatch} state={state} />
				</div>
				<div className="paper flex-grow-2">
					<CKEditor dispatch={dispatch} state={state} />
				</div>
			</section>
			<section className="container">
				<div className="paper flex-grow-1">
					<h4>{`Current editor: ${ state.editorType || '' }`}</h4>
					<div className="preview" dangerouslySetInnerHTML={{ __html: state.data }} />
				</div>
			</section>
			<footer>{`Running React v${ React.version }`}</footer>
		</div>
	);
}

function reducer( state, action ) {
	switch ( action.type ) {
		case 'blur': {
			return {
				...state,
				editorType: undefined
			};
		}
		case 'CKEditor': {
			return {
				...state,
				editorType: 'CKEditor'
			};
		}
		case 'data': {
			return {
				...state,
				data: action.payload
			};
		}
		case 'textarea': {
			return {
				...state,
				editorType: 'textarea'
			};
		}
		default: {
			return state;
		}
	}
}

export default App;
