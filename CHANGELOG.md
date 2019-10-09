# CKEditor 4 React Integration Changelog

## ckeditor4-react 1.0.0

New Features:

* [#15](https://github.com/ckeditor/ckeditor4-react/issues/15): Introduced support for Server Side Rendering.

Fixed Issues:

* [#46](https://github.com/ckeditor/ckeditor4-react/issues/46): Fixed: Integration tries to destroy non-existent editor instance in some cases. Thanks to [Oleg Kachmar](https://github.com/prokach)!
* [#44](https://github.com/ckeditor/ckeditor4-react/issues/44): Fixed: Error thrown when quickly changing routes.
* [#49](https://github.com/ckeditor/ckeditor4-react/issues/49): Fixed: The "Cannot read property 'getEditor' of null" error thrown when component is unmounted.
* [#56](https://github.com/ckeditor/ckeditor4-react/issues/56): Fixed: CKEditor crashes when unmounting with "Cannot read property 'destroy' of null" error.


Other Changes:

* Updated default CDN CKEditor 4 dependency to [`4.13.0`](https://github.com/ckeditor/ckeditor4-react/commit/7b34d2c4f896ced08e66359faca28194ed7e8ef4).

## ckeditor4-react 1.0.0-beta.2

New Features:

* [#47](https://github.com/ckeditor/ckeditor4-react/issues/47): Exposed `CKEDITOR` namespace before loading editor instance. Thanks to [Nick Rattermann](https://github.com/nratter)!
* [#48](https://github.com/ckeditor/ckeditor4-react/pull/48): Added `CKEDITOR.displayName` for easy debugging and testing. Thanks to [Florent Berthelot](https://github.com/FBerthelot)!

Other Changes:

* Updated default CDN CKEditor 4 dependency to [`4.12.1`](https://github.com/ckeditor/ckeditor4-react/commit/e72c2fb2d8e107419fe209c436c909915237a109).

## ckeditor4-react 1.0.0-beta

Other Changes:

* Updated `LICENSE.md` file with all development and production dependencies.

## ckeditor4-react 0.1.1

Other Changes:

* Updated all CKEditor 4 dependencies to `4.11.4` version.
* `README.md` file improvements.

## ckeditor4-react 0.1.0

The first beta release of CKEditor 4 React Integration.
