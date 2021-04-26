import { renderHook } from '@testing-library/react-hooks/dom';
import { createDivRef } from './utils';
import { useCKEditor } from '../../src';

function init() {
	describe( 'useCKEditor', () => {
		/**
		 * Ensures that editor instance is created and returned.
		 */
		it( 'creates editor instance', async () => {
			const ref = createDivRef();
			const { result, waitForNextUpdate } = renderHook( () =>
				useCKEditor( { element: ref.current } )
			);
			expect( result.current.editor ).toBeUndefined();
			await waitForNextUpdate();
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
			await waitForNextUpdate();
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
			expect( result.current.status ).toEqual( 'loading' );
			await waitForNextUpdate();
			expect( result.current.editor ).toBeDefined();
			expect( result.current.status ).toEqual( 'unloaded' );
			await waitForNextUpdate();
			expect( result.current.editor ).toBeDefined();
			expect( result.current.status ).toEqual( 'loaded' );
			await waitForNextUpdate();
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
			expect( result.current.status ).toEqual( 'loading' );
			await waitForNextUpdate();
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.status ).toEqual( 'error' );
		} );

		/**
		 * Ensures that editor instance is re-created on url change.
		 */
		it( 're-initializes editor on url change', async () => {
			const ref = createDivRef();
			const { result, rerender, waitForValueToChange } = renderHook(
				( props: any ) =>
					useCKEditor( {
						element: ref.current,
						...props
					} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			rerender( {
				editorUrl:
					'https://cdn.ckeditor.com/4.15.0/standard/ckeditor.js'
			} );
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.status ).toEqual( 'loading' );
			await waitForValueToChange( () => result.current.status === 'ready' );
		} );

		/**
		 * Ensures that editor instance is re-created on editor type change.
		 */
		it( 're-initializes editor on editor type change', async () => {
			const ref = createDivRef();
			const { result, rerender, waitForValueToChange } = renderHook(
				( props: any ) =>
					useCKEditor( {
						element: ref.current,
						...props
					} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			rerender( {
				type: 'inline'
			} );
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.status ).toEqual( 'loading' );
			await waitForValueToChange( () => result.current.status === 'ready' );
		} );

		/**
		 * Ensures that editor instance is re-created on config change.
		 */
		it( 're-initializes editor on config change', async () => {
			const ref = createDivRef();
			const { result, rerender, waitForValueToChange } = renderHook(
				( props: any ) =>
					useCKEditor( {
						element: ref.current,
						...props
					} )
			);
			await waitForValueToChange( () => result.current.status === 'ready' );
			rerender( {
				config: { skin: 'myskin' }
			} );
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.status ).toEqual( 'loading' );
			await waitForValueToChange( () => result.current.status === 'ready' );
		} );

		/**
		 * Ensures that editor instance is re-created on element ref change.
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
			await waitForValueToChange( () => result.current.status === 'ready' );
			const nextRef = createDivRef();
			rerender( {
				element: nextRef.current
			} );
			expect( result.current.editor ).toBeUndefined();
			expect( result.current.status ).toEqual( 'loading' );
			await waitForValueToChange( () => result.current.status === 'ready' );
		} );

		/**
		 * Ensures that `onBeforeLoad` callback is called once during lifetime of an editor instance.
		 */
		it( 'invokes `onBeforeLoad` callback', async () => {
			const onBeforeLoad = jasmine.createSpy( 'onBeforeLoad' );
			const ref = createDivRef();
			const { result, waitForValueToChange } = renderHook( () =>
				useCKEditor( {
					element: ref.current,
					onBeforeLoad
				} )
			);
			await waitForValueToChange(
				() => result.current.status === 'unloaded'
			);
			expect( onBeforeLoad ).toHaveBeenCalledTimes( 1 );
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect( onBeforeLoad ).toHaveBeenCalledTimes( 1 );
		} );

		/**
		 * Ensures that `onNamespaceLoaded` callback is called once during lifetime of CKEDITOR namespace.
		 */
		it( 'invokes `onNamespaceLoaded` callback', async () => {
			const onNamespaceLoaded = jasmine.createSpy( 'onNamespaceLoaded' );
			const ref = createDivRef();
			const { result, unmount, waitForValueToChange } = renderHook( () =>
				useCKEditor( {
					element: ref.current,
					onNamespaceLoaded
				} )
			);
			await waitForValueToChange(
				() => result.current.status === 'unloaded'
			);
			expect( onNamespaceLoaded ).toHaveBeenCalledTimes( 1 );
			unmount();
			const {
				result: resultNext,
				waitForValueToChange: waitForValueToChangeNext
			} = renderHook( () =>
				useCKEditor( {
					element: ref.current,
					onNamespaceLoaded
				} )
			);
			await waitForValueToChangeNext(
				() => resultNext.current.status === 'unloaded'
			);
			expect( onNamespaceLoaded ).toHaveBeenCalledTimes( 1 );
		} );
	} );
}

export default init;
