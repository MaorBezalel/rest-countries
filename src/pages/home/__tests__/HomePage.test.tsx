import { vi, describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';
import { HashRouter } from 'react-router-dom';
import * as hooks from '../../../hooks';
import { fakeHomePageCountries } from '../../../api/data/fakeData';

describe('HomePage Component', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    })

    it('should render the aside with contain search components', () => {
        render(<HomePage />);

        const searchAndFilterSection = screen.getByRole('search');
        expect(searchAndFilterSection).toBeInTheDocument();
    });

    it('should render the search bar searchbox and icon', () => {
        render(<HomePage />);

        const searchBar = screen.getByRole('searchbox');
        expect(searchBar).toBeInTheDocument();

        const searchIcon = screen.getByTitle('Magnifying Glass Icon');
        expect(searchIcon).toBeInTheDocument();
    });

    it('should render the "filter by region" box', () => {
        render(<HomePage />);

        const filterByRegion = screen.getByRole('combobox');
        expect(filterByRegion).toBeInTheDocument();
    });

    it('should render the countries cards section when there is data', () => {
        vi.spyOn(hooks, 'useFetch').mockReturnValue([{
            data: fakeHomePageCountries,
            isLoading: false,
            error: null,
        }, vi.fn()]);

        render(
            <HashRouter>
                <HomePage />
            </HashRouter>
        );

        const countriesCardsSection = screen.getByRole('navigation', { name: 'countries' });
        expect(countriesCardsSection).toBeInTheDocument();
    });

    it('should render the countries cards section when there is no data (loading)', () => {
        vi.spyOn(hooks, 'useFetch').mockReturnValue([{
            data: null,
            isLoading: true,
            error: null,
        }, vi.fn()]);

        render(<HomePage />);

        const countriesCardsSection = screen.getByRole('region', { name: 'countries-skeleton' });
        expect(countriesCardsSection).toBeInTheDocument();
    });

    it('should render an error message when the API request fails', () => {
        vi.spyOn(hooks, 'useFetch').mockReturnValue([{
            data: null,
            isLoading: false,
            error: new Error('Something went wrong! Please refresh the page or try again later'),
        }, vi.fn()]);

        render(<HomePage />);

        const errorMessage = screen.getByRole('region', { name: 'error' });
        expect(errorMessage).toBeInTheDocument();
    });
});