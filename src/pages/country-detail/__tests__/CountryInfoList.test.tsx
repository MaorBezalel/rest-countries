import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CountryInfoList from '../components/CountryInfoList';
import * as hooks from '../../../hooks';
import { fakeDetailPageCountries } from '../../../api/data/fakeData';
import { extractNativeNames, extractCurrencies, extractLanguages, formatPopulationNumber, outputArrayWithoutBrackets } from "../../../api/utils";

const country = fakeDetailPageCountries[0];

const mockedFormatPopulationNumber = vi.fn().mockImplementation((population) => formatPopulationNumber(population));
const mockedOutputArrayWithoutBrackets = vi.fn().mockImplementation((array) => outputArrayWithoutBrackets(array));
const mockedExtractNativeName = vi.fn().mockImplementation((nativeName) => extractNativeNames(nativeName));
const mockedExtractCurrencies = vi.fn().mockImplementation((currencies) => extractCurrencies(currencies));
const mockedExtractLanguages = vi.fn().mockImplementation((languages) => extractLanguages(languages));

describe('CountryInfoList Component', () => {
    it('should render the country info list with the correct data', () => {
        vi.spyOn(hooks, 'useFetch').mockReturnValue([{
            data: country,
            isLoading: false,
            error: null,
        }, vi.fn()]);

        render(<CountryInfoList country={country} />);

        // Check if the native name is rendered
        expect(screen.getByText('Native Name:')).toBeInTheDocument();
        expect(screen.getByText(mockedExtractNativeName(country.name.nativeName))).toBeInTheDocument();

        // Check if the population is rendered with the correct format
        expect(screen.getByText('Population:')).toBeInTheDocument();
        expect(screen.getByText(mockedFormatPopulationNumber(country.population))).toBeInTheDocument();

        // Check if the region is rendered
        expect(screen.getByText('Region:')).toBeInTheDocument();
        expect(screen.getByText(country.region)).toBeInTheDocument();

        // Check if the subregion is rendered
        expect(screen.getByText('Sub Region:')).toBeInTheDocument();
        expect(screen.getByText(country.subregion)).toBeInTheDocument();

        // Check if the capital is rendered
        expect(screen.getByText('Capital:')).toBeInTheDocument();
        expect(screen.getByText(mockedOutputArrayWithoutBrackets(country.capital))).toBeInTheDocument();

        // Check if the top level domain is rendered
        expect(screen.getByText('Top Level Domain:')).toBeInTheDocument();
        expect(screen.getByText(mockedOutputArrayWithoutBrackets(country.tld))).toBeInTheDocument();

        // Check if the currencies are rendered
        expect(screen.getByText('Currencies:')).toBeInTheDocument();
        expect(screen.getByText(mockedExtractCurrencies(country.currencies))).toBeInTheDocument();

        // Check if the languages are rendered
        expect(screen.getByText('Languages:')).toBeInTheDocument();
        expect(screen.getByText(mockedExtractLanguages(country.languages))).toBeInTheDocument();
    });
});