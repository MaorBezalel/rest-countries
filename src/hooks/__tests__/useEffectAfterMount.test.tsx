import { vi, describe, it, expect } from 'vitest';
import { renderHook, cleanup } from '@testing-library/react';
import useEffectAfterMount from '../useEffectAfterMount';

describe('useEffectAfterMount Hook', () => {
    afterEach(cleanup);

    it('should not run the effect on the first render', () => {
        const effect = vi.fn();
        renderHook(() => useEffectAfterMount(effect));

        expect(effect).not.toHaveBeenCalled();
    });

    it('should run the effect on subsequent renders', () => {
        const effect = vi.fn();
        const { rerender } = renderHook(() => useEffectAfterMount(effect));

        expect(effect).not.toHaveBeenCalled();

        rerender();
        expect(effect).toHaveBeenCalledTimes(1);

        rerender();
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should not run the effect on the first render after an unmount (remount)', () => {
        const effect = vi.fn();
        const { rerender, unmount } = renderHook(() => useEffectAfterMount(effect));

        expect(effect).not.toHaveBeenCalled();

        rerender();
        expect(effect).toHaveBeenCalledTimes(1);

        unmount();

        const { rerender: remount } = renderHook(() => useEffectAfterMount(effect));

        expect(effect).toHaveBeenCalledTimes(1); // Still 1

        remount();
        expect(effect).toHaveBeenCalledTimes(2);
    });
});