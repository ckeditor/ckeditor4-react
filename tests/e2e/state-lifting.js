/* eslint-env node */
/* eslint-disable mocha/handle-done-callback */

// The following variables will be set via Nightwatch runner.
const reactVersion = process.env.REQUESTED_REACT_VERSION;
const localServer = process.env.NIGHTWATCH_LOCAL_SERVER;
const testSample = process.env.NIGHTWATCH_TEST_SAMPLE;

/**
 * Test suite for `samples/state-lifting` example.
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

	test( 'editor sets data from outside - text area to editor', async browser => {
		await browser.setValue( 'xpath', '//textarea', 'textarea' );
		await browser.assert.containsText( '.preview', 'textarea' );
		await browser.frame( 0 );
		await browser.assert.containsText( '.cke_editable', 'textarea' );
	} );

	test( 'editor sets data from outside - editor to text area', async browser => {
		await browser.frame( 0 );
		await browser.setValue(
			'xpath',
			'//body[@contenteditable="true"]',
			'CKEditor'
		);
		await browser.frame( null );
		await browser.assert.containsText(
			{ selector: '//textarea', locateStrategy: 'xpath' },
			'CKEditor'
		);
		await browser.assert.containsText( '.preview', 'CKEditor' );
	} );
} );
