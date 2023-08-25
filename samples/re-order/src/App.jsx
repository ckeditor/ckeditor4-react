import * as React from 'react';
import { CKEditor } from 'ckeditor4-react';

const { version, useState } = React;

const config = { height: 50, toolbar: [ [ 'Bold' ] ] };

/**
 * Since CKEditor v4.17, editor's container element can be detached and re-attached to DOM.
 * Therefore, editor instances can be easily re-ordered.
 *
 * Prior to CKEditor v4.17, classic editor instance had to be re-created
 * anytime editor's container element was being detached and re-attached to DOM.
 */
function App() {
	const [ order, setOrder ] = useState(
		[ 'toast', 'bagel', 'taco', 'avocado' ]
	);

	const handleReorderClick = () => {
		setOrder( current => shuffle( [ ...current ] ) );
	};

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
								<div key={value}>
									{ /* Remember to add the license key to the CKEditor 4 configuration:
									https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-licenseKey*/}
									<CKEditor
										name={value}
										initData={value}
										debug={true}
										type="classic"
										config={config}
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
