import * as React from 'react';
import { configure, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks/dom';
import { createDivRef, findByEditorContent } from './utils';
import { CKEditor, useCKEditor } from '../../src';

// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom';

describe( 'CKEditor4 React', () => {
	// Increase timeout so that CI can have a chance to capture changes.
	const timeout = 5000;
	const requestedVersion = process.env.REQUESTED_REACT_VERSION;

	beforeAll( () => {
		// Extend jasmine with custom RTL matchers
		jasmine.getEnv().addMatchers( JasmineDOM );

		// Timeout for async utils in RTL can be set globally
		configure( { asyncUtilTimeout: timeout } );

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
			await waitForNextUpdate( { timeout } );
			expect( result.current.editorState ).toEqual( 'unloaded' );
			await waitForNextUpdate( { timeout } );
			expect( result.current.editorState ).toEqual( 'loaded' );
			await waitForNextUpdate( { timeout } );
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
