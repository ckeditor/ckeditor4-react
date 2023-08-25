# CKEditor 4 WYSIWYG Editor React Integration Changelog

⚠️️️ **CKEditor 4 (the open source edition) is no longer maintained.** ⚠️

If you would like to keep access to future CKEditor 4 security patches, check the [Extended Support Model](https://ckeditor.com/ckeditor-4-support/), which guarantees **security updates and critical bug fixes until December 2026**. Alternatively, [upgrade to CKEditor 5](https://ckeditor.com/docs/ckeditor5/latest/updating/ckeditor4/migration-from-ckeditor-4.html).

## ckeditor4-react 5.0.0

This release introduces a support for the LTS (”Long Term Support”) version of the editor, available under commercial terms (["Extended Support Model"](https://ckeditor.com/ckeditor-4-support/)).

If you acquired the Extended Support Model for CKEditor 4 LTS, please read [the CKEditor 4 LTS key activation guide.](https://ckeditor.com/docs/ckeditor4/latest/support/licensing/license-key-and-activation.html)

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.23.0-lts](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4230-lts).

## ckeditor4-react 4.3.0

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.22.1](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4220--4221).

## ckeditor4-react 4.2.0

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.21.0](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4210).

## ckeditor4-react 4.1.2

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.20.2](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4202).

## ckeditor4-react 4.1.1

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.20.1](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4201).

## ckeditor4-react 4.1.0

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.20](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-420).

## ckeditor4-react 4.0.0

**Highlights**

The v4.0.0 release introduces support for React v18. You can read more about these changes in the [React v18 release notes](https://github.com/facebook/react/blob/main/CHANGELOG.md#1800-march-29-2022).

Due to significant changes in React v18, the integration with CKEditor 4 is no longer compatible with the previous versions of React. Please note that this version of React also drops support for Internet Explorer 11.

If you don’t want to lose support for IE11 or you haven't moved to React v18 yet, make sure to use React integration in [version 3](#ckeditor4-react-310).

See the [browser compatibility table](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_react_current.html#ckeditor-4-react-compatibility) to learn more about supported browsers and React versions.

BREAKING CHANGES:

* [#284](https://github.com/ckeditor/ckeditor4-react/issues/284): Add support for React 18 and remove support for older versions of React.

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.19.1](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4191).

## ckeditor4-react 3.1.0

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.19.0](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4190).

## ckeditor4-react 3.0.0

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.18.0](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4180).

	[Web Spell Checker](https://webspellchecker.com/) ended support for WebSpellChecker Dialog on December 31st, 2021. Therefore, this plugin has been deprecated and removed from the CKEditor 4.18.0 `standard-all` preset.
	We strongly encourage everyone to choose one of the other available spellchecking solutions - [Spell Check As You Type (SCAYT)](https://ckeditor.com/cke4/addon/scayt) or [WProofreader](https://ckeditor.com/cke4/addon/wproofreader).

## ckeditor4-react 2.1.1

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.17.2](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4172).
* Updated year and company name in the license headers.

## ckeditor4-react 2.1.0

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.17.1](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4171).

## ckeditor4-react 2.0.1

Other Changes:

* Updated default CDN CKEditor 4 dependency to [4.16.2](https://github.com/ckeditor/ckeditor4/blob/master/CHANGES.md#ckeditor-4162).

## ckeditor4-react 2.0.0

New Features:

* [#228](https://github.com/ckeditor/ckeditor4-react/issues/226): Added support for setting editor's initial data as HTML string.

## ckeditor4-react 2.0.0-rc.2

BREAKING CHANGES:

* [#226](https://github.com/ckeditor/ckeditor4-react/issues/226): Updated `ckeditor4-integrations-common` dependency to version `1.0.0`.

## ckeditor4-react 2.0.0-rc.1

Other Changes:

* Added CHANGELOG entries for RC versions.
* Improved project README.

## ckeditor4-react 2.0.0-rc.0

BREAKING CHANGES:

* [#124](https://github.com/ckeditor/ckeditor4-react/issues/124): Introduced support for React hooks and rewrote the component to use hooks internally.

New Features:

* [#159](https://github.com/ckeditor/ckeditor4-react/issues/159): Introduced support for React 17+ versions.
* [#82](https://github.com/ckeditor/ckeditor4-react/issues/82): Introduced TypeScript support.
* [#180](https://github.com/ckeditor/ckeditor4-react/issues/180): Introduced support for consumption of a not bundled package version by providing package in ESM, CJS and UMD formats.

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
