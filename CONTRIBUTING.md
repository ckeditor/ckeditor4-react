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

Unit tests will start in watch mode and you are ready to develop. Please note that source code will be transpiled via `babel` so there is no type checking with TypeScript. In order to validate types with TS run `npm run types:check` or run full build (see below).

By default Karma will run tests on Chrome so make sure that its binary is available on your system. If Karma cannot find the binary, you might need to set `CHROME_BIN` environment variable, e.g. in your `.bashrc` file: `export CHROME_BIN=path_to_chrome_bin`.

### Build

#### Watch mode

Run the following command in order to start builds in watch mode:

```
npm start
```

This command will emit bundles in following formats: `umd`, `esm`, `cjs`.

#### Run build once

Alternatively run `npm run build` to run build once. TypeScript declarations will be also emitted.

### Tests

#### Quick feedback

Run the following command in order to run test suite once:

```
npm test
```

This command will make a single run of linter, type checker and unit tests.

#### Full suite of unit tests

In order to run unit tests on all supported React versions:

```
npm run test:all:units
```

#### Full suite of E2E tests

E2E tests are to ensure that library _build files_ can be used with minimal setup on the consumer end and that they work on all supported browsers. E2E tests will run on examples inside `samples` directory. Tests will be run for each supported React version.

All tests will run on BrowserStack, so make sure that environment variables `BROWSER_STACK_USERNAME` and `BROWSER_STACK_ACCESS_KEY` are set (values must be kept secret). In addition set `BROWSER_STACK_BROWSER` variable to one of `chrome`, `safari`, `ie`, `firefox`, `edge` values.

E2E tests are meant to run in CI environment but it's possible to run them locally as well. For example:

```
BROWSER_STACK_USERNAME=name BROWSER_STACK_ACCESS_KEY=key BROWSER_STACK_BROWSER=safari npm run test:all:e2e
```

### Samples

Example apps are located in `samples` directory. Each sample is a self-contained application that has mandatory `start` and `build` scripts. In order to run a sample go thorugh the following steps:

1. Expose parent package as link: `npm link`
2. Build library: `npm run build`
3. `cd` into sample, e.g. `cd samples/basic`
4. Run `npm install`
5. Link parent package: `npm link ckeditor4-react`
6. Start example: `npm start`
7. Navigate to `localhost:8080`
