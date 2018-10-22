/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals CKEDITOR */

import React from 'react';
import PropTypes from 'prop-types';

class CKEditor extends React.Component {
	constructor( props ) {
		super( props );

		this.element = null;
		this.editor = null;
	}

	componentDidMount() {
		this.editor = this._initEditor();
	}

	componentWillUnmount() {
		this._destroyEditor();
	}

	componentDidUpdate( prevProps ) {
		if ( this.editor && prevProps.data !== this.props.data && this.editor.getData() !== this.props.data ) {
			this.editor.setData( this.props.data );
		}
	}

	render() {
		return <div ref={ ref => ( this.element = ref ) }></div>;
	}

	_initEditor() {
		const constructor = getConstructorType( this.props.type );
		const editor = CKEDITOR[ constructor ]( this.element );

		if ( this.props.data ) {
			editor.setData( this.props.data );
		}

		return editor;
	}

	_destroyEditor() {
		this.editor.destroy();

		this.editor = null;
		this.element = null;
	}
}

CKEditor.propTypes = {
	type: PropTypes.oneOf( [
		'classic',
		'inline'
	] ),
	data: PropTypes.string
};

CKEditor.defaultProps = {
	type: 'classic',
	data: ''
};

function getConstructorType( prop ) {
	if ( prop === 'inline' ) {
		return 'inline';
	}

	return 'replace';
}

export default CKEditor;
