import { useState, useMemo } from "react";
import { useFetch, useEffectAfterMount, useDebounce } from "../../hooks";

import SearchBar from "./components/SearchBar";
import FilterByRegion from "./components/FilterByRegion";
import CountryCard from "./components/CountryCard";

import { homeApiRequestUrl, sortHomeApiResponse } from "../../api/utils";
import { CountryInHomePage, Region } from "../../api/types";

import CountryCardSkeleton from "./components/CountryCardSkeleton";

export default function HomePage() {
    const [filterByRegion, setFilterByRegion] = useState<Region>(Region.ALL);
    const [countries, sendRequest] = useFetch<CountryInHomePage[]>(homeApiRequestUrl(filterByRegion), [sortHomeApiResponse]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedSearchQuery = useDebounce(searchQuery);

    useEffectAfterMount(() => {
        sendRequest(homeApiRequestUrl(filterByRegion), [sortHomeApiResponse]);
    }, [filterByRegion]);

    const filteredCountries = useMemo(() => {
        if (searchQuery === "") {
            return countries.data?.map((country: CountryInHomePage) => {
                return <CountryCard key={country.cca3} country={country} />;
            });
        }
        return countries.data?.filter((country: CountryInHomePage) => {
            return country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
        }).map((country: CountryInHomePage) => {
            return <CountryCard key={country.cca3} country={country} />;
        });
    }, [countries.data, debouncedSearchQuery]);

    return (
        <main className="home-page main-wrapper">
            <aside className="home-page__search container section" role="search">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <FilterByRegion filterByRegion={filterByRegion} setFilterByRegion={setFilterByRegion} />
            </aside>
            {
                (countries.data) ? (
                    <nav className="home-page__countries container section" aria-label="countries">
                        {filteredCountries}
                    </nav>
                ) : (countries.error) ? (
                    <section className="error container section" role="region" aria-label="error">
                        <h1 style={{color: 'firebrick'}}>{countries.error.message}</h1>
                    </section>
                ) : (
                    <section className="home-page__countries container section" aria-label="countries-skeleton">
                        <CountryCardSkeleton count={8} />
                    </section>
                )
            }
        </main>
    );
}