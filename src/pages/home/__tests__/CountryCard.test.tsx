import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { fakeHomePageCountries } from '../../../api/data/fakeData';
import { formatPopulationNumber, outputArrayWithoutBrackets } from '../../../api/utils';


const country = fakeHomePageCountries[0];
const mockedFormatPopulationNumber = vi.fn().mockImplementation((population) => formatPopulationNumber(population));
const mockedOutputArrayWithoutBrackets = vi.fn().mockImplementation((array) => outputArrayWithoutBrackets(array));

describe('CountryCard Component', () => {
    it('should render the country card with the correct data', () => {
        render(
            <HashRouter>
                <CountryCard country={country} data-testid="country-card-test" />
            </HashRouter>
        );

        // Check if the country name is rendered
        expect(screen.getByText(country.name.common)).toBeInTheDocument();

        // Check if the population is rendered with the correct format
        expect(screen.getByText('Population:')).toBeInTheDocument();
        expect(screen.getByText(mockedFormatPopulationNumber(country.population))).toBeInTheDocument();

        // Check if the region is rendered
        expect(screen.getByText('Region:')).toBeInTheDocument();
        expect(screen.getByText(country.region)).toBeInTheDocument();

        // Check if the capital is rendered
        expect(screen.getByText('Capital:')).toBeInTheDocument();
        expect(screen.getByText(mockedOutputArrayWithoutBrackets(country.capital))).toBeInTheDocument();

        // Check if the flag image is rendered with the correct alt text
        expect(screen.getByAltText(country.flags.alt)).toBeInTheDocument();
    });

    it('should have a link to the country details page', () => {
        render(
            <HashRouter>
                <CountryCard country={country} />
            </HashRouter>
        );

        // Check if the card is wrapped with a link to the correct URL
        const link = screen.getByRole('link', { name: `Go to ${country.name.common} details page` });
        expect(link).toHaveAttribute('href', `#/${country.cca3}`);
    });
});
