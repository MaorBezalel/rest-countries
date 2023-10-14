import Skeleton from "react-loading-skeleton";

export default function CountryInfoListSkeleton() {
    return (
        <section className="country-page__lists" aria-label="Country skeleton info list">
            <ul className="country-page__list">
                <li className="country-page__list-item"><Skeleton width="7rem" height="1.5rem"/> <Skeleton width="10rem" height="1.5rem"/></li>
                <li className="country-page__list-item"><Skeleton width="7rem" height="1.5rem"/> <Skeleton width="10rem" height="1.5rem"/></li>
                <li className="country-page__list-item"><Skeleton width="7rem" height="1.5rem"/> <Skeleton width="10rem" height="1.5rem"/></li>
                <li className="country-page__list-item"><Skeleton width="7rem" height="1.5rem"/> <Skeleton width="10rem" height="1.5rem"/></li>
                <li className="country-page__list-item"><Skeleton width="7rem" height="1.5rem"/> <Skeleton width="10rem" height="1.5rem"/></li>
            </ul>
            <ul className="country-page__list">
                <li className="country-page__list-item"><Skeleton width="7rem" height="1.5rem"/> <Skeleton width="10rem" height="1.5rem"/></li>
                <li className="country-page__list-item"><Skeleton width="7rem" height="1.5rem"/> <Skeleton width="10rem" height="1.5rem"/></li>
                <li className="country-page__list-item"><Skeleton width="7rem" height="1.5rem"/> <Skeleton width="10rem" height="1.5rem"/></li>
            </ul>
        </section>
    )
}