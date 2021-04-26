import * as React from 'react';
import { CKEditor, useCKEditorEvent } from 'ckeditor4-react';
import Sidebar from './Sidebar';

const { version, useCallback, useMemo, useState } = React;

function App() {
	const [ events, setEvents ] = useState( [] );
	const [ uniqueName, setUniqueName ] = useState( getUniqueName() );
	const [ editor, setEditor ] = useState( undefined );
	const start = useMemo( () => new Date(), [] );

	const handleRemountClick = () => {
		setUniqueName( getUniqueName() );
	};

	const pushEvent = useCallback(
		evtName => events =>
			events.concat( {
				evtName,
				editor: uniqueName,
				date: new Date()
			} ),
		[ uniqueName ]
	);

	/**
	 * `CKEditor` component supports lifecycle event handlers:
	 *
	 * - onBeforeLoad
	 * - onDestroyed
	 * - onInstanceReady
	 * - onLoaded
	 * - onNamespaceLoaded
	 *
	 */
	const handleBeforeLoad = useCallback( () => {
		setEvents( pushEvent( 'beforeLoad' ) );
	}, [ pushEvent ] );

	const handleDestroyed = useCallback( () => {
		setEvents( pushEvent( 'destroy' ) );
		setEditor( undefined );
	}, [ pushEvent ] );

	const handleInstanceReady = useCallback(
		( { editor } ) => {
			setEvents( pushEvent( 'instanceReady' ) );
			setEditor( editor );
		},
		[ pushEvent ]
	);

	const handleLoaded = useCallback( () => {
		setEvents( pushEvent( 'loaded' ) );
	}, [ pushEvent ] );

	const handleNamespaceLoaded = useCallback( () => {
		setEvents( pushEvent( 'namespaceLoaded' ) );
	}, [ pushEvent ] );

	/**
	 * Custom events can be registered with the help of `useCKEditorEvent` hook.
	 */
	const handleBlur = useCallback( () => {
		setEvents( pushEvent( 'blur' ) );
	}, [ pushEvent ] );

	const handleFocus = useCallback( () => {
		setEvents( pushEvent( 'focus' ) );
	}, [ pushEvent ] );

	useCKEditorEvent( { editor, handler: handleFocus, evtName: 'focus' } );

	useCKEditorEvent( { editor, handler: handleBlur, evtName: 'blur' } );

	return (
		<div>
			<section className="container">
				<Sidebar events={events} start={start} />
				<div className="paper flex-grow-3">
					<CKEditor
						key={uniqueName}
						name={uniqueName}
						onBeforeLoad={handleBeforeLoad}
						onDestroyed={handleDestroyed}
						onInstanceReady={handleInstanceReady}
						onNamespaceLoaded={handleNamespaceLoaded}
						onLoaded={handleLoaded}
					/>
					<button className="btn" onClick={handleRemountClick}>
						{'Re-mount editor'}
					</button>
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
