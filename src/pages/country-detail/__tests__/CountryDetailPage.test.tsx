import { vi, describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryDetailPage from '../CountryDetailPage';
import { HashRouter } from 'react-router-dom';
import * as hooks from '../../../hooks';
import { fakeDetailPageCountries } from '../../../api/data/fakeData';

const country1 = fakeDetailPageCountries[0];
const country2 = fakeDetailPageCountries[1];

describe('CountryDetailPage Component', () => {
    describe('when we want to go back to the home page', () => {
        it('should render a button-like link to the home page', () => {
            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const link = screen.getByRole('link', { name: 'Go back to the home page' });
            expect(link).toBeInTheDocument();
        });

        it('should let us go back to the home page when we click on the button-like link', () => {
            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const link = screen.getByRole('link', { name: 'Go back to the home page' });
            fireEvent.click(link);
            expect(window.location.hash).toBe('#/');
        });
    });

    describe('when there is data', () => {
        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should render the flag of the country', () => {
            vi.spyOn(hooks, 'useFetch').mockReturnValue([{
                data: country1,
                isLoading: false,
                error: null,
            }, vi.fn()]);

            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const flag = screen.getByAltText(country1.flags.alt);
            expect(flag).toBeInTheDocument();
        });

        it('should render the name of the country', () => {
            vi.spyOn(hooks, 'useFetch').mockReturnValue([{
                data: country1,
                isLoading: false,
                error: null,
            }, vi.fn()]);

            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const name = screen.getByText(country1.name.common);
            expect(name).toBeInTheDocument();
        });

        it('should render the country info list', () => {
            vi.spyOn(hooks, 'useFetch').mockReturnValue([{
                data: country1,
                isLoading: false,
                error: null,
            }, vi.fn()]);

            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const countryInfoList = screen.getByLabelText('Country info lists');
            expect(countryInfoList).toBeInTheDocument();
        });

        it('should render the border countries list for countries with border countries', () => {
            vi.spyOn(hooks, 'useFetch').mockReturnValue([{
                data: country1,
                isLoading: false,
                error: null,
            }, vi.fn()]);

            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const borderCountriesList = screen.getByLabelText('Border countries list');
            expect(borderCountriesList).toBeInTheDocument();
        });

        it('should not render the border countries list for countries without border countries', () => {
            vi.spyOn(hooks, 'useFetch').mockReturnValue([{
                data: country2,
                isLoading: false,
                error: null,
            }, vi.fn()]);

            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const borderCountriesList = screen.queryByLabelText('Border countries list');
            expect(borderCountriesList).not.toBeInTheDocument();
        });
    });

    describe('when there is no data (loading)', () => {
        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should render the flag skeleton', () => {
            vi.spyOn(hooks, 'useFetch').mockReturnValue([{
                data: null,
                isLoading: true,
                error: null,
            }, vi.fn()]);

            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const flagSkeleton = screen.getByTestId('flag-skeleton');
            expect(flagSkeleton).toBeInTheDocument();
        });

        it('should render the country info list skeleton', () => {
            vi.spyOn(hooks, 'useFetch').mockReturnValue([{
                data: null,
                isLoading: true,
                error: null,
            }, vi.fn()]);

            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const countryInfoListSkeleton = screen.getByLabelText('Country skeleton info list');
            expect(countryInfoListSkeleton).toBeInTheDocument();
        });

        it('should render the border countries list skeleton', () => {
            vi.spyOn(hooks, 'useFetch').mockReturnValue([{
                data: null,
                isLoading: true,
                error: null,
            }, vi.fn()]);

            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const borderCountriesListSkeleton = screen.getByLabelText('A loading skeleton of border countries links');
            expect(borderCountriesListSkeleton).toBeInTheDocument();
        });
    });

    describe('when there is an error', () => {
        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should render the error message', () => {
            vi.spyOn(hooks, 'useFetch').mockReturnValue([{
                data: null,
                isLoading: false,
                error: new Error('Something went wrong! Please refresh the page or try again later.'),
            }, vi.fn()]);

            render(
                <HashRouter>
                    <CountryDetailPage />
                </HashRouter>
            );

            const errorMessage = screen.getByLabelText('error');
            expect(errorMessage).toBeInTheDocument();
        });
    });
});