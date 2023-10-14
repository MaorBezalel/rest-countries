import { extractNativeNames, extractCurrencies, extractLanguages, formatPopulationNumber, outputArrayWithoutBrackets } from "../../../api/utils";
import { CountryInDetailPage } from "../../../api/types";

type CountryInfoListProps = {
    country: CountryInDetailPage;
}

export default function CountyInfoList({ country }: CountryInfoListProps) {
    return (
        <section className="country-page__lists" aria-label="Country info lists">
            <ul className="country-page__list">
                <li className="country-page__list-item"><b>Native Name:</b><p className="nowrap-text">{extractNativeNames(country.name.nativeName)}</p></li>
                <li className="country-page__list-item"><b>Population:</b><p className="nowrap-text">{formatPopulationNumber(country.population)}</p></li>
                <li className="country-page__list-item"><b>Region:</b><p className="nowrap-text">{country.region}</p></li>
                <li className="country-page__list-item"><b>Sub Region:</b><p className="nowrap-text">{country.subregion}</p></li>
                <li className="country-page__list-item"><b>Capital:</b><p className="nowrap-text">{outputArrayWithoutBrackets(country.capital)}</p></li>
            </ul>
            <ul className="country-page__list">
                <li className="country-page__list-item"><b>Top Level Domain:</b><p>{outputArrayWithoutBrackets(country.tld)}</p></li>
                <li className="country-page__list-item"><b>Currencies:</b><p>{extractCurrencies(country.currencies)}</p></li>
                <li className="country-page__list-item"><b>Languages:</b><p>{extractLanguages(country.languages)}</p></li>
            </ul>
        </section>
    )
}