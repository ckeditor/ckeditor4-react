import { registerEditorEventHandler } from '../../src';

function init() {
	describe( 'registerEditorEventHandler', () => {
		const spyOnEventOn = jasmine.createSpy( 'editor.on' );
		const spyOnRemoveListener = jasmine.createSpy( 'editor.removeListener' );
		const createEditor = () => ( { on: spyOnEventOn, removeListener: spyOnRemoveListener } );

		afterEach( () => {
			spyOnEventOn.calls.reset();
			spyOnRemoveListener.calls.reset();
		} );

		it( 'registers / unregisters event handler', async () => {
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			const unregister = registerEditorEventHandler( {
				editor: createEditor(),
				evtName: 'instanceReady',
				handler: onInstanceReady
			} );
			expect( spyOnEventOn ).toHaveBeenCalledTimes( 1 );
			expect( spyOnEventOn ).toHaveBeenCalledWith( 'instanceReady', onInstanceReady, null, undefined, undefined );
			unregister();
			expect( spyOnRemoveListener ).toHaveBeenCalledTimes( 1 );
			expect( spyOnRemoveListener ).toHaveBeenCalledWith( 'instanceReady', onInstanceReady );
		} );

		it( 'turns on `debug` mode', async () => {
			const windw = window as any;
			const log = window.console.log;
			windw.console.log = jasmine.createSpy( 'window.console.log' );
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			registerEditorEventHandler( {
				editor: createEditor(),
				evtName: 'instanceReady',
				handler: onInstanceReady,
				debug: true
			} );
			expect( spyOnEventOn ).toHaveBeenCalledTimes( 1 );
			expect( spyOnEventOn ).toHaveBeenCalledWith( 'instanceReady', jasmine.any( Function ), null, undefined, undefined );
			expect( windw.console.log ).toHaveBeenCalled();
			window.console.log = log;
		} );

		it( 'uses listener data', async () => {
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			registerEditorEventHandler( {
				editor: createEditor(),
				evtName: 'instanceReady',
				handler: onInstanceReady,
				listenerData: { foo: 'bar' }
			} );
			expect( spyOnEventOn ).toHaveBeenCalledTimes( 1 );
			expect( spyOnEventOn ).toHaveBeenCalledWith( 'instanceReady', onInstanceReady, null, { foo: 'bar' }, undefined );
		} );

		it( 'accepts priority', async () => {
			const onInstanceReady = jasmine.createSpy( 'onInstanceReady' );
			registerEditorEventHandler( {
				editor: createEditor(),
				evtName: 'instanceReady',
				handler: onInstanceReady,
				priority: 0
			} );
			expect( spyOnEventOn ).toHaveBeenCalledTimes( 1 );
			expect( spyOnEventOn ).toHaveBeenCalledWith( 'instanceReady', onInstanceReady, null, undefined, 0 );
		} );
	} );
}

export default init;
