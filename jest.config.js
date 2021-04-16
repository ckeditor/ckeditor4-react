/* eslint-env node */

module.exports = {
	setupFilesAfterEnv: [ './tests/setup/setupFilesAfterEnv.js' ],
	testMatch: [ '**/tests/*.test.tsx' ],
	testEnvironmentOptions: {
		resources: 'usable',
		runScripts: 'dangerously'
	}
};
