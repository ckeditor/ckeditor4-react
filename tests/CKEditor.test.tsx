import * as React from 'react';
import { render, screen } from '@testing-library/react';
import CKEditor from '../src/CKEditor';

describe( 'CKEditor' , () => {
	it( 'renders correctly', () => {
	  render(<CKEditor />);
	  expect(screen.getByText( 'Test' )).toBeVisible();
	});
});
