import Skeleton from "react-loading-skeleton";

export default function BorderCountriesSkeleton() {
    return (
        <section className="country-page__border-countries" aria-label="A loading skeleton of border countries links">
            <Skeleton width="12rem" height="3rem"/>
            <ul className="country-page__border-countries-list">
                <li><Skeleton width="8rem" height="2.5rem"/></li>
                <li><Skeleton width="8rem" height="2.5rem"/></li>
                <li><Skeleton width="8rem" height="2.5rem"/></li>
                <li><Skeleton width="8rem" height="2.5rem"/></li>
                <li><Skeleton width="8rem" height="2.5rem"/></li>
                <li><Skeleton width="8rem" height="2.5rem"/></li>
            </ul>
        </section>
    )
}