import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks/dom';
import { createDivRef, findByEditorContent } from './utils';
import { CKEditor, useCKEditor } from '../src';

describe( 'CKEditor4 React', () => {
	const requestedVersion = process.env.REQUESTED_REACT_VERSION;

	beforeAll( () => {
		if ( !requestedVersion ) {
			console.warn(
				`REQUESTED_REACT_VERSION variable was not set. Runtime version of React is ${ React.version }.`
			);
		}
	} );

	describe( 'common', () => {
		// Ensures that runtime version of React matches requested React version.
		// This test is intended to run through react-tester.
		it( 'matches requested version', async () => {
			if ( requestedVersion ) {
				expect( React.version ).toEqual( requestedVersion );
			}
		} );
	} );

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

	describe( 'CKEditor', () => {
		it( 'sets initial data', async () => {
			render( <CKEditor initData="Hello world!" /> );
			expect( await findByEditorContent( 'Hello world!' ) ).toBeVisible();
		} );
	} );
} );
