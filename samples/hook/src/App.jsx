import * as React from 'react';
import { registerEditorEventHandler, useCKEditor } from 'ckeditor4-react';
import Sidebar from './Sidebar';

const { version, useEffect, useState } = React;

function App() {
	const [ config, setConfig ] = useState( undefined );
	const [ element, setElement ] = useState();
	const [ readOnly, setReadOnly ] = useState( false );
	const [ currentToolbar, setToolbar ] = useState( 'standard' );
	const [ currentType, setType ] = useState( 'classic' );
	const [ currentStyle, setStyle ] = useState( 'initial' );

	/**
	 * Sets initial value of `readOnly`.
	 */
	if ( config && readOnly ) {
		config.readOnly = readOnly;
	}

	const { editor, status } = useCKEditor( {
		config,
		element,
		type: currentType
	} );

	const handleToolbarChange = evt => {
		const value = evt.currentTarget.value;
		setToolbar( value );
	};

	const handleReadOnlyChange = evt => {
		const checked = evt.currentTarget.checked;
		setReadOnly( checked );
	};

	const handleStyleChange = evt => {
		const value = evt.currentTarget.value;
		setStyle( value );
	};

	const handleTypeChange = evt => {
		const value = evt.currentTarget.value;
		setType( value );
	};

	/**
	 * New instance of editor is created whenever new instance of config is created.
	 * Use combination of `useState` and `useEffect` to memoize it across renders.
	 */
	useEffect( () => {
		setConfig( {
			title: 'My classic editor',
			...( currentToolbar === 'bold only' ?
				{ toolbar: [ [ 'Bold' ] ] } :
				undefined )
		} );
	}, [ currentToolbar ] );

	/**
	 * Sets initial data once the editor is in `ready` status.
	 */
	useEffect( () => {
		return registerEditorEventHandler( {
			editor,
			evtName: 'instanceReady',
			handler: ( { editor } ) => {
				editor.setData( `<p>Hello from ${ currentType } editor!</p>`, {
					/**
					 * Prevents undo icon flickering.
					 */
					noSnapshot: true,

					/**
					 * Resets undo stack.
					 */
					callback: () => {
						editor.resetUndo();
					}
				} );
			},
			priority: -1
		} );
	}, [ editor, currentType ] );

	/**
	 * Toggles `readOnly` on runtime.
	 */
	useEffect( () => {
		if ( editor && editor.status === 'ready' ) {
			editor.setReadOnly( readOnly );
		}
	}, [ editor, readOnly ] );

	/**
	 * Updates editor container's style on runtime.
	 */
	useEffect( () => {
		if ( editor && status === 'ready' ) {
			editor.container.setStyles( getStyle( currentStyle ) );
		}
	}, [ editor, status, currentStyle ] );

	return (
		<div>
			<section className="container">
				<Sidebar
					currentToolbar={currentToolbar}
					currentStyle={currentStyle}
					currentType={currentType}
					onReadOnlyChange={handleReadOnlyChange}
					onStyleChange={handleStyleChange}
					onTypeChange={handleTypeChange}
					onToolbarChange={handleToolbarChange}
					readOnly={readOnly}
				/>
				<div className="paper flex-grow-3">
					{config && (
						<div style={getStyle( currentStyle )} ref={setElement} />
					)}
				</div>
			</section>
			<footer>{`Running React v${ version }`}</footer>
		</div>
	);
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
			return undefined;
	}
}

export default App;
