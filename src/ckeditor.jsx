/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

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

		/* istanbul ignore next */
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
		return <div style={ this.props.style } ref={ ref => ( this.element = ref ) }></div>;
	}

	_initEditor() {
		this.props.config.readOnly = this.props.readOnly;

		getEditorNamespace( CKEditor.editorUrl ).then( CKEDITOR => {
			const constructor = this.props.type === 'inline' ? 'inline' : 'replace';

			if ( this.props.onBeforeLoad ) {
				this.props.onBeforeLoad( CKEDITOR );
			}

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
		} ).catch( console.error );
	}

	_attachEventHandlers( prevProps = {} ) {
		const props = this.props;

		Object.keys( this.props ).forEach( propName => {
			if ( !propName.startsWith( 'on' ) || prevProps[ propName ] === props[ propName ] ) {
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
		if ( this.editor ) {
			this.editor.destroy();
		}

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
	readOnly: PropTypes.bool,
	onBeforeLoad: PropTypes.func
};

CKEditor.defaultProps = {
	type: 'classic',
	data: '',
	config: {},
	readOnly: false
};

CKEditor.editorUrl = 'https://cdn.ckeditor.com/4.13.1/standard-all/ckeditor.js';
CKEditor.displayName = 'CKEditor';

export default CKEditor;
