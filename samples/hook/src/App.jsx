import * as React from 'react';
import { registerEditorEventHandler, useCKEditor } from 'ckeditor4-react';
import Sidebar from './Sidebar';

const { version, useEffect, useState } = React;

const config = {
	title: 'My classic editor'
};

function App() {
	const [ element, setElement ] = useState();
	const [ readOnly, setReadOnly ] = useState( false );
	const [ currentType, setType ] = useState( 'classic' );
	const [ currentStyle, setStyle ] = useState( 'initial' );
	const { editor, status } = useCKEditor( {
		config,
		element,
		type: currentType
	} );

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

	useEffect( () => {
		return registerEditorEventHandler( {
			editor,
			evtName: 'instanceReady',
			handler: ( { editor } ) => {
				editor.setData( `<p>Hello from ${ currentType } editor!</p>` );
			},
			priority: -1
		} );
	}, [ editor, currentType ] );

	useEffect( () => {
		if ( editor && editor.status === 'ready' ) {
			editor.setReadOnly( readOnly );
		}
	}, [ editor, readOnly ] );

	useEffect( () => {
		if ( editor && status === 'ready' ) {
			editor.container.setStyles( getStyle( currentStyle ) );
		}
	}, [ editor, status, currentStyle ] );

	return (
		<div>
			<section className="container">
				<Sidebar
					currentStyle={currentStyle}
					currentType={currentType}
					onReadOnlyChange={handleReadOnlyChange}
					onStyleChange={handleStyleChange}
					onTypeChange={handleTypeChange}
					readOnly={readOnly}
				/>
				<div className="paper flex-grow-3">
					<div style={getStyle( currentStyle )} ref={setElement} />
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
