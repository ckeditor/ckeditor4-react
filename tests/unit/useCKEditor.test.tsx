import { renderHook } from '@testing-library/react';
import {
	createDivElement,
	findByClassicEditorContent,
	queryClassicEditor,
	waitForValueToChange
} from './utils';
import { useCKEditor, CKEditorEventAction } from '../../src';

declare let CKEDITOR: any;
declare let __karma__: {
	config: {
		args: [ string ];
	};
};

function init() {
	describe( 'useCKEditor', () => {
		/**
		 * Ensures that `namespaceLoaded` event is dispatched once during lifetime of CKEDITOR namespace.
		 *
		 * !!! IMPORTANT !!!
		 *
		 * This test must run first!
		 *
		 */
		it( 'dispatches `namespaceLoaded` event', async () => {
			const onNamespaceLoaded = jasmine.createSpy( 'onNamespaceLoaded' );
			const element = createDivElement();
			const dispatchEvent = ( { type, payload } ) => {
				if ( type === CKEditorEventAction.namespaceLoaded ) {
					onNamespaceLoaded( payload );
					CKEDITOR.config.licenseKey = __karma__.config.args[ 0 ];
				}
			};
			const { result, unmount } = renderHook( () =>
				useCKEditor( {
					element,
					dispatchEvent
				} )
			);
			await waitForValueToChange(
				() => result.current.status === 'unloaded'
			);
			expect( onNamespaceLoaded ).toHaveBeenCalledTimes( 1 );
			unmount();
			const { result: resultNext } = renderHook( () =>
				useCKEditor( {
					element,
					dispatchEvent
				} )
			);
			await waitForValueToChange(
				() => resultNext.current.status === 'unloaded'
			);
			expect( onNamespaceLoaded ).toHaveBeenCalledTimes( 1 );
		} );

		/**
		 * Ensures that editor instance is created and returned.
		 */
		it( 'creates editor instance', async () => {
			const element = createDivElement();
			const { result } = renderHook( () => useCKEditor( { element } ) );
			expect( result.current.editor ).toBeUndefined();
			await waitForValueToChange( () => !!result.current.editor );
		} );

		/**
		 * Ensures that editor resources are cleaned up after unmount.
		 */
		it( 'cleans up after unmount', async () => {
			const element = createDivElement();
			const { result, unmount } = renderHook( () =>
				useCKEditor( { element } )
			);
			await waitForValueToChange( () => !!result.current.editor );
			const windw = window as any;
			expect( Object.keys( windw.CKEDITOR.instances ).length ).toEqual( 1 );
			unmount();
			expect( Object.keys( windw.CKEDITOR.instances ).length ).toEqual( 0 );
		} );

		/**
		 * Ensures that editor statuses are returned in correct order.
		 */
		it( 'gets correct status', async () => {
			const element = createDivElement();
			const { result } = renderHook( () => useCKEditor( { element } ) );
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.loading ).toBeTrue();
			await waitForValueToChange( () => !!result.current.editor );
			expect( result.current.loading ).toBeFalse();
			await waitForValueToChange(
				() => result.current.status === 'loaded'
			);
			expect( result.current.status ).toEqual( 'loaded' );
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect( result.current.status ).toEqual( 'ready' );
		} );

		/**
		 * Ensures that `error` status is set correctly if there is an error during initialization.
		 */
		it( 'sets `error` status on error', async () => {
			// Purposefully create malformed ref.
			const ref = {};
			const { result } = renderHook( () =>
				useCKEditor( {
					// @ts-ignore
					element: ref
				} )
			);
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.loading ).toBeTrue();
			await waitForValueToChange( () => !!result.current.error );
			expect( result.current.error ).toBeTrue();
		} );

		/**
		 * Ensures that hook memoizes initial `debug` value.
		 */
		it( 'does not re-initialize editor on `debug` value change', async () => {
			const element = createDivElement();
			const { result, rerender } = renderHook( ( props: any ) =>
				useCKEditor( {
					element,
					debug: false,
					...props
				} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			rerender( {
				debug: true
			} );
			expect( result.current.editor ).toBeDefined();
			expect( result.current.loading ).toBeFalse();
		} );

		/**
		 * Ensures that hook memoizes initial `dispatchEvent` value.
		 */
		it( 'does not re-initialize editor on `dispatchEvent` value change', async () => {
			const element = createDivElement();
			const dispatchEvent = jasmine.createSpy( 'dispatchEvent' );
			const dispatchEvent2 = jasmine.createSpy( 'dispatchEvent2' );
			const { result, rerender } = renderHook( ( props: any ) =>
				useCKEditor( {
					element,
					dispatchEvent,
					...props
				} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			rerender( {
				dispatchEvent: dispatchEvent2
			} );
			expect( result.current.editor ).toBeDefined();
			expect( result.current.loading ).toBeFalse();
		} );

		/**
		 * Ensures that hook memoizes initial `subscribeTo` value.
		 */
		it( 'does not re-initialize editor on `subscribeTo` value change', async () => {
			const element = createDivElement();
			const { result, rerender } = renderHook( ( props: any ) =>
				useCKEditor( {
					element,
					subscribeTo: [ 'instanceReady' ],
					...props
				} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			rerender( {
				subscribeTo: [ 'loaded' ]
			} );
			expect( result.current.editor ).toBeDefined();
			expect( result.current.loading ).toBeFalse();
		} );

		/**
		 * Ensures that hook memoizes initial url.
		 */
		it( 'does not re-initialize editor on url change', async () => {
			const element = createDivElement();
			const { result, rerender } = renderHook( ( props: any ) =>
				useCKEditor( {
					element,
					...props
				} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			rerender( {
				editorUrl:
					'https://cdn.ckeditor.com/4.15.0/standard/ckeditor.js'
			} );
			expect( result.current.editor ).toBeDefined();
			expect( result.current.loading ).toBeFalse();
		} );

		/**
		 * Ensures that editor instance is not re-created on editor type change.
		 */
		it( 'does not re-initialize editor on type change', async () => {
			const element = createDivElement();
			const { result, rerender } = renderHook( ( props: any ) =>
				useCKEditor( {
					element,
					...props
				} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			rerender( {
				type: 'inline'
			} );
			expect( result.current.editor ).toBeDefined();
			expect( result.current.loading ).toBeFalse();
		} );

		/**
		 * Ensures that editor instance is not re-created on config change.
		 */
		it( 'does not re-initialize editor on config change', async () => {
			const element = createDivElement();
			const { result, rerender } = renderHook( ( props: any ) =>
				useCKEditor( {
					element,
					...props
				} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			rerender( {
				config: { skin: 'myskin' }
			} );
			expect( result.current.editor ).toBeDefined();
			expect( result.current.loading ).toBeFalse();
		} );

		/**
		 * Ensures that editor instance is re-created on element change.
		 */
		it( 're-initializes editor on element change', async () => {
			const element = createDivElement();
			const { result, rerender } = renderHook( ( props: any ) =>
				useCKEditor( {
					element,
					...props
				} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			const elementNext = createDivElement();
			rerender( {
				element: elementNext
			} );
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.loading ).toBeTrue();
			await waitForValueToChange( () => result.current.status === 'ready' );
		} );

		/**
		 * Ensures that `beforeLoad` event is dispatched.
		 */
		it( 'dispatches `beforeLoad` event', async () => {
			const onBeforeLoad = jasmine.createSpy( 'onBeforeLoad' );
			const element = createDivElement();
			const { result } = renderHook( () =>
				useCKEditor( {
					element,
					dispatchEvent: ( { type, payload } ) => {
						if ( type === CKEditorEventAction.beforeLoad ) {
							onBeforeLoad( payload );
						}
					}
				} )
			);
			await waitForValueToChange( () => result.current.status === 'loaded' );
			expect( onBeforeLoad ).toHaveBeenCalledTimes( 1 );
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect( onBeforeLoad ).toHaveBeenCalledTimes( 1 );
		} );

		/**
		 * Dispatches default editor events (`subscribeTo` list is not passed).
		 */
		it( 'dispatches default editor events', async () => {
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const onLoaded = jasmine.createSpy( 'onLoaded' );
			const onDestroy = jasmine.createSpy( 'onDestroy' );
			const element = createDivElement();
			const { result, unmount } = renderHook( () =>
				useCKEditor( {
					element,
					dispatchEvent: ( { type, payload } ) => {
						if ( type === CKEditorEventAction.instanceReady ) {
							onInstanceReady( payload );
						} else if ( type === CKEditorEventAction.loaded ) {
							onLoaded( payload );
						} else if ( type === CKEditorEventAction.destroy ) {
							onDestroy( payload );
						}
					}
				} )
			);
			await waitForValueToChange(
				() => result.current.status === 'loaded'
			);
			expect( onLoaded ).toHaveBeenCalledTimes( 1 );
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect( onInstanceReady ).toHaveBeenCalledTimes( 1 );
			unmount();
			expect( queryClassicEditor() ).toBeNull();
			expect( onDestroy ).toHaveBeenCalledTimes( 1 );
		} );

		/**
		 * Dispatches only those events that are specified in `subscribeTo` list.
		 */
		it( 'dispatches limited number of editor events', async () => {
			const onLoaded = jasmine.createSpy( 'onLoaded' );
			const onOtherEvent = jasmine.createSpy( 'onOtherEvent' );
			const element = createDivElement();
			const { result } = renderHook( () =>
				useCKEditor( {
					element,
					dispatchEvent: ( { type, payload } ) => {
						if ( type === CKEditorEventAction.loaded ) {
							onLoaded( payload );
						} else {
							onOtherEvent();
						}
					},
					subscribeTo: [ 'loaded' ]
				} )
			);
			await waitForValueToChange(
				() => result.current.status === 'loaded'
			);
			expect( onLoaded ).toHaveBeenCalledTimes( 1 );
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect( onOtherEvent ).toHaveBeenCalledTimes( 0 );
		} );

		/**
		 * Dispatches custom `editor` events that are specified in `subscribeTo` list.
		 */
		it( 'dispatches custom `editor` events', async () => {
			const onCustomEvent = jasmine.createSpy( 'onCustomEvent' );
			const onOtherEvent = jasmine.createSpy( 'onOtherEvent' );
			const element = createDivElement();
			const { result } = renderHook( () =>
				useCKEditor<'customEvent'>( {
					element,
					dispatchEvent: ( { type, payload } ) => {
						if ( type === '__CKE__customEvent' ) {
							onCustomEvent( payload );
						} else {
							onOtherEvent();
						}
					},
					subscribeTo: [ 'customEvent' ]
				} )
			);
			await waitForValueToChange( () => !!result.current.editor );
			result.current.editor?.fire( 'customEvent' );
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect( onCustomEvent ).toHaveBeenCalledTimes( 1 );
			expect( onOtherEvent ).toHaveBeenCalledTimes( 0 );
		} );

		/**
		 * Ensures that initial content is set.
		 */
		it( 'sets initial content', async () => {
			const element = createDivElement();
			const { result } = renderHook( () =>
				useCKEditor( {
					element,
					initContent: '<p>Initial content</p>'
				} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect(
				await findByClassicEditorContent( 'Initial content' )
			).toBeVisible();
		} );
	} );
}

export default init;
