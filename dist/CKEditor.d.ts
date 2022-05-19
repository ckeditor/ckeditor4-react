/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
/// <reference types="react" />
import * as PropTypes from 'prop-types';
import { CKEditorProps, CKEditorType } from './types';
/**
 * `CKEditor` component is a convenient wrapper around low-level hooks.
 * It's useful for simpler use cases. For advanced usage see `useCKEditor` hook.
 */
declare function CKEditor<EventHandlerProp>({ config, debug, editorUrl, initData, name, readOnly, style, type, 
/**
 * `handlers` object must contain event handlers props only!
 */
...handlers }: CKEditorProps<EventHandlerProp>): JSX.Element;
declare namespace CKEditor {
    var propTypes: {
        onPaste: PropTypes.Requireable<(...args: any[]) => any>;
        onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onDrop: PropTypes.Requireable<(...args: any[]) => any>;
        onBeforeLoad: PropTypes.Requireable<(...args: any[]) => any>;
        onNamespaceLoaded: PropTypes.Requireable<(...args: any[]) => any>;
        onActiveEnterModeChange: PropTypes.Requireable<(...args: any[]) => any>;
        onActiveFilterChange: PropTypes.Requireable<(...args: any[]) => any>;
        onAfterCommandExec: PropTypes.Requireable<(...args: any[]) => any>;
        onAfterInsertHtml: PropTypes.Requireable<(...args: any[]) => any>;
        onAfterPaste: PropTypes.Requireable<(...args: any[]) => any>;
        onAfterPasteFromWord: PropTypes.Requireable<(...args: any[]) => any>;
        onAfterSetData: PropTypes.Requireable<(...args: any[]) => any>;
        onAfterUndoImage: PropTypes.Requireable<(...args: any[]) => any>;
        onAriaEditorHelpLabel: PropTypes.Requireable<(...args: any[]) => any>;
        onAriaWidget: PropTypes.Requireable<(...args: any[]) => any>;
        onAutogrow: PropTypes.Requireable<(...args: any[]) => any>;
        onBeforeCommandExec: PropTypes.Requireable<(...args: any[]) => any>;
        onBeforeDestroy: PropTypes.Requireable<(...args: any[]) => any>;
        onBeforeGetData: PropTypes.Requireable<(...args: any[]) => any>;
        onBeforeModeUnload: PropTypes.Requireable<(...args: any[]) => any>;
        onBeforeSetMode: PropTypes.Requireable<(...args: any[]) => any>;
        onBeforeUndoImage: PropTypes.Requireable<(...args: any[]) => any>;
        onConfigLoaded: PropTypes.Requireable<(...args: any[]) => any>;
        onContentDirChanged: PropTypes.Requireable<(...args: any[]) => any>;
        onContentDom: PropTypes.Requireable<(...args: any[]) => any>;
        onContentDomInvalidated: PropTypes.Requireable<(...args: any[]) => any>;
        onContentDomUnload: PropTypes.Requireable<(...args: any[]) => any>;
        onContentPreview: PropTypes.Requireable<(...args: any[]) => any>;
        onCustomConfigLoaded: PropTypes.Requireable<(...args: any[]) => any>;
        onDataFiltered: PropTypes.Requireable<(...args: any[]) => any>;
        onDataReady: PropTypes.Requireable<(...args: any[]) => any>;
        onDestroy: PropTypes.Requireable<(...args: any[]) => any>;
        onDialogHide: PropTypes.Requireable<(...args: any[]) => any>;
        onDialogShow: PropTypes.Requireable<(...args: any[]) => any>;
        onDirChanged: PropTypes.Requireable<(...args: any[]) => any>;
        onDoubleclick: PropTypes.Requireable<(...args: any[]) => any>;
        onDragend: PropTypes.Requireable<(...args: any[]) => any>;
        onDragstart: PropTypes.Requireable<(...args: any[]) => any>;
        onElementsPathUpdate: PropTypes.Requireable<(...args: any[]) => any>;
        onExportPdf: PropTypes.Requireable<(...args: any[]) => any>;
        onFileUploadRequest: PropTypes.Requireable<(...args: any[]) => any>;
        onFileUploadResponse: PropTypes.Requireable<(...args: any[]) => any>;
        onFloatingSpaceLayout: PropTypes.Requireable<(...args: any[]) => any>;
        onGetData: PropTypes.Requireable<(...args: any[]) => any>;
        onGetSnapshot: PropTypes.Requireable<(...args: any[]) => any>;
        onInsertElement: PropTypes.Requireable<(...args: any[]) => any>;
        onInsertHtml: PropTypes.Requireable<(...args: any[]) => any>;
        onInsertText: PropTypes.Requireable<(...args: any[]) => any>;
        onInstanceReady: PropTypes.Requireable<(...args: any[]) => any>;
        onKey: PropTypes.Requireable<(...args: any[]) => any>;
        onLangLoaded: PropTypes.Requireable<(...args: any[]) => any>;
        onLoadSnapshot: PropTypes.Requireable<(...args: any[]) => any>;
        onLoaded: PropTypes.Requireable<(...args: any[]) => any>;
        onLockSnapshot: PropTypes.Requireable<(...args: any[]) => any>;
        onMaximize: PropTypes.Requireable<(...args: any[]) => any>;
        onMenuShow: PropTypes.Requireable<(...args: any[]) => any>;
        onMode: PropTypes.Requireable<(...args: any[]) => any>;
        onNotificationHide: PropTypes.Requireable<(...args: any[]) => any>;
        onNotificationShow: PropTypes.Requireable<(...args: any[]) => any>;
        onNotificationUpdate: PropTypes.Requireable<(...args: any[]) => any>;
        onPasteFromWord: PropTypes.Requireable<(...args: any[]) => any>;
        onPluginsLoaded: PropTypes.Requireable<(...args: any[]) => any>;
        onReadOnly: PropTypes.Requireable<(...args: any[]) => any>;
        onRemoveFormatCleanup: PropTypes.Requireable<(...args: any[]) => any>;
        onRequired: PropTypes.Requireable<(...args: any[]) => any>;
        onResize: PropTypes.Requireable<(...args: any[]) => any>;
        onSave: PropTypes.Requireable<(...args: any[]) => any>;
        onSaveSnapshot: PropTypes.Requireable<(...args: any[]) => any>;
        onSelectionChange: PropTypes.Requireable<(...args: any[]) => any>;
        onSetData: PropTypes.Requireable<(...args: any[]) => any>;
        onStylesRemove: PropTypes.Requireable<(...args: any[]) => any>;
        onStylesSet: PropTypes.Requireable<(...args: any[]) => any>;
        onTemplate: PropTypes.Requireable<(...args: any[]) => any>;
        onToDataFormat: PropTypes.Requireable<(...args: any[]) => any>;
        onToHtml: PropTypes.Requireable<(...args: any[]) => any>;
        onUiSpace: PropTypes.Requireable<(...args: any[]) => any>;
        onUnlockSnapshot: PropTypes.Requireable<(...args: any[]) => any>;
        onUpdateSnapshot: PropTypes.Requireable<(...args: any[]) => any>;
        onWidgetDefinition: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Config object passed to editor's constructor.
         *
         * A new instance of editor will be created everytime a new instance of `config` is provided.
         * If this is not expected behavior then ensure referential equality of `config` between renders.
         *
         * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html
         */
        config: PropTypes.Requireable<object>;
        /**
         * Toggles debugging. Logs info related to editor lifecycle events.
         */
        debug: PropTypes.Requireable<boolean>;
        /**
         * Url with editor's source code. Uses newest version from https://cdn.ckeditor.com domain by default.
         */
        editorUrl: PropTypes.Requireable<string>;
        /**
         * Initial data will be set only once during editor instance's lifecycle.
         */
        initData: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * A unique identifier of editor instance.
         *
         * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#property-name
         */
        name: PropTypes.Requireable<string>;
        /**
         * This prop has two-fold effect:
         *
         * - Serves as a convenience prop to start editor in read-only mode.
         *   It's an equivalent of passing `{ readOnly: true }` in `config` but takes precedence over it.
         *
         * - Allows to toggle editor's `read-only` mode on runtime.
         *
         * See: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-readOnly
         */
        readOnly: PropTypes.Requireable<boolean>;
        /**
         * Styles passed to the root element.
         */
        style: PropTypes.Requireable<object>;
        /**
         * Setups editor in either `classic` or `inline` mode.
         *
         * A new instance of editor will be created everytime a new value of `type` is provided.
         * If this is not expected behavior then ensure stable value of `type` between renders.
         *
         * See:
         * - https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-replace
         * - https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR.html#method-inline
         */
        type: PropTypes.Requireable<CKEditorType>;
    };
}
export default CKEditor;
