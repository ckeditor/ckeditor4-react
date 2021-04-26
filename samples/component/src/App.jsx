import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';
import Sidebar from './Sidebar';

const { version, useState } = React;

const config = {
	title: 'My classic editor'
};

function App() {
	const [ readOnly, setReadOnly ] = useState( false );
	const [ currentType, setType ] = useState( 'classic' );
	const [ currentStyle, setStyle ] = useState( 'initial' );

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

	const initData = `<p>Hello from ${ currentType } editor!</p>`;

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
					<CKEditor
						config={config}
						initData={initData}
						name="my-classic-editor"
						readOnly={readOnly}
						style={getStyle( currentStyle )}
						type={currentType}
					/>
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
