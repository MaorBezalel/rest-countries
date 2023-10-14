import { CountryInDetailPage } from "../../api/types";
import { detailApiRequestUrl } from "../../api/utils";
import { cca3ToNameMap } from "../../api/data/cca3ToNameMap";

import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { useFetch, useEffectAfterMount } from "../../hooks";

import CountryInfoList from "./components/CountryInfoList";
import BorderCountries from "./components/BorderCountries";

import CountryInfoListSkeleton from "./components/CountryInfoListSkeleton";
import BorderCountriesSkeleton from "./components/BorderCountriesSkeleton";

export default function CountryDetailPage() {
    const { cca3 } = useParams<{ cca3: string }>() as { cca3: string };
    const [country, sendRequest] = useFetch<CountryInDetailPage>(detailApiRequestUrl(cca3));

    // Since we are using the same component for different countries, we need to make sure that 
    // the component is re-rendered when the user navigates to a different country.
    useEffectAfterMount(() => {
        sendRequest(detailApiRequestUrl(cca3));
    }, [cca3]);

    return (
        <main className="country-page main-wrapper">
            <nav className="country-page__back-link container section">
                <Link to="/" className="country-page__back-link-btn" aria-label="Go back to the home page"><span>←</span> Back</Link>
            </nav>
                {(country.data) ? (
                    <section className="country-page__details container section">
                        <img className="country-page__flag" src={country.data.flags.svg} alt={country.data.flags.alt} />
                        <section className="country-page__info">
                            <h2 className="country-page__name">{country.data.name.common}</h2>
                            <CountryInfoList country={country.data} />
                            <BorderCountries borderCountriesCode={country.data.borders} cca3ToNameMap={cca3ToNameMap} />
                        </section>
                    </section>
                ) : (country.error) ? (
                    <section className="error container section" role="region" aria-label="error">
                        <h1 style={{color: 'firebrick'}}>{country.error.message}</h1>
                    </section>
                ) : (
                    <section className="country-page__details container section" aria-label="country-skeleton">
                        <Skeleton containerClassName="country-page__flag-skeleton-container" className="country-page__flag" containerTestId="flag-skeleton"/>
                        <section className="country-page__info">
                            <Skeleton width="15rem" height="2rem" />
                            <CountryInfoListSkeleton />
                            <BorderCountriesSkeleton />
                        </section>
                    </section>
                )}
        </main>
    )
}