import { renderHook } from '@testing-library/react';
import { createDivElement, waitForValueToChange } from './utils';
import { registerEditorEventHandler, useCKEditor } from '../../src';

function init() {
	describe( 'registerEditorEventHandler', () => {
		/**
		 * Registers an event handler within editor.
		 */
		it( 'registers / unregisters event handler', async () => {
			const element = createDivElement();
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const { result } = renderHook( () =>
				useCKEditor( {
					element
				} )
			);
			await waitForValueToChange( () => !!result.current.editor );
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
			const element = createDivElement();
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const { result } = renderHook( () =>
				useCKEditor( {
					element
				} )
			);
			await waitForValueToChange( () => !!result.current.editor );
			registerEditorEventHandler( {
				editor: result.current.editor,
				evtName: 'instanceReady',
				handler: onInstanceReady,
				debug: true
			} );
			await waitForValueToChange( () => result.current.status === 'ready' );
			expect( onInstanceReady ).toHaveBeenCalledTimes( 1 );
			expect( windw.console.log ).toHaveBeenCalled();
		} );

		/**
		 * Accepts and passes custom listener data.
		 */
		it( 'uses listener data', async () => {
			const element = createDivElement();
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const { result } = renderHook( () =>
				useCKEditor( {
					element
				} )
			);
			await waitForValueToChange( () => !!result.current.editor );
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
			const element = createDivElement();
			const onInstanceReady1 = jasmine.createSpy( 'onInstanceReady1' );
			const onInstanceReady2 = jasmine.createSpy( 'onInstanceReady2' );
			const { result } = renderHook( () =>
				useCKEditor( {
					element
				} )
			);
			await waitForValueToChange( () => !!result.current.editor );
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
