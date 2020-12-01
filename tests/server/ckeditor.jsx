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
		it( 'returns appropriate HTML (dev)', () => {
			const expected = '<div data-reactroot=""></div>';
			const rendered = ReactDOMServer.renderToString( <CKEditorDev /> );

			expect( rendered ).to.equal( expected );
		} );

		it( 'returns appropriate HTML (built)', () => {
			const expected = '<div data-reactroot=""></div>';
			const rendered = ReactDOMServer.renderToString( <CKEditorBuilt /> );

			expect( rendered ).to.equal( expected );
		} );
	} );
} );
