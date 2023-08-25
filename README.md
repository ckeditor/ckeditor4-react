# CKEditor 4 WYSIWYG editor component for React [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20CKEditor%204%20React%20integration&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fckeditor4-react)

[![npm version](https://badge.fury.io/js/ckeditor4-react.svg)](https://www.npmjs.com/package/ckeditor4-react)
[![GitHub tag](https://img.shields.io/github/tag/ckeditor/ckeditor4-react.svg)](https://github.com/ckeditor/ckeditor4-react)

![Build Status](https://github.com/ckeditor/ckeditor4-react/actions/workflows/test-all.yml/badge.svg)

[![Join newsletter](https://img.shields.io/badge/join-newsletter-00cc99.svg)](http://eepurl.com/c3zRPr)
[![Follow Twitter](https://img.shields.io/badge/follow-twitter-00cc99.svg)](https://twitter.com/ckeditor)

## ⚠️ CKEditor 4: End of Life and Extended Support Model until Dec 2026

CKEditor 4 was launched in 2012 and reached its End of Life (EOL) on June 30, 2023.

A special edition, **[CKEditor 4 LTS](https://ckeditor.com/ckeditor-4-support/)** ("Long Term Support"), is available under commercial terms (["Extended Support Model"](https://ckeditor.com/ckeditor-4-support/)) for anyone looking to **extend the coverage of security updates and critical bug fixes**.

With CKEditor 4 LTS, security updates and critical bug fixes are guaranteed until December 2026.

## About this repository

### Master branch = CKEditor 4 LTS React Component

After June 30, 2023 the `master` version of the [LICENSE.md](https://github.com/ckeditor/ckeditor4/blob/master/LICENSE.md) file changed to reflect the license of CKEditor 4 LTS available under the Extended Support Model.

This repository now contains the source code of CKEditor 4 LTS React Component that is protected by copyright law.

### Getting CKEditor 4 (Open Source)

You may continue using CKEditor React Component 4.3.0 and below under the open source license terms. Please note, however, that the open source version no longer comes with any security updates, so your application will be at risk.

In order to download the open source version of CKEditor 4 React Component, use ****tags 4.3.0 and below****. CKEditor React Component 4.3.0 was the last version available under the open source license terms.

## About this package

Official [CKEditor 4](https://ckeditor.com/ckeditor-4/) WYSIWYG editor component for React.

We are looking forward to your feedback! You can report any issues, ideas or feature requests on the [integration issues page](https://github.com/ckeditor/ckeditor4-react/issues/new).

![CKEditor 4 screenshot](https://c.cksource.com/a/1/img/npm/ckeditor4.png)

## Usage

```jsx
import React from 'react';
import { CKEditor } from 'ckeditor4-react';

function App() {
	return <CKEditor initData="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>" />;
}

export default App;
```

## Documentation and examples

See the [CKEditor 4 WYSIWYG Editor React Integration](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_react_current.html) article in the [CKEditor 4 documentation](https://ckeditor.com/docs/ckeditor4/latest).

You can also check out [CKEditor 4 WYSIWYG Editor React Integration example](https://ckeditor.com/docs/ckeditor4/latest/examples/react.html) in [CKEditor 4 Examples](https://ckeditor.com/docs/ckeditor4/latest/examples/).

For even more examples, check out ready-to-fork samples inside [samples](samples) directory. Each sample is a self-contained app that can be [forked via GitHub](https://docs.github.com/en/github/getting-started-with-github/splitting-a-subfolder-out-into-a-new-repository) or via services such as [CodeSandbox](https://codesandbox.io/). For instance, in order to clone `basic` sample, use [this link](https://githubbox.com/ckeditor/ckeditor4-react/tree/master/samples/basic).

## React support

The CKEditor 4 React integration was tested with React 18.

## TypeScript support

TypeScript 3.5+ is supported.

## Browser support

The CKEditor 4 React integration works with all the [supported browsers](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_browsers.html#officially-supported-browsers) except for Internet Explorer.

Previous versions of `ckeditor4-react` also support Internet Explorer 11 (requires additional polyfill for `Promise`).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.

For full details about the license, please check the `LICENSE.md` file.

### CKEditor 4 React Component 4.3.0 and below for CKEditor 4 Open Source

Licensed under the terms of any of the following licenses at your
choice:

* [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html),
* [GNU Lesser General Public License Version 2.1 or later](http://www.gnu.org/licenses/lgpl.html),
* [Mozilla Public License Version 1.1 or later (the "MPL")](http://www.mozilla.org/MPL/MPL-1.1.html).

### CKEditor 4 React Component 5.0 and above for CKEditor 4 LTS ("Long Term Support")

CKEditor 4 LTS React Component (starting from version 5.0) is available under a commercial license only.
