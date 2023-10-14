import { vi, describe, it, expect } from 'vitest';
import { renderHook, cleanup } from '@testing-library/react';
import useDebounce from '../useDebounce';

describe('useDebounce Hook', () => {
    afterEach(cleanup);

    it('should return the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce(42, 500));

        expect(result.current).toBe(42);
    });

    it('should return the initial value if the delay has not passed', async () => {
        const { result, rerender } = renderHook((value: number = 42) => useDebounce(value, 500));

        expect(result.current).toBe(42);
        rerender(24);

        // !!! WE DON'T WAIT FOR THE DELAY TO PASS !!!

        expect(result.current).toBe(42);
    });

    it('should return the updated debounced value after the delay has passed', async () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: {
                    value: 42,
                    delay: 500,
                },
            }
        );

        expect(result.current).toBe(42);
        rerender({
            value: 24,
            delay: 500,
        });

        await vi.waitFor(() => {
            expect(result.current).toBe(24);
        });
    });

    it('should clear the previous timeout when the value changes before the delay', async () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: {
                    value: 42,
                    delay: 500,
                },
            }
        );

        expect(result.current).toBe(42);
        rerender({
            value: 24,
            delay: 500,
        });

        expect(result.current).toBe(42);

        // !!! WE DON'T WAIT FOR THE DELAY TO PASS !!!
        
        rerender({value: 84, delay: 500,});

        await vi.waitFor(() => {
            expect(result.current).toBe(84);
        });
    });
});
