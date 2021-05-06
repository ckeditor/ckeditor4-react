# CKEditor 4 WYSIWYG editor component for React [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20CKEditor%204%20React%20integration&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fckeditor4-react)

[![npm version](https://badge.fury.io/js/ckeditor4-react.svg)](https://www.npmjs.com/package/ckeditor4-react)
[![GitHub tag](https://img.shields.io/github/tag/ckeditor/ckeditor4-react.svg)](https://github.com/ckeditor/ckeditor4-react)

![Build Status](https://github.com/ckeditor/ckeditor4-react/actions/workflows/test-all.yml/badge.svg?branch=master)
[![Dependency Status](https://david-dm.org/ckeditor/ckeditor4-react/status.svg)](https://david-dm.org/ckeditor/ckeditor4-react)
[![devDependency Status](https://david-dm.org/ckeditor/ckeditor4-react/dev-status.svg)](https://david-dm.org/ckeditor/ckeditor4-react?type=dev)

[![Join newsletter](https://img.shields.io/badge/join-newsletter-00cc99.svg)](http://eepurl.com/c3zRPr)
[![Follow Twitter](https://img.shields.io/badge/follow-twitter-00cc99.svg)](https://twitter.com/ckeditor)

Official [CKEditor 4](https://ckeditor.com/ckeditor-4/) WYSIWYG editor component for React.

We are looking forward to your feedback! You can report any issues, ideas or feature requests on the [integration issues page](https://github.com/ckeditor/ckeditor4-react/issues/new).

![CKEditor 4 screenshot](https://c.cksource.com/a/1/img/npm/ckeditor4.png)

## Usage

```jsx
import CKEditor from 'ckeditor4-react';

<CKEditor data="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>" />
```

## Documentation and examples

See the [CKEditor 4 WYSIWYG Editor React Integration](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_react.html) article in the [CKEditor 4 documentation](https://ckeditor.com/docs/ckeditor4/latest).

You can also check out [CKEditor 4 WYSIWYG Editor React Integration example](https://ckeditor.com/docs/ckeditor4/latest/examples/react.html) in [CKEditor 4 Examples](https://ckeditor.com/docs/ckeditor4/latest/examples/).

## Browser support

The CKEditor 4 React component works with all the [supported browsers](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_browsers.html#officially-supported-browsers) except for Internet Explorer 8-10.

## Contributing

After cloning this repository, install necessary dependencies:

```
npm install
```

### Executing tests

```
npm run test
```

The command above should be used to get a quick feedback on passing / failing tests. By default, tests on Chrome will be launched with locally installed version of React.

Run `npm run test:all` to run tests on all supported versions of React. By default, test suite runs on Chrome but `browser` argument can be passed, e.g. `npm run test:all -- --browser Firefox`. See `scripts/react-tester.js` for details.

If you are going to change the source files (ones located in the `src/` directory), remember about rebuilding the package. You can use `npm run develop` in order to do it automatically.

### Running samples

Samples uses development built version to simplify component testing. Run below command to open sample page in your default system browser:

```
npm run samples
```

Any component changes will be automatically rebuild.

### Building the package

Build a minified version of the package that is ready to publish:

```
npm run build
```

## License

Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.

Licensed under the terms of any of the following licenses at your
choice:

* [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html),
* [GNU Lesser General Public License Version 2.1 or later](http://www.gnu.org/licenses/lgpl.html),
* [Mozilla Public License Version 1.1 or later (the "MPL")](http://www.mozilla.org/MPL/MPL-1.1.html).

For full details about the license, please check the `LICENSE.md` file.
