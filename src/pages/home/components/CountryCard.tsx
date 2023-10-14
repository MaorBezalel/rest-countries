import { CountryInHomePage } from '../../../api/types';
import { formatPopulationNumber, outputArrayWithoutBrackets } from '../../../api/utils';
import { Link } from "react-router-dom";

type CountryCardProps = {
    country: CountryInHomePage;
};

export default function CountryCard({country}: CountryCardProps) {
    return (
        <Link key={country.cca3} to={`/${country.cca3}`} className="country-card" aria-label={`Go to ${country.name.common} details page`}>
            <section className="country-card__flag">
                <img src={country.flags.svg} alt={country.flags.alt ?? `The flag of the ${country.name.official}`} />
            </section>
            <section className="country-card__details">
                <h2 className="country-card__name">{country.name.common}</h2>
                <ul className="country-card__info">
                    <li className="country-card__info-item"><b>Population:</b> <p>{formatPopulationNumber(country.population)}</p></li>
                    <li className="country-card__info-item"><b>Region:</b> <p>{country.region}</p></li>
                    <li className="country-card__info-item"><b>Capital:</b> <p>{outputArrayWithoutBrackets(country.capital)}</p></li>
                </ul>
            </section>
        </Link>
    );
}