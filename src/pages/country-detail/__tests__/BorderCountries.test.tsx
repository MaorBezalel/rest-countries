import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BorderCountries from '../components/BorderCountries';
import * as hooks from '../../../hooks';
import { HashRouter } from 'react-router-dom';
import { fakeDetailPageCountries } from '../../../api/data/fakeData';
import { fakeCCA3ToNameMap } from '../../../api/data/fakeData';

const country = fakeDetailPageCountries[0];

describe('BorderCountries Component', () => {
    it('should render the border countries', () => {
        vi.spyOn(hooks, 'useFetch').mockReturnValue([{
            data: country,
            isLoading: false,
            error: null,
        }, vi.fn()]);

        render(
            <HashRouter>
                <BorderCountries borderCountriesCode={country.borders} cca3ToNameMap={fakeCCA3ToNameMap} />
            </HashRouter>
        );

        country.borders.forEach((cca3) => {
            const link = screen.getByRole('link', { name: `Go to ${fakeCCA3ToNameMap[cca3]} details page` });
            expect(link).toHaveAttribute('href', `#/${cca3}`);
            expect(screen.getByText(fakeCCA3ToNameMap[cca3])).toBeInTheDocument();
        });
    });

    it('should let us go to the details page of a border country when we click on its button-like link', () => {
        render(
            <HashRouter>
                <BorderCountries borderCountriesCode={country.borders} cca3ToNameMap={fakeCCA3ToNameMap} />
            </HashRouter>
        );

        country.borders.forEach((cca3) => {
            const link = screen.getByRole('link', { name: `Go to ${fakeCCA3ToNameMap[cca3]} details page`});
            fireEvent.click(link);
            expect(window.location.hash).toBe(`#/${cca3}`);
        });
    });
});
