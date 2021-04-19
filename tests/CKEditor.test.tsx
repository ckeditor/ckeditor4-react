import * as React from 'react';
import { render, screen } from '@testing-library/react';
import CKEditor from '../src/CKEditor';

describe( 'CKEditor', () => {
	it( 'renders correctly', async () => {
		render( <CKEditor initData="Init data" /> );

		expect( screen.queryByText( 'Init data' ) ).not.toBeInTheDocument();
	} );
} );
