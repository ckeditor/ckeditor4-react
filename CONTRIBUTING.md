# Contributing

### Install dependencies

After cloning this repository, install necessary dependencies:

```
npm install
```

### Development

```
npm run develop
```

After running this command unit tests will start in watch mode and you are ready to develop. Please note that source code will be transpiled with `babel` so there is no type checking with TypeScript for this command. In order to validate types with TS run `npm run types:check` or run a full build (see below).

By default Karma will run tests on Chrome so make sure that its binary is available on your system. If you have Chrome installed but Karma cannot find its binary for some reason, you might need to set `CHROME_BIN` environment variable, e.g. in your `.bashrc` file: `export CHROME_BIN=path_to_chrome_bin`.

### Build

#### Watch mode

Run the following command in order to start builds in watch mode:

```
npm start
```

This command emits bundles in following formats: `umd`, `esm`, `cjs`. Type declarations are not be emitted.

#### Run build once

Run `npm run build` command to run build once. TypeScript declarations are emitted.

### Tests

#### Quick feedback

As noted above, run `npm run develop` to quickly run a full suite of unit tests on currently installed React version.

To run more a complete test script, just run the following command:

```
npm test
```

This command makes a single run of linter, type checker and unit tests.

#### Full suite of unit tests

In order to run unit tests on all supported React versions:

```
npm run test:units:all
```

#### Full suite of E2E tests

E2E tests are to ensure that library _build files_ can be used with minimal setup on the consumer end and that they work on all supported browsers. E2E tests will run on examples inside `samples` directory. Tests will be run for each supported React version.

All tests will run on BrowserStack, so make sure that environment variables `BROWSER_STACK_USERNAME` and `BROWSER_STACK_ACCESS_KEY` are set beforehand (values must be kept secret). In addition set `BROWSER_STACK_BROWSER` variable to one of the following values: `chrome`, `safari`, `ie`, `firefox`, `edge`.

E2E tests are meant to run in CI environment but it's possible to run them locally as well. For example:

```
BROWSER_STACK_USERNAME=name BROWSER_STACK_ACCESS_KEY=key BROWSER_STACK_BROWSER=safari npm run test:e2e:all
```

Or for a single sample:

```
BROWSER_STACK_USERNAME=name BROWSER_STACK_ACCESS_KEY=key BROWSER_STACK_BROWSER=safari npm run test:e2e:all -- --sample basic
```

### Samples

Before running any sample locally, make sure to expose root package as a link and build the library:

```
npm link && npm run build
```

It's enough to `npm link` the root package once. Run build on every change in root `src` folder.

Example apps are located in `samples` directory. Each sample is a self-contained application that has mandatory `start` and `build` scripts. In order to run a sample go thorugh the following steps:

1. `cd` into sample, e.g. `cd samples/basic`
2. Run `npm install`
3. Link root package: `npm link ckeditor4-react`
4. Start example: `npm start`
5. Navigate to `localhost:8080`

It's important to re-run `npm link ckeditor4-react` in a sample folder anytime `npm install` operation was performed in that sample!
