import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';
import Sidebar from './Sidebar';

const { version, useEffect, useState } = React;

function App() {
	const [ config, setConfig ] = useState( undefined );
	const [ readOnly, setReadOnly ] = useState( false );
	const [ currentToolbar, setToolbar ] = useState( 'standard' );
	const [ currentType, setType ] = useState( 'classic' );
	const [ currentStyle, setStyle ] = useState( 'initial' );

	useEffect( () => {
		setConfig( {
			title: 'My classic editor',
			...( currentToolbar === 'bold only' ?
				{ toolbar: [ [ 'Bold' ] ] } :
				undefined )
		} );
	}, [ currentToolbar ] );

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

	/**
	 * Please notice that a new instance of editor is created on toggling between `classic` and `inline` type.
	 */
	const handleTypeChange = evt => {
		const value = evt.currentTarget.value;
		setType( value );
	};

	const initData = `<p>Hello from ${ currentType } editor!</p>`;

	return (
		<div>
			<section className="container">
				<Sidebar
					currentToolbar={currentToolbar}
					currentStyle={currentStyle}
					currentType={currentType}
					onToolbarChange={handleToolbarChange}
					onReadOnlyChange={handleReadOnlyChange}
					onStyleChange={handleStyleChange}
					onTypeChange={handleTypeChange}
					readOnly={readOnly}
				/>
				<div className="paper flex-grow-3">
					{config && (
						<CKEditor
							debug={true}
							config={config}
							initData={initData}
							name={`my-classic-editor-${ currentType }`}
							readOnly={readOnly}
							style={getStyle( currentStyle )}
							type={currentType}
						/>
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
