import { useEffect } from 'react';
import { useLocalStorage, useMediaQuery } from '../hooks';

type Theme = 'light' | 'dark';
type UseThemeModeResult = { theme: Theme, setToLight: () => void, setToDark: () => void, toggle: () => void};

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

/**
 * Returns the initial theme based on the user's color scheme preference.
 * @param initialValue - Optional initial value for the theme.
 * @returns The initial theme value.
 */
const initialTheme = (prefersDarkScheme: boolean, initialValue?: Theme,) => {
    if (initialValue) {
        return initialValue;
    }
    return prefersDarkScheme ? 'dark' : 'light';
}

/**
 * A hook that manages the theme mode of the application (light or dark mode).
 * @param key - The key to use for storing the theme mode in local storage.
 * @param initialValue - The initial value to use for the theme mode. If not provided, the hook will use the user's preferred color scheme.
 * @returns An object containing the current theme mode, as well as functions to set the theme mode to light or dark, and to toggle between the two.
 */
export default function useThemeMode(key: string, initialValue?: Theme): UseThemeModeResult {
    const prefersDarkScheme = useMediaQuery(COLOR_SCHEME_QUERY);
    const [_, theme, setTheme] = useLocalStorage<Theme>(key, initialTheme(prefersDarkScheme, initialValue));

    /**
     * Sets the theme to light mode regardless of what it is currently set to.
     */
    const setToLight = () => {
        setTheme('light');
    }
    
    /**
     * Sets the theme to dark mode regardless of what it is currently set to.
     */
    const setToDark = () => {
        setTheme('dark');
    }

    /**
     * Toggles the current theme mode between 'light' and 'dark'.
     */
    const toggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    // sets the data-theme attribute on the html element whenever the theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return { theme, setToLight, setToDark, toggle };
}