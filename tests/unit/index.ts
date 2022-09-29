import * as React from 'react';
// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom';
import { configure } from '@testing-library/react';
import initCommonTests from './common.test';
import initUseCKEditorTests from './useCKEditor.test';
import initCKEditorTests from './CKEditor.test';
import initRegisterEditorEventHandler from './registerEditorEventHandler.test';
import initUtilsTests from './utils.test';
import initEventsTests from './events.test';

describe( 'CKEditor4 React', () => {
	// Increases timeout so that CI can have a chance to capture changes.
	const timeout = 5000;
	const requestedVersion = process.env.REQUESTED_REACT_VERSION;

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

	initCommonTests();
	initUseCKEditorTests();
	initRegisterEditorEventHandler();
	initCKEditorTests();
	initUtilsTests();
	initEventsTests();
} );
