import { renderHook } from '@testing-library/react-hooks/dom';
import useCKEditor from '../src/useCKEditor';

describe( 'useCKEditor' , () => {
	it( 'renders correctly', () => {
	  const { result } = renderHook(() => useCKEditor())
	  expect(result.current).toEqual( {} );
	});
});
