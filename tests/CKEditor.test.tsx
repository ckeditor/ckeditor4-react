import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CKEditor from '../src/CKEditor';

describe( 'CKEditor', () => {
	it( 'renders correctly', async () => {
		render( <CKEditor initData="Init data" /> );

		expect( screen.queryByText( 'Init data' ) ).not.toBeInTheDocument();
		await waitFor(
			() => {
				return new Promise( r => {
					setTimeout( () => {
						screen.debug();
						r();
					}, 8000 );
				} );
			},
			{ timeout: 10000 }
		);
	}, 10000 );
} );
