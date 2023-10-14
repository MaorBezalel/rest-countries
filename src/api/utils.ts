import * as Types from './types';
import { BASE_URL, FIELDS_FOR_HOME_PAGE, FIELDS_FOR_COUNTRY_PAGE } from './data/constants';

// =======================================HOME-PAGE-FUNCTIONS=================================================
/**
 * Returns the API request URL for the home page based on the selected region.
 * @param region - The selected region.
 * @returns The API request URL for the home page.
 */
export const homeApiRequestUrl = (region: Types.Region): string => {
    return (region === Types.Region.ALL) ? `${BASE_URL}/all${FIELDS_FOR_HOME_PAGE}` : `${BASE_URL}/region/${region}${FIELDS_FOR_HOME_PAGE}`;
}

/**
 * Sorts an array of country objects by their common name in ascending order.
 * @param data - An array of country objects to be sorted.
 * @returns A new array of country objects sorted by their common name.
 */
export const sortHomeApiResponse = (data: Types.CountryInHomePage[]): Types.CountryInHomePage[] => {
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
}
// ===========================================================================================================


// =======================================COUNTRY-DETAIL-PAGE-FUNCTIONS=======================================
/**
 * Returns the detail API request URL for a given country code.
 * @param cca3 - The country code (3-letter ISO 3166-1 alpha-3 code).
 * @returns The detail API request URL.
 */
export const detailApiRequestUrl = (cca3: string): string => {
    return `${BASE_URL}/alpha/${cca3}${FIELDS_FOR_COUNTRY_PAGE}`;
}

/**
 * Extracts an array of native names from an object of native names.
 * @param nativeNames - An object containing native names.
 * @returns An array of native names without brackets.
 */
export const extractNativeNames = (nativeNames: {[key: string]: Types.NativeName}) => {
    let nativeNamesArray = [...new Set(Object.values(nativeNames).map(nativeName => nativeName.common))]; // Set to remove duplicates
    return outputArrayWithoutBrackets(nativeNamesArray);
}

/**
 * Extracts the currencies from an object of currencies and returns them as a string array.
 * @param currencies - An object containing currencies.
 * @returns An array of strings representing the currencies in the format "name (symbol)".
 */
export const extractCurrencies = (currencies: {[key: string]: Types.Currency}) => {
    let currenciesArray = [...new Set(Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`))]; // Set to remove duplicates
    return outputArrayWithoutBrackets(currenciesArray);
}

/**
 * Extracts an array of unique language names from an object of language codes and names.
 * @param languages - An object containing language codes and names.
 * @returns An array of unique language names.
 */
export const extractLanguages = (languages: {[key: string]: string}) => {
    let languagesArray = [...new Set(Object.values(languages).map(language => language))]; // Set to remove duplicates
    return outputArrayWithoutBrackets(languagesArray);
}
// ===========================================================================================================


// =======================================GENERAL-FUNCTIONS=======================================

/**
 * Formats a population number into a string with comma-separated thousands.
 * @param populationNum - The population number to format.
 * @returns A string representation of the population number with comma-separated thousands.
 */
export const formatPopulationNumber = (populationNum: number): string => {
    return populationNum.toLocaleString('en-US')
}

/**
 * Returns a string representation of an array without brackets.
 * @param arr - The array to be converted to a string.
 * @returns A string representation of the array without brackets.
 */
export const outputArrayWithoutBrackets = (arr: string[]): string => {
    return arr.join(", ");
}
// ===============================================================================================