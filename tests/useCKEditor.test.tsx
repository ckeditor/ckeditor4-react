import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks/dom';
import useCKEditor from '../src/useCKEditor';

describe( 'useCKEditor', () => {
	it( 'renders correctly', async () => {
		const ref = React.createRef<any>();
		render( <div ref={ref} /> );

		const { result, waitForNextUpdate } = renderHook( () =>
			useCKEditor( { ref } )
		);

		expect( result.current.editor ).toBeUndefined();
		await waitForNextUpdate();
		expect( result.current.editor ).toBeDefined();
	} );
} );
