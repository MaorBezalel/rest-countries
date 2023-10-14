import { BASE_URL, FIELDS_FOR_HOME_PAGE, FIELDS_FOR_COUNTRY_PAGE } from '../data/constants.ts';
import * as Types from '../types';
import { fakeHomePageCountries, fakeDetailPageCountries } from '../data/fakeData.ts';
import { describe, expect, it } from 'vitest';

// =======================================HOME-PAGE-FUNCTIONS=================================================
import { homeApiRequestUrl } from '../utils.ts';
describe('homeApiRequestUrl', () => {
    it('should return the correct url for all countries', () => {
        expect(homeApiRequestUrl(Types.Region.ALL)).toBe(`${BASE_URL}/all${FIELDS_FOR_HOME_PAGE}`);
    });

    it('should return the correct url for each specific region', () => {
        const regions = Object.values(Types.Region).filter(region => region !== Types.Region.ALL);
        regions.forEach(region => {
            expect(homeApiRequestUrl(region)).toBe(`${BASE_URL}/region/${region}${FIELDS_FOR_HOME_PAGE}`);
        });
    });
});

import { sortHomeApiResponse } from '../utils.ts';
describe('sortHomeApiResponse', () => {
    it('should sort the countries Lexicographic order by their common name', () => {
        const sortedCountries = sortHomeApiResponse(fakeHomePageCountries);
        const sortedCountriesNames = sortedCountries.map(country => country.name.common);
        const expectedCountriesNames = Array(fakeHomePageCountries.length).fill(0).map((_, index) => `Common Name ${index + 1}`);
        expect(sortedCountriesNames).toEqual(expectedCountriesNames);
    });
});
// ===========================================================================================================


// =======================================COUNTRY-DETAIL-PAGE-FUNCTIONS=======================================
import { detailApiRequestUrl } from '../utils.ts';
describe('detailApiRequestUrl', () => {
    it('should return the correct url for each country', () => {
        const cca3s = fakeHomePageCountries.map(country => country.cca3);
        cca3s.forEach(cca3 => {
            expect(detailApiRequestUrl(cca3)).toBe(`${BASE_URL}/alpha/${cca3}${FIELDS_FOR_COUNTRY_PAGE}`);
        });
    });
});

import { extractNativeNames } from '../utils.ts';
describe('extractNativeNames', () => {
    it('should return the correct native names for each country as a string where each name is separated by a comma and a space', () => {
        const nativeNames = fakeHomePageCountries.map(country => country.name.nativeName);
        nativeNames.forEach((nativeName, index) => {
            expect(extractNativeNames(nativeName)).toBe(`Native Common Name ${index + 1}.1, Native Common Name ${index + 1}.2`);
        });
    });
});

import { extractCurrencies } from '../utils.ts';
describe('extractCurrencies', () => {
    it('should return the correct currencies for each country as a string where each currency is separated by a comma and a space', () => {
        const currencies = fakeDetailPageCountries.map(country => country.currencies);
        currencies.forEach((currency, index) => {
            expect(extractCurrencies(currency)).toBe(`Dollar ${index + 1}.1 ($), Dollar ${index + 1}.2 ($)`);
        });
    });
});

import { extractLanguages } from '../utils.ts';
describe('extractLanguages', () => {
    it('should return the correct languages for each country as a string where each language is separated by a comma and a space', () => {
        const languages = fakeDetailPageCountries.map(country => country.languages);
        languages.forEach((language, index) => {
            expect(extractLanguages(language)).toBe(`Custom Language ${index + 1}.1, Custom Language ${index + 1}.2`);
        });
    });
});
// ===========================================================================================================


// =======================================GENERAL-FUNCTIONS===================================================
import { formatPopulationNumber } from '../utils.ts';
describe('formatPopulationNumber', () => {
    it('should return the correct population number with commas for numbers greater than 999', () => {
        const populationNumbers = [899, 999, 1000];
        populationNumbers.forEach((populationNumber) => {
            if (populationNumber > 999) {
                expect(formatPopulationNumber(populationNumber)).toContain(',');
            } else {
                expect(formatPopulationNumber(populationNumber)).not.toContain(',');
            }
        });
    });
});

import { outputArrayWithoutBrackets } from '../utils.ts';
describe('outputArrayWithoutBrackets', () => {
    it('should return the correct string where each element of the array is separated by a comma and a space', () => {
        const arrays = [
            ['element1', 'element2'],
            ['element1', 'element2', 'element3'],
            ['element1', 'element2', 'element3', 'element4'],
        ];
        arrays.forEach((array) => {
            expect(outputArrayWithoutBrackets(array)).toBe(array.join(', '));
        });
    });
});
// ===========================================================================================================