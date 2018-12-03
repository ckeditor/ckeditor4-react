# CKEditor 4 rich text editor component for React

Official [CKEditor 4](https://ckeditor.com/ckeditor-4/) rich text editor component for React.

![CKEditor 4 screenshot](https://c.cksource.com/a/1/img/npm/ckeditor4.png)

## Usage

```jsx
import CKEditor from 'ckeditor4-react';

<CKEditor data="<p>This is an example CKEditor 4 instance.</p>" />
```

## Documentation and examples

See the [React Integration](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_react.html) article in the [CKEditor 4 documentation](https://ckeditor.com/docs/ckeditor4/latest).

You can also check out [React example](https://ckeditor.com/docs/ckeditor4/latest/examples/react.html) in the [CKEditor 4 Example](https://ckeditor.com/docs/ckeditor4/latest/examples/).

## Contributing

After cloning this repository, install necessary dependencies:

```bash
npm install
```

### Executing tests

```bash
npm run test
```

If you are going to change the source files (ones located in `src/` directory), remember about rebuilding the package. You can use `npm run develop` in order to do it automatically.

### Building the package

Build a minified version of the package that is ready to publish:

```bash
npm run build
```

## License

Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.

Licensed under the terms of any of the following licenses at your
choice:

* [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html),
* [GNU Lesser General Public License Version 2.1 or later](http://www.gnu.org/licenses/lgpl.html),
* [Mozilla Public License Version 1.1 or later (the "MPL")](http://www.mozilla.org/MPL/MPL-1.1.html).

For full details about the license, please check the `LICENSE.md` file.
