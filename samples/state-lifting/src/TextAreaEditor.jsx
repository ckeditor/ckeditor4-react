/* eslint-disable react/prop-types */

import React from 'react';

const { useEffect, useState } = React;

function TextAreaEditor( { dispatch, state } ) {
	const [ value, setValue ] = useState();

	const handleTextAreaChange = evt => {
		const value = evt.currentTarget.value;
		setValue( value );
		dispatch( { type: 'textareaData', payload: value } );
	};

	const handleBlur = () => {
		dispatch( { type: 'textareaBlur' } );
	};

	const handleFocus = () => {
		dispatch( { type: 'textareaFocus' } );
	};

	/**
	 * Sets text area value if it comes from a different source.
	 */
	useEffect( () => {
		if ( state.currentEditor === 'CKEditor' ) {
			setValue( state.data );
		}
	}, [ state ] );

	return (
		<textarea
			value={value}
			onChange={handleTextAreaChange}
			onFocus={handleFocus}
			onBlur={handleBlur}
		/>
	);
}

export default TextAreaEditor;
