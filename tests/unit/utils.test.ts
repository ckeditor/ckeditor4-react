import { uniqueName, camelToKebab, getStyle } from '../../src/utils';

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

		describe( 'getStyle', () => {
			it( 'returns `hidden` styles for classic editor', () => {
				expect( getStyle( 'classic' ) ).toEqual( {
					visibility: 'hidden',
					display: 'none'
				} );
				expect( getStyle( 'classic', 'ready' ) ).toEqual( {
					visibility: 'hidden',
					display: 'none'
				} );
				expect(
					getStyle( 'classic', 'ready', { border: '1px solid black' } )
				).toEqual( {
					visibility: 'hidden',
					display: 'none'
				} );
			} );

			it( 'returns `hidden` styles for inline editor before it is ready', () => {
				expect( getStyle( 'inline' ) ).toEqual( {
					visibility: 'hidden',
					display: 'none'
				} );
			} );

			it( 'returns undefined for inline editor before once it is ready', () => {
				expect( getStyle( 'inline', 'ready' ) ).toBeUndefined();
			} );

			it( 'returns custom container style for inline editor once it is ready', () => {
				expect(
					getStyle( 'inline', 'ready', { border: '1px solid black' } )
				).toEqual( { border: '1px solid black' } );
			} );
		} );
	} );
}

export default init;
