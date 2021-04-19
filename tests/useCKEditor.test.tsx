import { renderHook } from '@testing-library/react-hooks/dom';
import { createDivRef } from './utils';
import useCKEditor from '../src/useCKEditor';

describe( 'useCKEditor', () => {
	it( 'creates editor instance', async () => {
		const ref = createDivRef();
		const { result, waitForNextUpdate } = renderHook( () =>
			useCKEditor( { element: ref.current } )
		);
		expect( result.current.editor ).toBeUndefined();
		await waitForNextUpdate();
		expect( result.current.editor ).toBeDefined();
	} );

	it( 'gets correct status', async () => {
		const ref = createDivRef();
		const { result, waitForNextUpdate } = renderHook( () =>
			useCKEditor( { element: ref.current } )
		);
		expect( result.current.editorState ).toEqual( 'loading' );
		await waitForNextUpdate();
		expect( result.current.editorState ).toEqual( 'unloaded' );
		await waitForNextUpdate();
		expect( result.current.editorState ).toEqual( 'loaded' );
		await waitForNextUpdate();
		expect( result.current.editorState ).toEqual( 'ready' );
	} );
} );
