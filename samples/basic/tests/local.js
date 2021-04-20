/* eslint-env node */

module.exports = {
	'BrowserStack Local Testing'( browser ) {
		browser
			.url( 'http://localhost:8080' )
			.waitForElementVisible( 'body', 1000 )
			.assert.visible( { selector: '.cke_editor_editor1' } )
			.end();
	}
};
