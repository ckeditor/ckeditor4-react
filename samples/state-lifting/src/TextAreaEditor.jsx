/* eslint-disable react/prop-types */

import React from 'react';

const { useEffect, useState } = React;

function TextAreaEditor( { dispatch, state } ) {
	const [ value, setValue ] = useState();

	const handleTextAreaChange = evt => {
		const value = evt.currentTarget.value;
		setValue( value );
		dispatch( { type: 'data', payload: value } );
	};

	const handleBlur = () => {
		dispatch( { type: 'blur' } );
	};

	const handleFocus = () => {
		// CKEditor's blur kicks in later that `textarea` focus is invoked.
		setTimeout( () => {
			dispatch( { type: 'textarea' } );
		}, [ 250 ] );
	};

	useEffect( () => {
		if ( state.editorType === 'CKEditor' ) {
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
