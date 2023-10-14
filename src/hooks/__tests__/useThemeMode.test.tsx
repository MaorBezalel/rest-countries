import '../../__mocks__/matchMedia.mock';
import { vi, describe, it, expect, afterEach } from 'vitest';
import { renderHook, cleanup, act } from '@testing-library/react';
import useThemeMode from '../useThemeMode';
import * as hooks from '../../hooks';
import {useState} from 'react';

describe('useThemeMode Hook', () => {
    const testKey = 'test'; // the key is used to for useThemeMode's key
    const storedTestKey = `${window.location.pathname}:${testKey}`; // The key to be used for storing and retrieving the value from local storage during the tests

    describe('when a user visits the site for the first time', () => {
        afterEach(() => {
            vi.clearAllMocks();
            cleanup(); 
            window.localStorage.removeItem(storedTestKey); // Clean up the local storage after each test
        });

        it('should set the theme mode to dark if the user prefers dark mode', () => {
            vi.spyOn(hooks, 'useMediaQuery').mockReturnValue(true); // true = prefers dark mode
            const { result } = renderHook(() => useThemeMode(testKey));

            expect(result.current.theme).toBe('dark');
        });

        it('should set the theme mode to light if the user prefers light mode', () => {
            vi.spyOn(hooks, 'useMediaQuery').mockReturnValue(false); // false = prefers light mode
            const { result } = renderHook(() => useThemeMode(testKey));;

            expect(result.current.theme).toBe('light');
        });
    });

    describe('when a user has visited the site before', () => {
        const mockUseLocalStorage = (mode: 'light' | 'dark') => window.localStorage.setItem(storedTestKey, JSON.stringify(mode));

        afterEach(() => {
            vi.clearAllMocks();
            cleanup(); 
            window.localStorage.removeItem(storedTestKey); // Clean up the local storage after each test
        });

        it('should keep the theme mode as dark if the user set it to dark, even if they prefer light mode', () => {
            vi.spyOn(hooks, 'useMediaQuery').mockReturnValue(false); // false = prefers light mode
            mockUseLocalStorage('dark') // Set the theme mode to dark
            const { result } = renderHook(() => useThemeMode(testKey));

            expect(result.current.theme).toBe('dark');
        });

        it('should keep the theme mode as light if the user set it to light, even if they prefer dark mode', () => {
            vi.spyOn(hooks, 'useMediaQuery').mockReturnValue(true); // true = prefers dark mode
            mockUseLocalStorage('light') // Set the theme mode to light
            const { result } = renderHook(() => useThemeMode(testKey));

            expect(result.current.theme).toBe('light');
        });
    });

    describe('when a user wants to change the theme mode', () => {
        afterEach(() => {
            vi.clearAllMocks();
            cleanup(); 
            window.localStorage.removeItem(storedTestKey); // Clean up the local storage after each test
        });

        it('should allow setting the theme to dark mode', () => {
            const { result } = renderHook(() => useThemeMode(testKey, 'light'));

            // Check the theme mode
            expect(result.current.theme).toBe('light');

            // Set the theme mode to dark and check it again
            act(() => result.current.setToDark());
            expect(result.current.theme).toBe('dark');
        });

        it('should allow setting the theme to light mode', () => {
            const { result } = renderHook(() => useThemeMode(testKey, 'dark'));

            // Check the theme mode
            expect(result.current.theme).toBe('dark');

            // Set the theme mode to dark and check it again
            act(() => result.current.setToLight());
            expect(result.current.theme).toBe('light');
        });

        it('should allow toggling between light and dark mode', () => {
            const { result } = renderHook(() => useThemeMode(testKey, 'light'));

            // Check the theme mode
            expect(result.current.theme).toBe('light');

            // Toggle the theme mode and check it again
            act(() => result.current.toggle());
            expect(result.current.theme).toBe('dark');

            // Toggle the theme mode and check it again
            act(() => result.current.toggle());
            expect(result.current.theme).toBe('light');
        });

        it('test', () => {
            const {result} = renderHook(() => useState('a'));
            act(() => result.current[1]('b'));
            expect(result.current[0]).toBe('b');
        })
    });
});