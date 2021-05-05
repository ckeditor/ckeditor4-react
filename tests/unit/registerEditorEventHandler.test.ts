import { renderHook } from '@testing-library/react-hooks/dom';
import { createDivRef } from './utils';
import { registerEditorEventHandler, useCKEditor } from '../../src';

function init() {
	describe( 'registerEditorEventHandler', () => {
		/**
		 * Registers an event handler within editor.
		 */
		it( 'registers / unregisters event handler', async () => {
			const ref = createDivRef();
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const { result, waitForValueToChange } = renderHook( () =>
				useCKEditor( {
					element: ref.current
				} )
			);
			await waitForValueToChange(
				() => result.current.status === 'loaded'
			);
			const unregister = registerEditorEventHandler( {
				editor: result.current.editor,
				evtName: 'instanceReady',
				handler: onInstanceReady
			} );
			expect(
				result.current.editor.hasListeners( 'instanceReady' )
			).toBeTrue();
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect( onInstanceReady ).toHaveBeenCalledTimes( 1 );
			unregister();
			expect(
				result.current.editor.hasListeners( 'instanceReady' )
			).toBeUndefined();
		} );

		/**
		 * With debugging enabled, events are logged to console.
		 */
		it( 'turns on `debug` mode', async () => {
			const windw = window as any;
			windw.console.log = jasmine.createSpy( 'windw.console.log' );
			const ref = createDivRef();
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const { result, waitForValueToChange } = renderHook( () =>
				useCKEditor( {
					element: ref.current
				} )
			);
			await waitForValueToChange(
				() => result.current.status === 'loaded'
			);
			const unregister = registerEditorEventHandler( {
				editor: result.current.editor,
				evtName: 'instanceReady',
				handler: onInstanceReady,
				debug: true
			} );
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect( onInstanceReady ).toHaveBeenCalledTimes( 1 );
			expect( windw.console.log ).toHaveBeenCalledTimes( 1 );
			unregister();
			expect( windw.console.log ).toHaveBeenCalledTimes( 2 );
		} );

		/**
		 * Accepts and passes custom listener data.
		 */
		it( 'uses listener data', async () => {
			const ref = createDivRef();
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const { result, waitForValueToChange } = renderHook( () =>
				useCKEditor( {
					element: ref.current
				} )
			);
			await waitForValueToChange(
				() => result.current.status === 'loaded'
			);
			registerEditorEventHandler( {
				editor: result.current.editor,
				evtName: 'instanceReady',
				handler: onInstanceReady,
				listenerData: { hello: 'hello' }
			} );
			await waitForValueToChange( () => result.current.status === 'ready' );
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
			const { result, waitForValueToChange } = renderHook( () =>
				useCKEditor( {
					element: ref.current
				} )
			);
			await waitForValueToChange(
				() => result.current.status === 'loaded'
			);
			registerEditorEventHandler( {
				editor: result.current.editor,
				evtName: 'instanceReady',
				handler: onInstanceReady1,
				priority: 1
			} );
			registerEditorEventHandler( {
				editor: result.current.editor,
				evtName: 'instanceReady',
				handler: onInstanceReady2,
				priority: 0
			} );
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect( onInstanceReady2 ).toHaveBeenCalledBefore( onInstanceReady1 );
		} );
	} );
}

export default init;
