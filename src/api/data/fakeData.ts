import * as Types from '../types';

/**
 * An array of fake country data to be displayed on the home page.
 * @type {Types.CountryInHomePage[]}
 */
export const fakeHomePageCountries: Types.CountryInHomePage[] = Array.from({ length: 9 }, (_, index) => ({
    flags: {
        png: `flag${index + 1}.png`,
        svg: `flag${index + 1}.svg`,
        alt: `Flag ${index + 1} Description`,
    },
    name: {
        official: `Official Name ${index + 1}`,
        common: `Common Name ${index + 1}`,
        nativeName: {
            [`nativeName${index + 1}.1`]: {official: `Native Official Name ${index + 1}.1`, common: `Native Common Name ${index + 1}.1`},
            [`nativeName${index + 1}.2`]: {official: `Native Official Name ${index + 1}.2`, common: `Native Common Name ${index + 1}.2`},
        },
    },
    population: 1000000 * (index + 1),
    capital: [`Capital ${index + 1}`],
    region: Object.values(Types.Region)[Math.floor(Math.random() * Object.values(Types.Region).length)],
    cca3: `CCC${index + 1}`,
}));

/**
 * An array of fake country data objects, each representing a country's details for a detail page.
 * @type {Types.CountryInDetailPage[]}
 */
export const fakeDetailPageCountries: Types.CountryInDetailPage[] = Array.from({ length: 9 }, (_, index) => ({
    flags: {
        png: `flag${index + 1}.png`,
        svg: `flag${index + 1}.svg`,
        alt: `Flag ${index + 1} Description`,
    },
    name: {
        official: `Official Name ${index + 1}`,
        common: `Common Name ${index + 1}`,
        nativeName: {
            [`nativeName${index + 1}.1`]: {official: `Native Official Name ${index + 1}.1`, common: `Native Common Name ${index + 1}.1`},
            [`nativeName${index + 1}.2`]: {official: `Native Official Name ${index + 1}.2`, common: `Native Common Name ${index + 1}.2`},
        },
    },
    population: 1000000 * (index + 1),
    region: Object.values(Types.Region)[Math.floor(Math.random() * Object.values(Types.Region).length)],
    subregion: `Subregion ${index + 1}`,
    capital: [`Capital ${index + 1}`],
    tld: [`.tld${index + 1}`],
    currencies: { 
        [`currency ${index + 1}.1`]: { name: `Dollar ${index + 1}.1`, symbol: '$' },
        [`currency ${index + 1}.2`]: { name: `Dollar ${index + 1}.2`, symbol: '$' },
    },
    languages: { 
        [`language ${index + 1}.1`]: `Custom Language ${index + 1}.1`,
        [`language ${index + 1}.2`]: `Custom Language ${index + 1}.2`,
    },
    borders: (index !== 1) ? [`CCC${(index !== 9) ? (index + 2) % 10 : 1}`] : [],
    cca3: `CCC${index + 1}`,
}));

/**
 * A map of fake country codes to country names.
 * @type {{[key: string]: string}}
 */
export const fakeCCA3ToNameMap: {[key: string]: string} = Array.from({ length: 9 }, (_, index) => ({
    [`CCC${index + 1}`]: `Country ${index + 1}`,
})).reduce((acc, curr) => ({...acc, ...curr}), {});
