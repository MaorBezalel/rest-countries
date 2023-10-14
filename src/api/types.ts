// =========================================HOME-PAGE==================================================
/**
 * Represents a country object to be displayed in the home page.
 */
export type CountryInHomePage = {
    flags:      Flags;
    name:       Name;
    population: number;
    capital:    string[];
    region:     Region;
    cca3:       string;
}
// ====================================================================================================

// =========================================COUNTRY-DETAIL-PAGE========================================
/**
 * Represents a country object to be displayed in the country's detailed page.
 */
export type CountryInDetailPage = {
    flags:      Flags;
    name:       Name;
    population: number;
    region:     Region;
    subregion:  string;
    capital:    string[];
    tld:        string[];
    currencies: { [key: string]: Currency };
    languages:  { [key: string]: string };
    borders:    string[];
    cca3:       string;
}

export type Currency = {
    name:   string;
    symbol: string;
}
// ====================================================================================================

// =========================================GENERAL-TYPES==============================================
/**
 * Represents the flags of a country in different formats.
 */
export type Flags = {
    /** The URL of the flag in PNG format. */
    png: string;
    /** The URL of the flag in SVG format. */
    svg: string;
    /** The alternative text for the flag. */
    alt: string;
}

export type Name = {
    official:   string;
    common:     string;
    nativeName: { [key: string]: NativeName };
}

export type NativeName = {
    official: string;
    common:   string;
}

/**
 * An enum representing the different regions of the world.
 */
export enum Region {
    ALL = 'All',
    AFRICA = 'Africa',
    AMERICAS = 'Americas',
    ASIA = 'Asia',
    EUROPE = 'Europe',
    OCEANIA = 'Oceania',
}
// ====================================================================================================

