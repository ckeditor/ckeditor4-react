/* eslint-disable react/prop-types */

import * as React from 'react';

function Sidebar( {
	toolbar,
	style,
	type,
	onToolbarChange,
	onReadOnlyChange,
	onStyleChange,
	onTypeChange,
	readOnly
} ) {
	return (
		<aside className="paper flex-grow-1">
			<div className="option">
				<div>{'Type:'}</div>
				{[ 'classic', 'inline' ].map( typeDef => (
					<div key={typeDef}>
						<input
							id={typeDef}
							type="radio"
							name={typeDef}
							checked={typeDef === type}
							value={typeDef}
							onChange={onTypeChange}
						/>
						<label htmlFor={typeDef}>{typeDef}</label>
					</div>
				) )}
			</div>
			<div className="option">
				<div>{'Toolbar:'}</div>
				{[ 'standard', 'bold only' ].map( toolbarDef => (
					<div key={toolbarDef}>
						<input
							id={toolbarDef}
							type="radio"
							name={toolbarDef}
							checked={toolbarDef === toolbar}
							value={toolbarDef}
							onChange={onToolbarChange}
						/>
						<label htmlFor={toolbarDef}>{toolbarDef}</label>
					</div>
				) )}
			</div>
			<div className="option">
				<div>{'Mode:'}</div>
				<input
					id="read-only"
					type="checkbox"
					name="read-only"
					checked={readOnly}
					onChange={onReadOnlyChange}
				/>
				<label htmlFor="read-only">{'read-only'}</label>
			</div>
			<div className="option">
				<div>{'Border color:'}</div>
				{[ 'initial', 'blue', 'green' ].map( styleDef => (
					<div key={styleDef}>
						<input
							id={styleDef}
							type="radio"
							name={styleDef}
							checked={styleDef === style}
							value={styleDef}
							onChange={onStyleChange}
						/>
						<label htmlFor={styleDef}>{styleDef}</label>
					</div>
				) )}
			</div>
		</aside>
	);
}

export default Sidebar;
