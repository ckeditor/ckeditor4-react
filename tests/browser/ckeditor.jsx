/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals CKEDITOR, chai, document, setTimeout, window */

import sinonChai from 'sinon-chai';
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CKEditor from '../../src/ckeditor.jsx';
import getEditorNamespace from '../../src/getEditorNamespace.js';

const { expect, use } = chai;
use( sinonChai );
configure( { adapter: new Adapter() } );

let components = [];

CKEditor.editorUrl = 'https://cdn.ckeditor.com/4.13.1/standard-all/ckeditor.js';

describe( 'CKEditor Component', () => {
	let sandbox;

	beforeEach( () => {
		sandbox = sinon.createSandbox();
	} );

	afterEach( () => {
		const destroyPromises = [];

		components.forEach( component => {
			// Already unmounted components throw error on another unmount.
			try {
				const editor = component.instance().editor;

				if ( editor ) {
					const promise = new Promise( resolve => {
						editor.once( 'destroy', resolve );
					} );
					destroyPromises.push( promise );
				}

				// Some tricky race causes failing tests delaying unmount fixes it (#21).
				setTimeout( () => {
					component.unmount();
				} );
			} catch ( e ) {} // eslint-disable-line no-empty
		} );

		return Promise.all( destroyPromises ).then( () => {
			components = [];
			sandbox.restore();

			const containers = document.querySelectorAll( 'div' );
			containers.forEach( container => {
				document.body.removeChild( container );
			} );
		} );
	} );

	// (#48)
	it( 'has proper displayName property', () => {
		expect( CKEditor.displayName ).to.equal( 'CKEditor' );
	} );

	describe( 'mounting and types', () => {
		// This test must run as the first one, as it depends on resolving
		// the CKEditor namespace (#57)!
		it( 'does not raise element-conflict error', () => {
			sandbox.spy( console, 'error' );

			const component = createEditor();

			return waitForEditor( component ).then( () => {
				expect( console.error ).not.to.be.called;
			} );
		} );

		it( 'calls CKEDITOR.replace on mount', () => {
			sandbox.spy( CKEDITOR, 'replace' );

			const component = createEditor();

			return waitForEditor( component ).then( () => {
				expect( CKEDITOR.replace ).to.be.calledOnce;
			} );
		} );

		it( 'calls CKEDITOR.replace on mount when type is classic', () => {
			sandbox.spy( CKEDITOR, 'replace' );

			const component = createEditor( {
				type: 'classic'
			} );

			return waitForEditor( component ).then( () => {
				expect( CKEDITOR.replace ).to.be.calledOnce;
			} );
		} );

		it( 'calls CKEDITOR.inline on mount when type is inline', () => {
			sandbox.spy( CKEDITOR, 'inline' );

			const component = createEditor( {
				type: 'inline'
			} );

			return waitForEditor( component ).then( () => {
				expect( CKEDITOR.inline ).to.be.calledOnce;
			} );
		} );

		it( 'destroys editor on unmount', () => {
			sandbox.spy( CKEDITOR.editor.prototype, 'destroy' );

			const component = createEditor();

			return waitForEditor( component ).then( () => {
				component.unmount();

				expect( CKEDITOR.editor.prototype.destroy ).to.be.calledOnce;
			} );
		} );

		it( 'saves references to the editor and element', () => {
			const component = createEditor();
			const componentInstance = component.instance();

			return waitForEditor( component ).then( editor => {
				expect( componentInstance.editor ).to.equal( editor );
				expect( componentInstance.element ).to.equal( editor.element.$ );
			} ).catch( err => {
				// For unknown reason Karma hangs on some assertions in async tests.
				// This is an ugly workaround for it.
				expect.fail( err.message );
			} );
		} );

		it( 'removes references to the editor and element on unmount', () => {
			sandbox.spy( CKEDITOR.editor.prototype, 'destroy' );

			const component = createEditor();
			const componentInstance = component.instance();

			return waitForEditor( component ).then( () => {
				component.unmount();

				expect( componentInstance.editor ).to.equal( null );
				expect( componentInstance.element ).to.equal( null );
			} ).catch( err => {
				expect.fail( err.message );
			} );
		} );

		// #16
		it( 'does not throw when destroy is attempted before the editor is created', () => {
			expect( () => {
				// Dirty hack to check only the destroy logic.
				CKEditor.prototype._destroyEditor.call( {} );
			} ).not.to.throw();
		} );
	} );

	describe( '#data', () => {
		it( 'sets the initial data', () => {
			const data = '<p>Whatever, whenever.</p>';
			const component = createEditor( {
				data
			} );

			return waitForEditor( component ).then( editor => {
				expect( editor.getData().trim() ).to.equal( data );
			} ).catch( err => {
				expect.fail( err.message );
			} );
		} );

		it( 'changes are reflected in editor\'s data', () => {
			const initialData = '<p>Initial data</p>';
			const changedData = '<p>Changed data</p>';
			const component = createEditor( {
				data: initialData
			} );

			return waitForEditor( component ).then( editor => {
				sandbox.spy( editor, 'setData' );

				component.setProps( {
					data: changedData
				} );

				return waitForData( editor );
			} ).then( editor => {
				expect( editor.setData ).to.be.calledTwice;
				expect( editor.getData().trim() ).to.equal( changedData );
			} );
		} );

		it( 'does not change data if props did not change', () => {
			const data = '<p>Initial data</p>';
			const component = createEditor( {
				data
			} );

			return waitForEditor( component ).then( editor => {
				sandbox.spy( editor, 'setData' );

				component.setProps( {
					data
				} );

				expect( editor.setData ).not.to.be.called;
			} );
		} );

		it( 'does not throw when props are changed after unmounting component', () => {
			const component = createEditor();

			return waitForEditor( component ).then( () => {
				component.unmount();

				component.setProps( {
					onCustomEvent() {},
					readOnly: true
				} );
			} );
		} );
	} );

	describe( '#config', () => {
		it( 'is passed to editor', () => {
			const config = {
				width: 1618,
				height: 1618
			};
			const component = createEditor( {
				config
			} );

			return waitForEditor( component ).then( ( { config: { width, height } } ) => {
				expect( width ).to.equal( config.width );
				expect( height ).to.equal( config.height );
			} );
		} );
	} );

	describe( 'event handlers', () => {
		it( 'are bound to appropriate events', () => {
			const spy = sandbox.spy();
			const component = createEditor( {
				onCustomEvent: spy
			} );

			return waitForEditor( component ).then( editor => {
				editor.fireOnce( 'customEvent' );

				expect( spy ).to.be.calledOnce;
			} );
		} );

		it( 'receive data and editor', () => {
			const spy = sandbox.spy();
			const component = createEditor( {
				onCustomEvent: spy
			} );

			return waitForEditor( component ).then( editor => {
				const data = {
					test: true
				};

				editor.fireOnce( 'customEvent', data, editor );

				const evt = spy.args[ 0 ][ 0 ];
				expect( evt.editor ).to.equal( editor );
				expect( evt.data ).to.equal( data );
			} );
		} );

		it( 'can be dynamically added', () => {
			const spy = sandbox.spy();
			const component = createEditor();

			return waitForEditor( component ).then( editor => {
				component.setProps( {
					onCustomEvent: spy
				} );

				editor.fireOnce( 'customEvent' );

				expect( spy ).to.be.calledOnce;
			} );
		} );

		it( 'can be dynamically modified', () => {
			const spy1 = sandbox.spy();
			const spy2 = sandbox.spy();
			const component = createEditor( {
				onCustomEvent: spy1
			} );

			return waitForEditor( component ).then( editor => {
				component.setProps( {
					onCustomEvent: spy2
				} );

				editor.fireOnce( 'customEvent' );

				expect( spy1 ).not.to.be.called;
				expect( spy2 ).to.be.calledOnce;
			} );
		} );
	} );

	describe( '#readOnly', () => {
		it( 'creates editable editors by default', () => {
			const classicComponent = createEditor();
			const inlineComponent = createEditor( {
				type: 'inline'
			} );

			return waitForEditors( [
				classicComponent,
				inlineComponent
			] ).then( ( [ { readOnly: classicReadOnly }, { readOnly: inlineReadOnly } ] ) => {
				expect( classicReadOnly ).to.equal( false );
				expect( inlineReadOnly ).to.equal( false );
			} );
		} );

		it( 'creates readonly editors if prop is set to true', () => {
			const classicComponent = createEditor( {
				readOnly: true
			} );
			const inlineComponent = createEditor( {
				type: 'inline',
				readOnly: true
			} );

			return waitForEditors( [
				classicComponent,
				inlineComponent
			] ).then( ( [ { readOnly: classicReadOnly }, { readOnly: inlineReadOnly } ] ) => {
				expect( classicReadOnly ).to.equal( true );
				expect( inlineReadOnly ).to.equal( true );
			} );
		} );

		it( 'has higher priority than config.readOnly', () => {
			const component = createEditor( {
				readOnly: true,
				config: {
					readOnly: false
				}
			} );

			return waitForEditor( component ).then( ( { readOnly } ) => {
				expect( readOnly ).to.equal( true );
			} );
		} );

		it( 'can be dynamically modified', () => {
			const component = createEditor();

			return waitForEditor( component ).then( editor => {
				component.setProps( {
					readOnly: true
				} );
				expect( editor.readOnly ).to.equal( true );
			} );
		} );
	} );

	describe( '#styles', () => {
		it( 'apply styles to editor container', () => {
			const component = createEditor( {
				style: {
					marginTop: '200px'
				}
			} );

			return waitForEditor( component ).then( ( { container } ) => {
				expect( container.getStyle( 'margin-top' ) ).to.equal( '200px' );
			} );
		} );

		it( 'can be dynamically modified', () => {
			const component = createEditor();

			return waitForEditor( component ).then( ( { container } ) => {
				component.setProps( {
					style: {
						marginTop: '200px'
					}
				} );

				expect( container.getStyle( 'margin-top' ) ).to.equal( '200px' );
			} );
		} );
	} );

	// #18
	describe( '#onBeforeLoad', () => {
		it( 'receives CKEDITOR as a parameter', () => {
			const onBeforeLoad = sandbox.spy();
			const component = createEditor( { onBeforeLoad } );

			return Promise.all( [
				getEditorNamespace( CKEditor.editorUrl ),
				waitForEditor( component )
			] ).then( ( [ CKEDITOR ] ) => {
				expect( onBeforeLoad ).to.be.calledOnceWithExactly( CKEDITOR );
			} );
		} );

		it( 'is fired before creating editor instance', () => {
			const onBeforeLoad = sandbox.spy();
			const spy = sandbox.spy( CKEDITOR, 'replace' );
			const component = createEditor( { onBeforeLoad } );

			return waitForEditor( component ).then( () => {
				expect( onBeforeLoad ).to.be.calledOnce;
				expect( onBeforeLoad ).to.be.calledBefore( spy );
			} );
		} );
	} );
} );

describe( 'getEditorNamespace', () => {
	// Don't need any files – Data URLs FTW!
	const fakeScript = 'data:text/javascript;base64,d2luZG93LkNLRURJVE9SID0ge307';

	beforeEach( () => {
		delete window.CKEDITOR;
	} );

	it( 'is a function', () => {
		expect( getEditorNamespace ).to.be.a( 'function' );
	} );

	it( 'requires non-empty string as parameter', () => {
		const invalid = [
			1,
			{},
			[],
			null,
			undefined,
			''
		];

		invalid.forEach( param => {
			expect( () => {
				getEditorNamespace( param );
			} ).to.throw( TypeError, 'CKEditor URL must be a non-empty string.' );
		} );
	} );

	it( 'returns promise even if namespace is present', () => {
		window.CKEDITOR = {};

		const namespacePromise = getEditorNamespace( 'test' );
		expect( namespacePromise ).to.be.an.instanceOf( Promise );

		return namespacePromise.then( namespace => {
			expect( namespace ).to.equal( window.CKEDITOR );
		} );
	} );

	it( 'load script and resolves with loaded namespace', () => {
		return getEditorNamespace( fakeScript ).then( namespace => {
			expect( namespace ).to.equal( window.CKEDITOR );
		} );
	} );

	it( 'returns the same promise', () => {
		const promise1 = getEditorNamespace( fakeScript );
		const promise2 = getEditorNamespace( fakeScript );

		return Promise.all( [
			promise1,
			promise2
		] ).then( () => {
			expect( promise1 ).to.equal( promise2 );
		} );
	} );

	it( 'rejects with error when script cannot be loaded', () => {
		return getEditorNamespace( 'non-existent.js' ).catch( err => {
			expect( err ).to.be.instanceOf( Error );
		} );
	} );
} );

function createEditor( props = {} ) {
	const component = mount( React.createElement( CKEditor, props ), {
		attachTo: createContainer()
	} );

	components.push( component );

	return component;
}

function createContainer() {
	const container = document.createElement( 'div' );

	document.body.appendChild( container );

	return container;
}

function waitForEditors( components ) {
	const promises = components.map( component => {
		return waitForEditor( component );
	} );

	return Promise.all( promises );
}

function waitForEditor( component ) {
	return new Promise( resolve => {
		tick();

		function tick() {
			const editor = component.instance().editor;

			if ( !editor ) {
				return setTimeout( tick );
			}

			editor.once( 'instanceReady', ( { editor } ) => {
				resolve( editor );
			} );
		}
	} );
}

function waitForData( editor ) {
	return new Promise( resolve => {
		editor.once( 'dataReady', () => {
			resolve( editor );
		} );
	} );
}
