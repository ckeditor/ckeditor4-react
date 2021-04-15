/* eslint-disable no-undef, mocha/no-top-level-hooks */

import JasmineDOM from '@testing-library/jasmine-dom';

// Setup DOM helpers.
beforeAll( () => {
	jasmine.getEnv().addMatchers( JasmineDOM );
} );
