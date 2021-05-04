/* eslint-env node */

/**
 * !!! Important !!!
 *
 * Nightwatch for BrowserStack is supposed to be run via `scripts/nightwatch-runner.js`.
 */

// The following environment variables must be set (e.g. in .bashrc or via CLI) before running `nightwatch-runner`.
const bsUser = process.env.BROWSER_STACK_USERNAME;
const bsKey = process.env.BROWSER_STACK_ACCESS_KEY;
const bsBrowser = process.env.BROWSER_STACK_BROWSER;

// The following environment variables should be set before running `nightwatch-runner` but are optional.
const bsBuildName = process.env.BROWSER_STACK_BUILD_NAME;

// The following variables will be set via `nightwatch-runner` script.
// It's important that `localIdentifier` passed to `browserstack-local` and to Nightwatch config match.
const bsLocalIdentifier = process.env.BROWSER_STACK_LOCAL_IDENTIFIER;

const browsers = {
	chrome: {
		os: 'Windows',
		os_version: '10'
	},
	edge: {
		os: 'Windows',
		os_version: '10'
	},
	firefox: {
		os: 'Windows',
		os_version: '10'
	},
	ie: {
		os: 'Windows',
		os_version: '10'
	},
	safari: {
		os: 'OS X',
		os_version: 'Catalina'
	}
};

const nightwatchConfig = {
	selenium: {
		start_process: false,
		host: 'hub-cloud.browserstack.com',
		port: 443
	},

	output_folder: '.tmp-e2e-output',

	test_settings: {
		default: {
			desiredCapabilities: {
				build: bsBuildName,
				'browserstack.user': bsUser,
				'browserstack.key': bsKey,
				'browserstack.debug': true,
				'browserstack.local': true,
				'browserstack.localIdentifier': bsLocalIdentifier,
				browser: bsBrowser,
				version: 'latest',
				...browsers[ bsBrowser ]
			}
		}
	}
};

module.exports = nightwatchConfig;
