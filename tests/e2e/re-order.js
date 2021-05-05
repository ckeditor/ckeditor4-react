/* eslint-env node */
/* eslint-disable mocha/handle-done-callback */

// The following variables will be set via Nightwatch runner.
const reactVersion = process.env.REQUESTED_REACT_VERSION;
const localServer = process.env.NIGHTWATCH_LOCAL_SERVER;
const testSample = process.env.NIGHTWATCH_TEST_SAMPLE;

/**
 * Test suite for `samples/re-order` example.
 */
describe( `${ testSample } - react v${ reactVersion }`, () => {
	beforeEach( async browser => {
		await browser.url( localServer );
		await browser.waitForElementPresent( 'body', 1000 );
	} );

	test( 'requested version of React is running', async browser => {
		await browser.assert.visible(
			{
				selector: '//footer',
				locateStrategy: 'xpath'
			},
			`React v${ reactVersion }`
		);
	} );

	test( 'editor is visible', async browser => {
		await browser.assert.visible( '.cke_1' );
	} );

	test( 'editors initialize correctly and keep their values after re-ordering', async browser => {
		await checkValues();
		await browser.click( '.btn' );
		await checkValues();

		async function checkValues() {
			for ( const value of [ 'toast', 'bagel', 'taco', 'avocado' ] ) {
				// Checks inline editor
				await browser.assert.containsText( `#${ value }-inline`, value );

				// Checks classic editor
				await browser.assert.visible( `#cke_${ value }` );

				/**
				 * Asserting content of randomly ordered iframes seems to be non-trivial task in Nightwatch.
				 * The code below works fine on some browsers only.
				 */

				const {
					value: { ELEMENT }
				} = await browser.element(
					'xpath',
					`//div[@id='cke_${ value }']//iframe`
				);
				await browser.frame( { ELEMENT } );
				await browser.assert.containsText( '.cke_editable', value );
				await browser.frame( null );
			}
		}
	} );
} );
