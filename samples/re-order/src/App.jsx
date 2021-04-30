import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';

const { version, useCallback, useState } = React;

const config = { height: 50, toolbar: [ [ 'Bold' ] ] };

const initState = {
	toast: 'toast',
	bagel: 'bagel',
	taco: 'taco',
	avocado: 'avocado'
};

function App() {
	const [ order, setOrder ] = useState( Object.keys( initState ) );
	const [ cache, setCache ] = useState( initState );

	const handleReorderClick = () => {
		setOrder( current => shuffle( [ ...current ] ) );
	};

	const handleInstanceReady = useCallback(
		( { editor } ) => {
			editor.setData( cache[ editor.name ] );
		},
		[ cache ]
	);

	const handleDestroyed = useCallback( ( { editor } ) => {
		setCache( current => ( {
			...current,
			[ editor.name ]: editor.getData()
		} ) );
	}, [] );

	return (
		<div>
			<section className="container">
				<div className="paper flex-grow-1">
					<button className="btn" onClick={handleReorderClick}>
						{'Click to re-order'}
					</button>
					<div className="container">
						<div className="editors-group flex-grow-1">
							<h4>{'Classic editors'}</h4>
							{order.map( value => (
								<div key={getUniqueName()}>
									<CKEditor
										name={value}
										debug={true}
										type="classic"
										config={config}
										onDestroyed={handleDestroyed}
										onInstanceReady={handleInstanceReady}
									/>
								</div>
							) )}
						</div>
						<div className="editors-group flex-grow-1">
							<h4>{'Inline editors'}</h4>
							{order.map( value => (
								<div key={value}>
									<CKEditor
										name={`${ value }-inline`}
										initData={value}
										debug={true}
										type="inline"
										config={config}
									/>
								</div>
							) )}
						</div>
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

function shuffle( array ) {
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;

	while ( currentIndex !== 0 ) {
		randomIndex = Math.floor( Math.random() * currentIndex );
		currentIndex -= 1;

		temporaryValue = array[ currentIndex ];
		array[ currentIndex ] = array[ randomIndex ];
		array[ randomIndex ] = temporaryValue;
	}

	return array;
}

export default App;
