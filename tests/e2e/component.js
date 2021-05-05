/* eslint-env node */
/* eslint-disable mocha/handle-done-callback */

// The following variables will be set via Nightwatch runner.
const reactVersion = process.env.REQUESTED_REACT_VERSION;
const localServer = process.env.NIGHTWATCH_LOCAL_SERVER;
const testSample = process.env.NIGHTWATCH_TEST_SAMPLE;
const bsBrowser = process.env.BROWSER_STACK_BROWSER;

/**
 * Test suite for `samples/component` example.
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

	test( 'editor initializes correctly', async browser => {
		await browser.frame( 0 );
		await browser.assert.containsText(
			'.cke_editable',
			'Hello from classic editor!'
		);
		await browser.assert.visible( {
			selector: '//body[@contenteditable="true"]',
			locateStrategy: 'xpath'
		} );
	} );

	test( 'editor toggles between classic and inline', async browser => {
		await browser.frame( 0 );
		await browser.assert.containsText(
			'.cke_editable',
			'Hello from classic editor!'
		);
		await browser.frame( null );
		await browser.click( 'input[id=inline]' );
		await browser.assert.containsText(
			'.cke_editable_inline',
			'Hello from inline editor!'
		);
		await browser.click( 'input[id=classic]' );
		await browser.frame( 0 );
		await browser.assert.containsText(
			'.cke_editable',
			'Hello from classic editor!'
		);
	} );

	test( 'editor toggles read-only mode', async browser => {
		await browser.click( 'input[id=read-only]' );
		await browser.frame( 0 );
		await browser.assert.visible( {
			selector: '//body[@contenteditable="false"]',
			locateStrategy: 'xpath'
		} );
		await browser.frame( null );
		await browser.click( 'input[id=read-only]' );
		await browser.frame( 0 );
		await browser.assert.visible( {
			selector: '//body[@contenteditable="true"]',
			locateStrategy: 'xpath'
		} );
	} );

	test( 'editor changes style', async browser => {
		await browser.click( 'input[id=blue]' );
		await checkBorderStyle( 'blue' );
		await browser.click( 'input[id=green]' );
		await checkBorderStyle( 'green' );

		async function checkBorderStyle( color ) {
			if ( [ 'ie', 'safari' ].indexOf( bsBrowser ) !== -1 ) {
				await browser.assert.attributeContains(
					'.cke',
					'style',
					`order: 1px solid ${ color }`
				);
			} else {
				await browser.assert.attributeContains(
					'.cke',
					'style',
					`border-color: ${ color }`
				);
			}
		}
	} );
} );
