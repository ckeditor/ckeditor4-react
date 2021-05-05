import { uniqueName, camelToKebab } from '../../src/utils';

function init() {
	describe( 'utils', () => {
		describe( 'camelToKebab', () => {
			it( 'transforms `camelCaseValue` into `kebab-case-value`', () => {
				expect( camelToKebab( 'camelCaseValue' ) ).toEqual(
					'camel-case-value'
				);
				expect( camelToKebab( 'CamelCaseValue' ) ).toEqual(
					'camel-case-value'
				);
			} );
		} );

		describe( 'uniqueName', () => {
			it( 'generates different string values', () => {
				/* eslint-disable-next-line no-self-compare */
				expect( uniqueName() === uniqueName() ).toBe( false );
			} );
		} );
	} );
}

export default init;
