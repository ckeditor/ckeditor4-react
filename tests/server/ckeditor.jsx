/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';

import CKEditorDev from '../../src/ckeditor.jsx';
import CKEditorBuilt from '../../dist/ckeditor.js';

describe( 'CKEditor Component SSR', () => {
	describe( 'basic rendering', () => {
		createTest( 'returns appropriate HTML', CKEditor => {
			const expected = '<div data-reactroot=""></div>';
			const rendered = ReactDOMServer.renderToString( <CKEditor /> );

			expect( rendered ).to.equal( expected );
		} );
	} );
} );

function createTest( name, test ) {
	it( `${ name } (dev)`, () => {
		test( CKEditorDev );
	} );

	it( `${ name } (built)`, () => {
		test( CKEditorBuilt );
	} );
}
