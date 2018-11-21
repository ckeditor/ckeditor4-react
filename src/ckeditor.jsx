/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals window */

import React from 'react';
import PropTypes from 'prop-types';
import loadScript from 'load-script';

const CKEDITOR_CDN_URL = 'https://cdn.ckeditor.com/4.11.1/standard-all/ckeditor.js';

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
		if ( !this.editor ) {
			return;
		}

		if ( prevProps.data !== this.props.data && this.editor.getData() !== this.props.data ) {
			this.editor.setData( this.props.data );
		}

		if ( prevProps.readOnly !== this.props.readOnly ) {
			this.editor.setReadOnly( this.props.readOnly );
		}

		this._attachEventHandlers( prevProps );
	}

	render() {
		return <div contentEditable="true" style={ this.props.style } ref={ ref => ( this.element = ref ) }></div>;
	}

	_initEditor() {
		this.props.config.readOnly = this.props.readOnly;

		getEditorNamespace().then( CKEDITOR => {
			const constructor = getConstructorType( this.props.type );

			const editor = this.editor = CKEDITOR[ constructor ]( this.element, this.props.config );

			this._attachEventHandlers();

			if ( this.props.style && this.props.type != 'inline' ) {
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

function getConstructorType( prop ) {
	if ( prop === 'inline' ) {
		return 'inline';
	}

	return 'replace';
}

function getEditorNamespace() {
	if ( 'CKEDITOR' in window ) {
		return Promise.resolve( window.CKEDITOR );
	} else if ( !getEditorNamespace.promise ) {
		getEditorNamespace.promise = new Promise( ( scriptResolve, scriptReject ) => {
			loadScript( CKEditor.customUrl || CKEDITOR_CDN_URL, err => {
				if ( err ) {
					scriptReject( err );
				} else {
					scriptResolve( window.CKEDITOR );
					getEditorNamespace.promise = undefined;
				}
			} );
		} );
	}

	return getEditorNamespace.promise;
}

export default CKEditor;
