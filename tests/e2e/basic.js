/* eslint-env node */
/* eslint-disable mocha/handle-done-callback */

// The following variables will be set via Nightwatch runner.
const reactVersion = process.env.REQUESTED_REACT_VERSION;
const localServer = process.env.NIGHTWATCH_LOCAL_SERVER;
const testSample = process.env.NIGHTWATCH_TEST_SAMPLE;

/**
 * Test suite for `samples/basic` example.
 */
describe( `${ testSample } - react v${ reactVersion } - sanity checks`, () => {
	beforeEach( async browser => {
		await browser.url( localServer );
		await browser.waitForElementPresent( 'body', 1000 );
	} );

	test( 'requested version of React is running', async browser => {
		await browser.assert.visible(
			'.react-version',
			`Running React v${ reactVersion }`
		);
	} );

	test( 'editor is visible', async browser => {
		await browser.assert.visible( '.cke_1' );
	} );

	test( 'editor initial content is set', async browser => {
		await browser.frame( 0 );
		await browser.assert.containsText( '.cke_editable', 'Hello world!' );
	} );
} );
