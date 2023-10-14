import { Link } from "react-router-dom";

type BorderCountriesProps = {
    borderCountriesCode: string[];
    cca3ToNameMap: { [key: string]: string }
}

export default function BorderCountries({borderCountriesCode, cca3ToNameMap}: BorderCountriesProps) {
    return (
        (borderCountriesCode.length > 0) ?
            (<nav className="country-page__border-countries" aria-label="Border countries list">
                <h3 className="country-page__border-countries-title">Border Countries:</h3>
                <ul className="country-page__border-countries-list">
                    {borderCountriesCode.map((cca3) => (
                        <li key={cca3} className="country-page__border-countries-list-item">
                            <Link
                                to={`/${cca3}`}
                                className="country-page__border-countries-link-btn"
                                aria-label={`Go to ${cca3ToNameMap[cca3]} details page`}>
                                {cca3ToNameMap[cca3]}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>)
        : (<></>)
    )
}