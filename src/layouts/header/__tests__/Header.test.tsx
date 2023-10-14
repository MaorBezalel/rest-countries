import '../../../__mocks__/matchMedia.mock';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
// import { createHashHistory } from "history";
import Header from '../Header';

describe('Header component', () => {
    it('should render the title of the app', () => {
        render(
            <HashRouter>
                <Header />
            </HashRouter>
        );

        expect(screen.getByText('Where in the world?')).toBeInTheDocument();
    });

    it('should bring us back to the home page when we click on the title', () => {
        render(
            <HashRouter>
                <Header />
            </HashRouter>
        );

        fireEvent.click(screen.getByText('Where in the world?'));
        expect(window.location.hash).toBe('#/');
    });

    it('should render the theme toggle button', () => {
        render(
            <HashRouter>
                <Header />
            </HashRouter>
        );

        const themeModeElement = screen.getByRole('button', { name: 'Light/Dark Mode' });
        expect(themeModeElement).toBeInTheDocument();
    });
});
