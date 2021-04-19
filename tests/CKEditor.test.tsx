import * as React from 'react';
import { render } from '@testing-library/react';
import { findByEditorContent } from './utils';
import CKEditor from '../src/CKEditor';

describe( 'CKEditor', () => {
	it( 'sets initial data', async () => {
		render( <CKEditor initData="Hello world!" /> );
		expect( await findByEditorContent( 'Hello world!' ) ).toBeVisible();
	} );
} );
