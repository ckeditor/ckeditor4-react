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

	render() {
		return <div ref={ ref => ( this.element = ref ) }></div>;
	}

	_initEditor() {
		const constructor = getConstructorType( this.props.type );

		return CKEDITOR[ constructor ]( this.element );
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
	] )
};

CKEditor.defaultProps = {
	type: 'classic'
};

function getConstructorType( prop ) {
	if ( prop === 'inline' ) {
		return 'inline';
	}

	return 'replace';
}

export default CKEditor;
