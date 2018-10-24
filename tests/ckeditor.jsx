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

describe( 'CKEditor Component', () => {
	let component;
	let sandbox;
	let container;

	beforeEach( () => {
		sandbox = sinon.createSandbox();
		container = document.createElement( 'div' );

		document.body.appendChild( container );
	} );

	afterEach( () => {
		if ( component ) {
			component.unmount();
		}

		sandbox.restore();
		document.body.removeChild( container );
	} );

	describe( 'mounting and types', () => {
		it( 'calls CKEDITOR.replace on mount', () => {
			sandbox.spy( CKEDITOR, 'replace' );

			component = mount( <CKEditor />, {
				attachTo: container
			} );

			return waitForEditor().then( () => {
				expect( CKEDITOR.replace ).to.be.calledOnce;
			} );
		} );

		it( 'calls CKEDITOR.replace on mount when type is classic', () => {
			sandbox.spy( CKEDITOR, 'replace' );

			component = mount( <CKEditor type="classic" />, {
				attachTo: container
			} );

			return waitForEditor().then( () => {
				expect( CKEDITOR.replace ).to.be.calledOnce;
			} );
		} );

		it( 'calls CKEDITOR.inline on mount when type is inline', () => {
			sandbox.spy( CKEDITOR, 'inline' );

			component = mount( <CKEditor type="inline" />, {
				attachTo: container
			} );

			return waitForEditor().then( () => {
				expect( CKEDITOR.inline ).to.be.calledOnce;
			} );
		} );

		it( 'destroys editor on unmount', () => {
			sandbox.spy( CKEDITOR.editor.prototype, 'destroy' );

			component = mount( <CKEditor />, {
				attachTo: container
			} );

			return waitForEditor().then( () => {
				component.unmount();
				component = null;

				expect( CKEDITOR.editor.prototype.destroy ).to.be.calledOnce;
			} );
		} );

		it( 'saves references to the editor and element', () => {
			component = mount( <CKEditor />, {
				attachTo: container
			} );
			const componentInstance = component.instance();

			return waitForEditor().then( editor => {
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

			component = mount( <CKEditor />, {
				attachTo: container
			} );
			const componentInstance = component.instance();

			return waitForEditor().then( () => {
				component.unmount();
				component = null;

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
			component = mount( <CKEditor data={data} />, {
				attachTo: container
			} );

			return waitForEditor().then( editor => {
				expect( editor.getData().trim() ).to.equal( data );
			} ).catch( err => {
				expect.fail( err.message );
			} );
		} );

		it( 'changes are reflected in editor\'s data', () => {
			const initialData = '<p>Initial data</p>';
			const changedData = '<p>Changed data</p>';
			component = mount( <CKEditor data={initialData} />, {
				attachTo: container
			} );

			return waitForEditor().then( editor => {
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
			component = mount( <CKEditor data={data} />, {
				attachTo: container
			} );

			return waitForEditor().then( editor => {
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
			component = mount( <CKEditor config={config} />, {
				attachTo: container
			} );

			return waitForEditor().then( ( { config: { width, height } } ) => {
				expect( width ).to.equal( config.width );
				expect( height ).to.equal( config.height );
			} );
		} );
	} );

	describe( 'event handlers', () => {
		it( 'are bound to appropriate events', () => {
			const spy = sandbox.spy();
			component = mount( <CKEditor onCustomEvent={spy} />, {
				attachTo: container
			} );

			return waitForEditor().then( editor => {
				editor.fireOnce( 'customEvent' );

				expect( spy ).to.be.calledOnce;
			} );
		} );

		it( 'receive data and editor', () => {
			const spy = sandbox.spy();
			component = mount( <CKEditor onCustomEvent={spy} />, {
				attachTo: container
			} );

			return waitForEditor().then( editor => {
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
			component = mount( <CKEditor />, {
				attachTo: container
			} );

			return waitForEditor().then( editor => {
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
			component = mount( <CKEditor onCustomEvent={spy1} />, {
				attachTo: container
			} );

			return waitForEditor().then( editor => {
				component.setProps( {
					onCustomEvent: spy2
				} );

				editor.fireOnce( 'customEvent' );

				expect( spy1 ).not.to.be.called;
				expect( spy2 ).to.be.calledOnce;
			} );
		} );
	} );
} );

function waitForEditor() {
	return new Promise( resolve => {
		CKEDITOR.once( 'instanceReady', ( { editor } ) => {
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
