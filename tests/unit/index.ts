import * as React from 'react';
// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom';
import { configure } from '@testing-library/react';
import initCommonTests from './common.test';
import initUseCKEditorTests from './useCKEditor.test';
import initUseCKEditorEventTests from './useCKEditorEvent.test';
import initCKEditorTests from './CKEditor.test';
import initUtilsTests from './utils.test';

describe( 'CKEditor4 React', () => {
	// Increase timeout so that CI can have a chance to capture changes.
	const timeout = 5000;
	const requestedVersion = process.env.REQUESTED_REACT_VERSION;
	const windw = window as any;
	const log = windw.console.log;

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

	beforeEach( async () => {
		if ( windw.CKEDITOR ) {
			/**
			 * Ensure that all instances of editor are cleaned up.
			 * Then derefrence namespace so that a new one is initialized for each test.
			 */
			expect( Object.entries( windw.CKEDITOR.instances ).length ).toEqual( 0 );
			delete windw.CKEDITOR;
		}
	} );

	afterEach( async () => {
		// Restore console.log in case a test has overriden it with a spy.
		windw.console.log = log;
	} );

	initCommonTests();
	initUseCKEditorTests();
	initUseCKEditorEventTests();
	initCKEditorTests();
	initUtilsTests();
} );
