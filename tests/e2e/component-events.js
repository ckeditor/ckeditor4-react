/* eslint-env node */
/* eslint-disable mocha/handle-done-callback */

// The following variables will be set via Nightwatch runner.
const reactVersion = process.env.REQUESTED_REACT_VERSION;
const localServer = process.env.NIGHTWATCH_LOCAL_SERVER;
const testSample = process.env.NIGHTWATCH_TEST_SAMPLE;

/**
 * Test suite for `samples/component-events` example.
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

	test( 'editor events are logged in correct order', async browser => {
		await browser.assert.containsText(
			{
				selector: '//tbody/tr[4]',
				locateStrategy: 'xpath'
			},
			'namespaceLoaded'
		);
		await browser.assert.containsText(
			{
				selector: '//tbody/tr[3]',
				locateStrategy: 'xpath'
			},
			'beforeLoad'
		);
		await browser.assert.containsText(
			{
				selector: '//tbody/tr[2]',
				locateStrategy: 'xpath'
			},
			'loaded'
		);
		await browser.assert.containsText(
			{
				selector: '//tbody/tr[1]',
				locateStrategy: 'xpath'
			},
			'instanceReady'
		);
		await browser.click( '.btn' );
		await browser.assert.containsText(
			{
				selector: '//tbody/tr[4]',
				locateStrategy: 'xpath'
			},
			'destroy'
		);
		await browser.assert.containsText(
			{
				selector: '//tbody/tr[1]',
				locateStrategy: 'xpath'
			},
			'instanceReady'
		);
		await browser.frame( 0 );
		await browser.click( '.cke_editable' );
		await browser.frame( null );
		await browser.click( 'xpath', '//table' );
		await browser.assert.containsText(
			{
				selector: '//tbody/tr[1]',
				locateStrategy: 'xpath'
			},
			'blur'
		);
		await browser.assert.containsText(
			{
				selector: '//tbody/tr[2]',
				locateStrategy: 'xpath'
			},
			'focus'
		);
	} );
} );
