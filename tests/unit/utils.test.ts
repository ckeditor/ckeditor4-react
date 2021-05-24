import { uniqueName, camelToKebab, getRootStyle } from '../../src/utils';

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

		describe( 'getRootStyle', () => {
			it( 'returns default style if editor is not ready', () => {
				expect( getRootStyle( null, 'loaded' ) ).toEqual( {
					visibility: 'hidden'
				} );
			} );

			it( 'returns passed style if editor is ready', () => {
				expect( getRootStyle( { borderColor: 'blue' }, 'ready' ) ).toEqual( {
					borderColor: 'blue'
				} );
			} );

			it( 'returns undefined if no style was provided but editor is ready', () => {
				expect( getRootStyle( null, 'ready' ) ).toBeUndefined();
			} );
		} );
	} );
}

export default init;
