import * as React from 'react';
import Sidebar from './Sidebar';
import CKEditor from './CKEditor';

const { version, useRef, useState } = React;

function App() {
	const [ events, setEvents ] = useState( [] );
	const [ uniqueName, setUniqueName ] = useState( getUniqueName() );
	const start = useRef( new Date() );

	const handleRemountClick = () => {
		setUniqueName( getUniqueName() );
	};

	const handleCustomEvent = () => {
		window.CKEDITOR.instances[ uniqueName ].fire( 'myCustomEvent' );
	};

	const pushEvent = ( evtName, editorName ) => {
		setEvents( events =>
			events.concat( {
				evtName,
				editor: editorName,
				date: new Date()
			} )
		);
	};

	return (
		<div>
			<section className="container">
				<Sidebar events={events} start={start.current} />
				<div className="paper flex-grow-3">
					<CKEditor
						key={uniqueName}
						pushEvent={pushEvent}
						uniqueName={uniqueName}
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

function getUniqueName() {
	return Math.random()
		.toString( 36 )
		.replace( /[^a-z]+/g, '' )
		.substr( 0, 5 );
}

export default App;
