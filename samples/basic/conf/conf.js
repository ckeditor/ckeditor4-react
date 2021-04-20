/* eslint-env node */

const nightwatchConfig = {
	src_folders: [ 'tests' ],

	selenium: {
		start_process: false,
		host: 'hub-cloud.browserstack.com',
		port: 80
	},

	test_settings: {
		default: {
			desiredCapabilities: {
				build: 'browserstack-build-1',
				'browserstack.user':
					process.env.BROWSERSTACK_USERNAME ||
					'BROWSERSTACK_USERNAME',
				'browserstack.key':
					process.env.BROWSERSTACK_ACCESS_KEY ||
					'BROWSERSTACK_ACCESS_KEY',
				'browserstack.debug': true,
				'browserstack.local': true,
				browser: 'chrome'
			}
		}
	}
};

// Code to copy seleniumhost/port into test settings
for ( const i in nightwatchConfig.test_settings ) {
	const config = nightwatchConfig.test_settings[ i ];
	config.selenium_host = nightwatchConfig.selenium.host;
	config.selenium_port = nightwatchConfig.selenium.port;
}

module.exports = nightwatchConfig;
