/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals CKEDITOR, chai, document */

import sinonChai from 'sinon-chai';
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CKEditor from '../src/ckeditor.jsx';

const { expect, use } = chai;
use( sinonChai );
configure( { adapter: new Adapter() } );

let components = [];

describe( 'CKEditor Component', () => {
	let sandbox;

	beforeEach( () => {
		sandbox = sinon.createSandbox();
	} );

	afterEach( () => {
		components.forEach( component => {
			// Already unmounted components throw error on another unmount.
			try {
				component.unmount();
			} catch ( e ) {} // eslint-disable-line no-empty
		} );
		components = [];

		sandbox.restore();

		const containers = document.querySelectorAll( 'div' );
		containers.forEach( container => {
			document.body.removeChild( container );
		} );
	} );

	describe( 'mounting and types', () => {
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
	const editor = component.instance().editor;

	return new Promise( resolve => {
		editor.once( 'instanceReady', ( { editor } ) => {
			resolve( editor );
		} );
	} );
}

function waitForData( editor ) {
	return new Promise( resolve => {
		editor.once( 'dataReady', () => {
			resolve( editor );
		} );
	} );
}
