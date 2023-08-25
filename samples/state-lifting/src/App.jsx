import React from 'react';
import { CKEditorEventAction } from 'ckeditor4-react';
import TextAreaEditor from './TextAreaEditor';
import CKEditor from './CKEditor';

const { useReducer } = React;

function App() {
	const [ state, dispatch ] = useReducer( reducer, {
		data: '',
		currentEditor: undefined
	} );

	return (
		<div>
			<section className="container">
				<div className="paper flex-grow-1">
					<TextAreaEditor dispatch={dispatch} state={state} />
				</div>
				<div className="paper flex-grow-2">
					{ /* Remember to add the license key to the CKEditor 4 configuration:
					https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-licenseKey */ }
					<CKEditor dispatch={dispatch} state={state} />
				</div>
			</section>
			<section className="container">
				<div className="paper flex-grow-1">
					<h4>{`Current editor: ${ state.currentEditor || '' }`}</h4>
					<div
						className="preview"
						dangerouslySetInnerHTML={{ __html: state.data }}
					/>
				</div>
			</section>
			<footer>{`Running React v${ React.version }`}</footer>
		</div>
	);
}

function reducer( state, action ) {
	switch ( action.type ) {
		case 'textareaBlur': {
			return {
				...state,
				currentEditor: undefined
			};
		}
		case 'textareaData': {
			return {
				currentEditor: 'textarea',
				data: action.payload
			};
		}
		case 'textareaFocus': {
			return {
				...state,
				currentEditor: 'textarea'
			};
		}
		case CKEditorEventAction.blur: {
			return {
				...state,
				currentEditor:
					state.currentEditor !== 'textarea' ?
						undefined :
						state.currentEditor
			};
		}
		case CKEditorEventAction.change: {
			return {
				...state,
				data: action.payload.editor.getData()
			};
		}
		case CKEditorEventAction.focus: {
			return {
				...state,
				currentEditor: 'CKEditor'
			};
		}
		default: {
			return state;
		}
	}
}

export default App;
