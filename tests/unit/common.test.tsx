import * as React from 'react';

function init() {
	describe( 'common', () => {
		const requestedVersion = process.env.REQUESTED_REACT_VERSION;

		/**
		 * Ensures that runtime version of React matches requested React version.
		 * This test is intended to run through scripts that test multiple versions (e2e-runner, units-runner).
		 */
		it( 'matches requested version', async () => {
			if ( requestedVersion ) {
				expect( React.version ).toEqual( requestedVersion );
			}
		} );
	} );
}

export default init;
