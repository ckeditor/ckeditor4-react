/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';

import CKEditor from '../../src/ckeditor.jsx';

describe( 'CKEditor Component SSR', () => {
	describe( 'basic rendering', () => {
		it( 'returns appropriate HTML', () => {
			const expected = '<div contenteditable="true" data-reactroot=""></div>';
			const rendered = ReactDOMServer.renderToString( <CKEditor /> );

			expect( rendered ).to.equal( expected );
		} );
	} );
} );
