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
		this._initEditor();
	}

	componentWillUnmount() {
		this._destroyEditor();
	}

	componentDidUpdate( prevProps ) {
		if ( this.editor && prevProps.data !== this.props.data && this.editor.getData() !== this.props.data ) {
			this.editor.setData( this.props.data );
		}

		this._attachEventHandlers( prevProps );
	}

	render() {
		return <div ref={ ref => ( this.element = ref ) }></div>;
	}

	_initEditor() {
		const constructor = getConstructorType( this.props.type );
		const editor = this.editor = CKEDITOR[ constructor ]( this.element, this.props.config );

		this._attachEventHandlers();

		if ( this.props.data ) {
			editor.setData( this.props.data );
		}

		return editor;
	}

	_attachEventHandlers( prevProps = {} ) {
		const props = this.props;

		Object.keys( this.props ).forEach( propName => {
			if ( propName.indexOf( 'on' ) !== 0 || prevProps[ propName ] === props[ propName ] ) {
				return;
			}

			this._attachEventHandler( propName, prevProps[ propName ] );
		} );
	}

	_attachEventHandler( propName, prevHandler ) {
		const evtName = `${ propName[ 2 ].toLowerCase() }${ propName.substr( 3 ) }`;

		if ( prevHandler ) {
			this.editor.removeListener( evtName, prevHandler );
		}

		this.editor.on( evtName, this.props[ propName ] );
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
	data: PropTypes.string,
	config: PropTypes.object
};

CKEditor.defaultProps = {
	type: 'classic',
	data: '',
	config: {}
};

function getConstructorType( prop ) {
	if ( prop === 'inline' ) {
		return 'inline';
	}

	return 'replace';
}

export default CKEditor;
