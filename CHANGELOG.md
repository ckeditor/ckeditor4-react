# CKEditor 4 WYSIWYG Editor React Integration Changelog

## ckeditor4-react 1.4.2

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.16.1](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4161).

## ckeditor4-react 1.4.1

Fixed Issues:

* [#114](https://github.com/ckeditor/ckeditor4-react/issues/114), [#127](https://github.com/ckeditor/ckeditor4-react/issues/127): Fixed: The editor uses initial stale data if `data` property changed before editor reaches [`instanceReady` state](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#event-instanceReady).

## ckeditor4-react 1.4.0

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.16.0](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-416).
* Updated [`ckeditor4-integrations-common`](https://www.npmjs.com/package/ckeditor4-integrations-common) package to `0.2.0` version.
* Updated year in license headers.

## ckeditor4-react 1.3.0

New Features:

* [#125](https://github.com/ckeditor/ckeditor4-react/issues/125): Added `name` property for easier referencing editor instances with [`CKEDITOR.instances`](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#property-instances). Thanks to [Julien Castelain](https://github.com/julien)!
* [#129](https://github.com/ckeditor/ckeditor4-react/issues/129): Added `onNamespaceLoaded` property executed when [`CKEDITOR` namespace](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html) is loaded, which can be used for its easier customization.

## ckeditor4-react 1.2.1

Other Changes:

* Updated the default CKEditor 4 CDN dependency to [4.15.1](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4151).

## ckeditor4-react 1.2.0

Fixed Issues:

* [#94](https://github.com/ckeditor/ckeditor4-react/issues/94): Fixed: The [`editor-incorrect-element`](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#editor-incorrect-element) error is thrown due to `null` element reference when editor instance is destroyed before initialization completes. Thanks to [Christoph Dörfel](https://github.com/Garbanas)!

Other Changes:

* Updated the default CKEditor 4 CDN dependency to [4.15.0](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-415).

## ckeditor4-react 1.1.1

Other Changes:

* Updated the default CKEditor 4 CDN dependency to [4.14.1](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4141).

## ckeditor4-react 1.1.0

Fixed Issues:

* [#57](https://github.com/ckeditor/ckeditor4-react/issues/57): Fixed: The CKEditor 4 WYSIWYG editor React integration gives an [`editor-element-conflict` error](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#editor-element-conflict).

Other Changes:

* Updated the default CKEditor 4 CDN dependency to [4.14.0](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-414).

## ckeditor4-react 1.0.1

Other Changes:

* Updated the default CKEditor 4 CDN dependency to [4.13.1](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4131).

## ckeditor4-react 1.0.0

New Features:

* [#15](https://github.com/ckeditor/ckeditor4-react/issues/15): Introduced support for Server Side Rendering.

Fixed Issues:

* [#46](https://github.com/ckeditor/ckeditor4-react/issues/46): Fixed: The React integration tries to destroy a non-existent editor instance in some cases. Thanks to [Oleg Kachmar](https://github.com/prokach)!
* [#44](https://github.com/ckeditor/ckeditor4-react/issues/44): Fixed: An error thrown when changing routes quickly.
* [#49](https://github.com/ckeditor/ckeditor4-react/issues/49): Fixed: A "Cannot read property 'getEditor' of null" error thrown when the component is unmounted.
* [#56](https://github.com/ckeditor/ckeditor4-react/issues/56): Fixed: CKEditor crashes when unmounting with a "Cannot read property 'destroy' of null" error.

Other Changes:

* Updated the default CKEditor 4 CDN dependency to [`4.13.0`](https://github.com/ckeditor/ckeditor4-react/commit/7b34d2c4f896ced08e66359faca28194ed7e8ef4).

## ckeditor4-react 1.0.0-beta.2

New Features:

* [#47](https://github.com/ckeditor/ckeditor4-react/issues/47): Exposed the `CKEDITOR` namespace before loading the editor instance. Thanks to [Nick Rattermann](https://github.com/nratter)!
* [#48](https://github.com/ckeditor/ckeditor4-react/pull/48): Added `CKEDITOR.displayName` for easy debugging and testing. Thanks to [Florent Berthelot](https://github.com/FBerthelot)!

Other Changes:

* Updated the default CKEditor 4 CDN dependency to [`4.12.1`](https://github.com/ckeditor/ckeditor4-react/commit/e72c2fb2d8e107419fe209c436c909915237a109).

## ckeditor4-react 1.0.0-beta

Other Changes:

* Updated the `LICENSE.md` file with all development and production dependencies.

## ckeditor4-react 0.1.1

Other Changes:

* Updated all CKEditor 4 dependencies to the `4.11.4` version.
* `README.md` file improvements.

## ckeditor4-react 0.1.0

The first beta release of the CKEditor 4 WYSIWYG Editor React Integration.
