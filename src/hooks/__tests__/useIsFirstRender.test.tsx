import { describe, it, expect } from 'vitest';
import { renderHook, cleanup } from '@testing-library/react';
import useIsFirstRender from '../useIsFirstRender';

describe('useIsFirstRender Hook', () => {
    afterEach(cleanup);

    it('should return true on the first render', () => {
        const { result } = renderHook(() => useIsFirstRender());

        expect(result.current).toBeTruthy();
    });

    it('should return false on subsequent renders', () => {
        const { result, rerender } = renderHook(() => useIsFirstRender());

        expect(result.current).toBeTruthy();

        rerender();

        expect(result.current).toBeFalsy();

        rerender();

        expect(result.current).toBeFalsy();
    });

    it('should return true on the first render after an unmount (remount)', () => {
        const { result, rerender, unmount } = renderHook(() => useIsFirstRender());

        expect(result.current).toBeTruthy();

        rerender();

        expect(result.current).toBeFalsy();

        unmount();

        const { result: remountResult } = renderHook(() => useIsFirstRender());

        expect(remountResult.current).toBeTruthy();
    });
});
