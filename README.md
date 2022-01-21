# CKEditor 4 WYSIWYG editor component for React [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20CKEditor%204%20React%20integration&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fckeditor4-react)

[![npm version](https://badge.fury.io/js/ckeditor4-react.svg)](https://www.npmjs.com/package/ckeditor4-react)
[![GitHub tag](https://img.shields.io/github/tag/ckeditor/ckeditor4-react.svg)](https://github.com/ckeditor/ckeditor4-react)

![Build Status](https://github.com/ckeditor/ckeditor4-react/actions/workflows/test-all.yml/badge.svg)
[![Dependency Status](https://david-dm.org/ckeditor/ckeditor4-react/status.svg?ref=major)](https://david-dm.org/ckeditor/ckeditor4-react)
[![devDependency Status](https://david-dm.org/ckeditor/ckeditor4-react/dev-status.svg?ref=major)](https://david-dm.org/ckeditor/ckeditor4-react?type=dev)

[![Join newsletter](https://img.shields.io/badge/join-newsletter-00cc99.svg)](http://eepurl.com/c3zRPr)
[![Follow Twitter](https://img.shields.io/badge/follow-twitter-00cc99.svg)](https://twitter.com/ckeditor)

Official [CKEditor 4](https://ckeditor.com/ckeditor-4/) WYSIWYG editor component for React.

We are looking forward to your feedback! You can report any issues, ideas or feature requests on the [integration issues page](https://github.com/ckeditor/ckeditor4-react/issues/new).

![CKEditor 4 screenshot](https://c.cksource.com/a/1/img/npm/ckeditor4.png)

## Usage

```jsx
import { CKEditor } from 'ckeditor4-react';

<CKEditor initData={<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>} />
```

## Documentation and examples

See the [CKEditor 4 WYSIWYG Editor React Integration](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_react_v2.html) article in the [CKEditor 4 documentation](https://ckeditor.com/docs/ckeditor4/latest).

You can also check out [CKEditor 4 WYSIWYG Editor React Integration example](https://ckeditor.com/docs/ckeditor4/latest/examples/react.html) in [CKEditor 4 Examples](https://ckeditor.com/docs/ckeditor4/latest/examples/).

For even more examples, check out ready-to-fork samples inside [samples](samples) directory. Each sample is a self-contained app that can be [forked via GitHub](https://docs.github.com/en/github/getting-started-with-github/splitting-a-subfolder-out-into-a-new-repository) or via services such as [CodeSandbox](https://codesandbox.io/). For instance, in order to clone `basic` sample, use [this link](https://githubbox.com/ckeditor/ckeditor4-react/tree/master/samples/basic).

## React support

The CKEditor 4 React component was tested with React starting from 16.9 version including 17+ versions.

## TypeScript support

TypeScript 3.5+ is supported.

## Browser support

The CKEditor 4 React component works with all the [supported browsers](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_browsers.html#officially-supported-browsers) except for Internet Explorer 8-10. For Internet Explorer 11 the component requires additional polyfill for `Promise`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.

Licensed under the terms of any of the following licenses at your
choice:

* [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html),
* [GNU Lesser General Public License Version 2.1 or later](http://www.gnu.org/licenses/lgpl.html),
* [Mozilla Public License Version 1.1 or later (the "MPL")](http://www.mozilla.org/MPL/MPL-1.1.html).

For full details about the license, please check the `LICENSE.md` file.
