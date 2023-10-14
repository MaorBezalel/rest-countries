import { describe, it, expect, afterEach } from 'vitest';
import { renderHook, cleanup, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';

describe('useLocalStorage Hook', () => {
    const KEY = 0; // the index of the key in the tuple returned by the hook
    const VALUE = 1; // the index of the value in the tuple returned by the hook
    const SET_VALUE = 2; // the index of the setter function in the tuple returned by the hook
    let testKey: string; // The key to be used for storing and retrieving the value from local storage during the tests

    describe('when we want to use the hook for regular state management', () => {
        afterEach(() => {
            cleanup(); 
            window.localStorage.removeItem(testKey); // Clean up the local storage after each test
        });

        it('should allow us to use declare a value and access it in the current render', () => {
            const { result } = renderHook(() => useLocalStorage<string>('test', 'value'));
            testKey = result.current[KEY]; // Store the key for cleanup (returns a modified key that is unique to the current page)
    
            // Check the value on the first/initial render
            expect(result.current[VALUE]).toBe('value');
        });

        it('should allow us to declare a value and access it on subsequent renders', () => {
            const { result, rerender } = renderHook(() => useLocalStorage<string>('test', 'value'));
            testKey = result.current[KEY]; // Store the key for cleanup (returns a modified key that is unique to the current page)
    
            // Check the value on the first/initial render
            expect(result.current[VALUE]).toBe('value');
    
            // Check the value on a subsequent render
            rerender();
            expect(result.current[VALUE]).toBe('value');
        });

        it('should allow us to set/upadate the value and access it on the current render', () => {
            const { result } = renderHook(() => useLocalStorage<string>('test', 'value'));
            testKey = result.current[KEY]; // Store the key for cleanup (returns a modified key that is unique to the current page)
    
            // Check the value on the first/initial render
            expect(result.current[VALUE]).toBe('value');
    
            // Update the value and check it again
            act(() => result.current[SET_VALUE]('updated'));
            expect(result.current[VALUE]).toBe('updated');
        });
    
        it('should allow us to set/upadate the value and access it on subsequent renders', () => {
            const { result, rerender } = renderHook(() => useLocalStorage<string>('test', 'initial'));
            testKey = result.current[KEY]; // Store the key for cleanup (returns a modified key that is unique to the current page)
    
            // Check the value on the first/initial render
            expect(result.current[VALUE]).toBe('initial');
    
            // Update the value and check it on a subsequent render
            act(() => result.current[SET_VALUE]('updated'));
            rerender();
            expect(result.current[VALUE]).toBe('updated');
        });
    });

    describe('when we want to use the hook for state persistence', () => {
        afterEach(() => {
            cleanup(); 
            window.localStorage.removeItem(testKey); // Clean up the local storage after each test
        });

        it('should store the value in local storage', () => {
            const { result } = renderHook(() => useLocalStorage<string>('test', 'value'));
            testKey = result.current[KEY]; // Store the key for cleanup (returns a modified key that is unique to the current page)
    
            // Check the value in local storage
            const valueFromLocalStorage = JSON.parse(window.localStorage.getItem(testKey)?.toString() || '');
            expect(valueFromLocalStorage).toBe('value');
        });

        it('should update the value in local storage when the value is updated', () => {
            const { result } = renderHook(() => useLocalStorage<string>('test', 'initial'));
            testKey = result.current[KEY]; // Store the key for cleanup (returns a modified key that is unique to the current page)
    
            // Check the value in local storage
            let valueFromLocalStorage = JSON.parse(window.localStorage.getItem(testKey)?.toString() || '');
            expect(valueFromLocalStorage).toBe('initial');
    
            // Update the value and check it again
            act(() => result.current[SET_VALUE]('updated'));
            valueFromLocalStorage = JSON.parse(window.localStorage.getItem(testKey)?.toString() || '');
            expect(valueFromLocalStorage).toBe('updated');
        });

        it('should not initialize the value in local storage if the key is already present', () => {
            const { result, rerender } = renderHook((initialValue: string = 'first initial') => useLocalStorage<string>('test', initialValue));
            testKey = result.current[KEY]; // Store the key for cleanup (returns a modified key that is unique to the current page)

            // Check the value in local storage
            let valueFromLocalStorage = JSON.parse(window.localStorage.getItem(testKey)?.toString() || '');
            expect(valueFromLocalStorage).toBe('first initial');

            // Rerender the hook with a different initial value and check again the value in local storage
            rerender('second initial');
            valueFromLocalStorage = JSON.parse(window.localStorage.getItem(testKey)?.toString() || '');
            expect(valueFromLocalStorage).toBe('first initial'); // Should still be the first initial value
        });
    });
});