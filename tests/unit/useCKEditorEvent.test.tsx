import { renderHook } from '@testing-library/react-hooks/dom';
import { createDivRef } from './utils';
import { useCKEditor, useCKEditorEvent } from '../../src';

function init() {
	describe( 'useCKEditorEvent', () => {
		/**
		 * Registers an event handler, then removes it when a new one is provided.
		 */
		it( 'controls lifecycle of a handler', async () => {
			const ref = createDivRef();
			const onReadOnly1 = jasmine.createSpy( 'onReadOnly1' );
			const onReadOnly2 = jasmine.createSpy( 'onReadOnly2' );
			const { result: ckEditorResult, waitForValueToChange } = renderHook(
				() =>
					useCKEditor( {
						element: ref.current
					} )
			);
			const { rerender } = renderHook( ( props: any ) =>
				useCKEditorEvent( {
					handler: onReadOnly1,
					evtName: 'readOnly',
					editor: ckEditorResult.current.editor,
					...props
				} )
			);
			await waitForValueToChange(
				() => ckEditorResult.current.status === 'ready'
			);
			rerender( { editor: ckEditorResult.current.editor } );
			ckEditorResult.current.editor.setReadOnly( true );
			expect( onReadOnly1 ).toHaveBeenCalledTimes( 1 );
			rerender( { handler: onReadOnly2 } );
			ckEditorResult.current.editor.setReadOnly( false );
			expect( onReadOnly1 ).toHaveBeenCalledTimes( 1 );
			expect( onReadOnly2 ).toHaveBeenCalledTimes( 1 );
		} );

		/**
		 * With debugging enabled, events are logged to console.
		 */
		it( 'turns on `debug` mode', async () => {
			const windw = window as any;
			windw.console.log = jasmine.createSpy( 'windw.console.log' );
			const ref = createDivRef();
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const { result: ckEditorResult, waitForValueToChange } = renderHook(
				() =>
					useCKEditor( {
						element: ref.current
					} )
			);
			const { rerender, unmount } = renderHook( ( props: any ) =>
				useCKEditorEvent( {
					handler: onInstanceReady,
					evtName: 'instanceReady',
					editor: ckEditorResult.current.editor,
					debug: true,
					...props
				} )
			);
			await waitForValueToChange(
				() => ckEditorResult.current.status === 'loaded'
			);
			rerender( { editor: ckEditorResult.current.editor } );
			await waitForValueToChange(
				() => ckEditorResult.current.status === 'ready'
			);
			expect( onInstanceReady ).toHaveBeenCalledTimes( 1 );
			expect( windw.console.log ).toHaveBeenCalledTimes( 1 );
			unmount();
			expect( windw.console.log ).toHaveBeenCalledTimes( 2 );
		} );

		/**
		 * Unregisters event handler on unmount.
		 */
		it( 'unregisters handler on unmount', async () => {
			const ref = createDivRef();
			const onReadOnly = jasmine.createSpy( 'onReadOnly' );
			const { result: ckEditorResult, waitForValueToChange } = renderHook(
				() =>
					useCKEditor( {
						element: ref.current
					} )
			);
			const { rerender, unmount } = renderHook( ( props: any ) =>
				useCKEditorEvent( {
					handler: onReadOnly,
					evtName: 'readOnly',
					editor: ckEditorResult.current.editor,
					...props
				} )
			);
			await waitForValueToChange(
				() => ckEditorResult.current.status === 'ready'
			);
			rerender( { editor: ckEditorResult.current.editor } );
			ckEditorResult.current.editor.setReadOnly( true );
			expect( onReadOnly ).toHaveBeenCalledTimes( 1 );
			unmount();
			ckEditorResult.current.editor.setReadOnly( false );
			expect( onReadOnly ).toHaveBeenCalledTimes( 1 );
		} );

		/**
		 * Accepts and passes custom listener data.
		 */
		it( 'uses listener data', async () => {
			const ref = createDivRef();
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const { result: ckEditorResult, waitForValueToChange } = renderHook(
				() =>
					useCKEditor( {
						element: ref.current
					} )
			);
			const { rerender } = renderHook( ( props: any ) =>
				useCKEditorEvent( {
					handler: onInstanceReady,
					evtName: 'instanceReady',
					editor: ckEditorResult.current.editor,
					listenerData: { hello: 'hello' },
					...props
				} )
			);
			await waitForValueToChange(
				() => ckEditorResult.current.status === 'loaded'
			);
			rerender( { editor: ckEditorResult.current.editor } );
			await waitForValueToChange(
				() => ckEditorResult.current.status === 'ready'
			);
			expect( onInstanceReady ).toHaveBeenCalledWith(
				jasmine.objectContaining( {
					listenerData: { hello: 'hello' }
				} )
			);
		} );

		/**
		 * Sets priority in which handlers are invoked.
		 */
		it( 'accepts priority', async () => {
			const ref = createDivRef();
			const onInstanceReady1 = jasmine.createSpy( 'onInstanceReady1' );
			const onInstanceReady2 = jasmine.createSpy( 'onInstanceReady2' );
			const { result: ckEditorResult, waitForValueToChange } = renderHook(
				() =>
					useCKEditor( {
						element: ref.current
					} )
			);
			const hook1 = renderHook( ( props: any ) =>
				useCKEditorEvent( {
					handler: onInstanceReady1,
					evtName: 'instanceReady',
					editor: ckEditorResult.current.editor,
					priority: 1,
					...props
				} )
			);
			const hook2 = renderHook( ( props: any ) =>
				useCKEditorEvent( {
					handler: onInstanceReady2,
					evtName: 'instanceReady',
					editor: ckEditorResult.current.editor,
					priority: 0,
					...props
				} )
			);
			await waitForValueToChange(
				() => ckEditorResult.current.status === 'loaded'
			);
			hook1.rerender( { editor: ckEditorResult.current.editor } );
			hook2.rerender( { editor: ckEditorResult.current.editor } );
			await waitForValueToChange(
				() => ckEditorResult.current.status === 'ready'
			);
			expect( onInstanceReady2 ).toHaveBeenCalledBefore( onInstanceReady1 );
		} );
	} );
}

export default init;
