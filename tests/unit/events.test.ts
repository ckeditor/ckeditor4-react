import {
	prefixEventName,
	stripPrefix,
	eventNameToHandlerName,
	handlerNameToEventName
} from '../../src/events';

function init() {
	describe( 'events', () => {
		describe( 'prefixEventName', () => {
			it( 'prefixes event name', () => {
				expect( prefixEventName( 'instanceReady' ) ).toEqual(
					'__CKE__instanceReady'
				);
			} );
		} );

		describe( 'stripPrefix', () => {
			it( 'strips prefix', () => {
				expect( stripPrefix( '__CKE__instanceReady' ) ).toEqual(
					'instanceReady'
				);
			} );
		} );

		describe( 'eventNameToHandlerName', () => {
			it( 'generates event handler name', () => {
				expect( eventNameToHandlerName( 'instanceReady' ) ).toEqual(
					'onInstanceReady'
				);
			} );
		} );

		describe( 'handlerNameToEventName', () => {
			it( 'generates event name from handler name', () => {
				expect( handlerNameToEventName( 'onInstanceReady' ) ).toEqual(
					'instanceReady'
				);
			} );
		} );
	} );
}

export default init;
