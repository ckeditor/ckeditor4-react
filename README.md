# CKEditor 4 rich text editor component for React

Official [CKEditor 4](https://ckeditor.com/ckeditor-4/) rich text editor component for React.

## Usage

### Customizing editor version / `ckeditor.js` URL

By default CKEditor integration will use the latest CKEditor version in standard-all preset available on CDN. Naturally you are not limited to CDN and can link your custom CKEditor 4 URL. You can customize preset, version using `CKEditor.customLink` variable:

```javascript
import CKEditor from 'ckeditor4-react';

CKEditor.customLink = 'https://cdn.ckeditor.com/4.11.1/basic/ckeditor.js';
```

Note that variable has to be assigned **before first component is initialized**.

## Contributing

After cloning this repository, install necessary dependencies:

```bash
npm install
```

### Executing tests

```bash
npm run test
```

If you are going to change the source (`src/ckeditor.jsx`) file, remember about rebuilding the package. You can use `npm run develop` in order to do it automatically.

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
