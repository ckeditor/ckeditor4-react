import { renderHook } from '@testing-library/react-hooks/dom';
import { createDivRef, queryClassicEditor } from './utils';
import { useCKEditor, CKEditorEventAction } from '../../src';

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
			const ref = createDivRef();
			const dispatchEvent = ( { type, payload } ) => {
				if ( type === CKEditorEventAction.namespaceLoaded ) {
					onNamespaceLoaded( payload );
				}
			};
			const { result, unmount, waitForValueToChange } = renderHook( () =>
				useCKEditor( {
					element: ref.current,
					dispatchEvent
				} )
			);
			// Timeout is increased so that slower CI environment has a chance to catch-up.
			await waitForValueToChange(
				() => result.current.status === 'unloaded',
				{ timeout: 5000 }
			);
			expect( onNamespaceLoaded ).toHaveBeenCalledTimes( 1 );
			unmount();
			const {
				result: resultNext,
				waitForValueToChange: waitForValueToChangeNext
			} = renderHook( () =>
				useCKEditor( {
					element: ref.current,
					dispatchEvent
				} )
			);
			await waitForValueToChangeNext(
				() => resultNext.current.status === 'unloaded',
				{ timeout: 5000 }
			);
			expect( onNamespaceLoaded ).toHaveBeenCalledTimes( 1 );
		} );

		/**
		 * Ensures that editor instance is created and returned.
		 */
		it( 'creates editor instance', async () => {
			const ref = createDivRef();
			const { result, waitForNextUpdate } = renderHook( () =>
				useCKEditor( { element: ref.current } )
			);
			expect( result.current.editor ).toBeUndefined();
			await waitForNextUpdate( { timeout: 5000 } );
			expect( result.current.editor ).toBeDefined();
		} );

		/**
		 * Ensures that editor resources are cleaned up after unmount.
		 */
		it( 'cleans up after unmount', async () => {
			const ref = createDivRef();
			const { result, unmount, waitForNextUpdate } = renderHook( () =>
				useCKEditor( { element: ref.current } )
			);
			await waitForNextUpdate( { timeout: 5000 } );
			expect( result.current.editor ).toBeDefined();
			const windw = window as any;
			expect( Object.keys( windw.CKEDITOR.instances ).length ).toEqual( 1 );
			unmount();
			expect( Object.keys( windw.CKEDITOR.instances ).length ).toEqual( 0 );
		} );

		/**
		 * Ensures that editor statuses are returned in correct order.
		 */
		it( 'gets correct status', async () => {
			const ref = createDivRef();
			const { result, waitForNextUpdate } = renderHook( () =>
				useCKEditor( { element: ref.current } )
			);
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.loading ).toBeTrue();
			await waitForNextUpdate( { timeout: 5000 } );
			expect( result.current.editor ).toBeDefined();
			expect( result.current.status ).toEqual( 'unloaded' );
			expect( result.current.loading ).toBeFalse();
			await waitForNextUpdate( { timeout: 5000 } );
			expect( result.current.editor ).toBeDefined();
			expect( result.current.status ).toEqual( 'loaded' );
			await waitForNextUpdate( { timeout: 5000 } );
			expect( result.current.editor ).toBeDefined();
			expect( result.current.status ).toEqual( 'ready' );
		} );

		/**
		 * Ensures that `error` status is set correctly if there is an error during initialization.
		 */
		it( 'sets `error` status on error', async () => {
			// Purposefully create malformed ref.
			const ref = {};
			const { result, waitForNextUpdate } = renderHook( () =>
				useCKEditor( {
					// @ts-ignore
					element: ref
				} )
			);
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.loading ).toBeTrue();
			await waitForNextUpdate( { timeout: 5000 } );
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.error ).toBeTrue();
		} );

		/**
		 * Ensures that hook memoizes initial `debug` value.
		 */
		it( 'does not re-initialize editor on `debug` value change', async () => {
			const ref = createDivRef();
			const { result, rerender, waitForValueToChange } = renderHook(
				( props: any ) =>
					useCKEditor( {
						element: ref.current,
						debug: false,
						...props
					} )
			);
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
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
			const ref = createDivRef();
			const dispatchEvent = jasmine.createSpy( 'dispatchEvent' );
			const dispatchEvent2 = jasmine.createSpy( 'dispatchEvent2' );
			const { result, rerender, waitForValueToChange } = renderHook(
				( props: any ) =>
					useCKEditor( {
						element: ref.current,
						dispatchEvent,
						...props
					} )
			);
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
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
			const ref = createDivRef();
			const { result, rerender, waitForValueToChange } = renderHook(
				( props: any ) =>
					useCKEditor( {
						element: ref.current,
						subscribeTo: [ 'instanceReady' ],
						...props
					} )
			);
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
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
			const ref = createDivRef();
			const { result, rerender, waitForValueToChange } = renderHook(
				( props: any ) =>
					useCKEditor( {
						element: ref.current,
						...props
					} )
			);
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
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
			const ref = createDivRef();
			const { result, rerender, waitForValueToChange } = renderHook(
				( props: any ) =>
					useCKEditor( {
						element: ref.current,
						...props
					} )
			);
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
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
			const ref = createDivRef();
			const { result, rerender, waitForValueToChange } = renderHook(
				( props: any ) =>
					useCKEditor( {
						element: ref.current,
						...props
					} )
			);
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
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
			const ref = createDivRef();
			const { result, rerender, waitForValueToChange } = renderHook(
				( props: any ) =>
					useCKEditor( {
						element: ref.current,
						...props
					} )
			);
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
			const nextRef = createDivRef();
			rerender( {
				element: nextRef.current
			} );
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.loading ).toBeTrue();
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
		} );

		/**
		 * Ensures that `beforeLoad` event is dispatched.
		 */
		it( 'dispatches `beforeLoad` event', async () => {
			const onBeforeLoad = jasmine.createSpy( 'onBeforeLoad' );
			const ref = createDivRef();
			const { result, waitForValueToChange } = renderHook( () =>
				useCKEditor( {
					element: ref.current,
					dispatchEvent: ( { type, payload } ) => {
						if ( type === CKEditorEventAction.beforeLoad ) {
							onBeforeLoad( payload );
						}
					}
				} )
			);
			await waitForValueToChange(
				() => result.current.status === 'unloaded',
				{ timeout: 5000 }
			);
			expect( onBeforeLoad ).toHaveBeenCalledTimes( 1 );
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
			expect( onBeforeLoad ).toHaveBeenCalledTimes( 1 );
		} );

		/**
		 * Dispatches default editor events (`subscribeTo` list is not passed).
		 */
		it( 'dispatches default editor events', async () => {
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const onLoaded = jasmine.createSpy( 'onLoaded' );
			const onDestroy = jasmine.createSpy( 'onDestroy' );
			const ref = createDivRef();
			const { result, unmount, waitForValueToChange } = renderHook( () =>
				useCKEditor( {
					element: ref.current,
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
				() => result.current.status === 'loaded',
				{ timeout: 5000 }
			);
			expect( onLoaded ).toHaveBeenCalledTimes( 1 );
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
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
			const ref = createDivRef();
			const { result, waitForValueToChange } = renderHook( () =>
				useCKEditor( {
					element: ref.current,
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
				() => result.current.status === 'loaded',
				{ timeout: 5000 }
			);
			expect( onLoaded ).toHaveBeenCalledTimes( 1 );
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
			expect( onOtherEvent ).toHaveBeenCalledTimes( 0 );
		} );

		/**
		 * Dispatches custom `editor` events that are specified in `subscribeTo` list.
		 */
		it( 'dispatches custom `editor` events', async () => {
			const onCustomEvent = jasmine.createSpy( 'onCustomEvent' );
			const onOtherEvent = jasmine.createSpy( 'onOtherEvent' );
			const ref = createDivRef();
			const { result, waitForValueToChange } = renderHook( () =>
				useCKEditor<'customEvent'>( {
					element: ref.current,
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
			await waitForValueToChange( () => !!result.current.editor, {
				timeout: 5000
			} );
			result.current.editor?.fire( 'customEvent' );
			await waitForValueToChange(
				() => result.current.status === 'ready',
				{ timeout: 5000 }
			);
			expect( onCustomEvent ).toHaveBeenCalledTimes( 1 );
			expect( onOtherEvent ).toHaveBeenCalledTimes( 0 );
		} );
	} );
}

export default init;
