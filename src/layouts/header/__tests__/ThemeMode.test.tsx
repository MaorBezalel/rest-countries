import '../../../__mocks__/matchMedia.mock';
import { vi, describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ThemeMode from '../theme-mode/ThemeMode';
import * as hooks from '../../../hooks';

describe('ThemeMode component', () => {
    it('should render the theme toggle button', () => {
        const { getByRole } = render(<ThemeMode />);

        const themeToggleButton = getByRole('button', { name: 'Light/Dark Mode' });
        expect(themeToggleButton).toBeInTheDocument();
    });

    it('should render the correct icon on the theme toggle button for the light theme mode', () => {
        vi.spyOn(hooks, 'useThemeMode').mockReturnValue({
            theme: 'light',
            setToLight: vi.fn(),
            setToDark: vi.fn(),
            toggle: vi.fn(),
        });

        const { getByAltText } = render(<ThemeMode />);
        const sunIcon = getByAltText('Sun Icon');
        expect(sunIcon).toBeInTheDocument();
    });

    it('should render the correct icon on the theme toggle button for the dark theme mode', () => {
        vi.spyOn(hooks, 'useThemeMode').mockReturnValue({
            theme: 'dark',
            setToLight: vi.fn(),
            setToDark: vi.fn(),
            toggle: vi.fn(),
        });

        const { getByAltText } = render(<ThemeMode />);
        const moonIcon = getByAltText('Moon Icon');
        expect(moonIcon).toBeInTheDocument();
    });

    it('should call the toggle function when the theme toggle button is clicked', () => {
        const toggleMock = vi.fn();
        vi.spyOn(hooks, 'useThemeMode').mockReturnValue({
            theme: 'light', // Let initial theme be light
            setToLight: vi.fn(), 
            setToDark: vi.fn(), 
            toggle: toggleMock
        });

        const { getByRole } = render(<ThemeMode />);
        const themeToggleButton = getByRole('button', { name: 'Light/Dark Mode' });

        fireEvent.click(themeToggleButton);
        expect(toggleMock).toHaveBeenCalled();
    });
});