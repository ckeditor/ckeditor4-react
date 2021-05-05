/* eslint-disable react/prop-types */

import * as React from 'react';

function Sidebar( {
	currentStyle,
	currentType,
	onTypeChange,
	onReadOnlyChange,
	onStyleChange,
	readOnly
} ) {
	return (
		<aside className="paper flex-grow-1">
			<div className="option">
				<div>{'Type:'}</div>
				{[ 'classic', 'inline' ].map( type => (
					<div key={type}>
						<input
							id={type}
							type="radio"
							name={type}
							checked={type === currentType}
							value={type}
							onChange={onTypeChange}
						/>
						<label htmlFor={type}>{type}</label>
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
				{[ 'initial', 'blue', 'green' ].map( style => (
					<div key={style}>
						<input
							id={style}
							type="radio"
							name={style}
							checked={style === currentStyle}
							value={style}
							onChange={onStyleChange}
						/>
						<label htmlFor={style}>{style}</label>
					</div>
				) )}
			</div>
		</aside>
	);
}

export default Sidebar;
