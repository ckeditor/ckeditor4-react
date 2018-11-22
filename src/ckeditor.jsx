/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals window */

import React from 'react';
import PropTypes from 'prop-types';
import getEditorNamespace from './getEditorNamespace.js';

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
		const { props, editor } = this;

		if ( !editor ) {
			return;
		}

		if ( prevProps.data !== props.data && editor.getData() !== props.data ) {
			editor.setData( props.data );
		}

		if ( prevProps.readOnly !== props.readOnly ) {
			editor.setReadOnly( props.readOnly );
		}

		if ( prevProps.style !== props.style ) {
			editor.container.setStyles( props.style );
		}

		this._attachEventHandlers( prevProps );
	}

	render() {
		return <div contentEditable="true" style={ this.props.style } ref={ ref => ( this.element = ref ) }></div>;
	}

	_initEditor() {
		this.props.config.readOnly = this.props.readOnly;

		getEditorNamespace( CKEditor.editorURL ).then( CKEDITOR => {
			const constructor = getConstructorType( this.props.type );

			const editor = this.editor = CKEDITOR[ constructor ]( this.element, this.props.config );

			this._attachEventHandlers();

			if ( this.props.style && this.props.type !== 'inline' ) {
				editor.on( 'loaded', () => {
					editor.container.setStyles( this.props.style );
				} );
			}

			if ( this.props.data ) {
				editor.setData( this.props.data );
			}
		} ).catch( window.console.error );
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
	config: PropTypes.object,
	style: PropTypes.object,
	readOnly: PropTypes.bool
};

CKEditor.defaultProps = {
	type: 'classic',
	data: '',
	config: {},
	readOnly: false
};

CKEditor.editorURL = 'https://cdn.ckeditor.com/4.11.1/standard-all/ckeditor.js';

function getConstructorType( prop ) {
	if ( prop === 'inline' ) {
		return 'inline';
	}

	return 'replace';
}

export default CKEditor;
