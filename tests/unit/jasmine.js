/* eslint-disable no-undef,mocha/no-top-level-hooks */

import JasmineDOM from '@testing-library/jasmine-dom';

beforeAll( () => {
	jasmine.getEnv().addMatchers( JasmineDOM );
} );
