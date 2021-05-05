import * as React from 'react';
// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom';
import { configure } from '@testing-library/react';
import initCommonTests from './common.test';
import initUseCKEditorTests from './useCKEditor.test';
import initUseCKEditorEventTests from './useCKEditorEvent.test';
import initCKEditorTests from './CKEditor.test';
import initRegisterEditorEventHandler from './registerEditorEventHandler.test';
import initUtilsTests from './utils.test';

describe( 'CKEditor4 React', () => {
	// Increases timeout so that CI can have a chance to capture changes.
	const timeout = 5000;
	const requestedVersion = process.env.REQUESTED_REACT_VERSION;
	const windw = window as any;
	const log = windw.console.log;

	beforeAll( () => {
		// Extends jasmine with custom RTL matchers.
		jasmine.getEnv().addMatchers( JasmineDOM );

		// Sets timeout for async utils in RTL globally.
		configure( { asyncUtilTimeout: timeout } );

		if ( !requestedVersion ) {
			console.warn(
				`REQUESTED_REACT_VERSION variable was not set. Runtime version of React is ${ React.version }.`
			);
		}
	} );

	beforeEach( async () => {
		if ( windw.CKEDITOR ) {
			// Ensures that all instances of editor are cleaned up.
			expect( Object.entries( windw.CKEDITOR.instances ).length ).toEqual( 0 );
		}
	} );

	afterEach( async () => {
		// Restores `console.log` in case it was overriden with a spy.
		windw.console.log = log;
	} );

	initCommonTests();
	initUseCKEditorTests();
	initRegisterEditorEventHandler();
	initUseCKEditorEventTests();
	initCKEditorTests();
	initUtilsTests();
} );
