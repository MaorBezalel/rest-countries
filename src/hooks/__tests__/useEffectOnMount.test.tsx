import { vi, describe, it, expect } from 'vitest';
import { renderHook, cleanup } from '@testing-library/react';
import useEffectOnMount from '../useEffectOnMount';

describe('useEffectOnMount Hook', () => {
    afterEach(cleanup);

    it('should run the effect on the first render', () => {
        const effect = vi.fn();
        renderHook(() => useEffectOnMount(effect));
        
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('should not run the effect on subsequent renders', () => {
        const effect = vi.fn();
        const { rerender } = renderHook(() => useEffectOnMount(effect));

        expect(effect).toHaveBeenCalledTimes(1);

        rerender();
        expect(effect).toHaveBeenCalledTimes(1); // Still 1

        rerender();
        expect(effect).toHaveBeenCalledTimes(1); // Still 1
    });

    it('should run the effect on the first render after an unmount (remount)', () => {
        const effect = vi.fn();
        const { rerender, unmount } = renderHook(() => useEffectOnMount(effect));

        expect(effect).toHaveBeenCalledTimes(1);

        rerender();
        expect(effect).toHaveBeenCalledTimes(1); // Still 1

        unmount();

        const { rerender: remount } = renderHook(() => useEffectOnMount(effect));

        expect(effect).toHaveBeenCalledTimes(2); // 2 now
        
        remount();
        expect(effect).toHaveBeenCalledTimes(2); // Still 2
    });
});