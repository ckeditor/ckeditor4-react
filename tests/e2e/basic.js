/* eslint-env node */

module.exports = {
	'editor is visible'( browser ) {
		browser
			.url( 'http://localhost:8080' )
			.waitForElementPresent( 'body', 1000 )
			.assert.visible( { selector: '.cke_editor_editor1' } )
			.end();
	},
	'init content is set'( browser ) {
		browser
			.url( 'http://localhost:8080' )
			.waitForElementPresent( 'body', 1000 )
			.frame( 0 )
			.assert.containsText(
				{ selector: '.cke_editable' },
				'Hello world!'
			)
			.end();
	}
};
