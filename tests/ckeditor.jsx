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
} );

function waitForEditor() {
	return new Promise( resolve => {
		CKEDITOR.once( 'instanceReady', ( { editor } ) => {
			resolve( editor );
		} );
	} );
}
