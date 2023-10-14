import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

type CountryCardSkeletonProps = {
    count: number;
}

export default function CountryCardSkeleton({count}: CountryCardSkeletonProps) {
    return Array(count).fill(0).map((_, index) => {
        return (
            <div key={index} className="country-card-skeleton" aria-label="A loading skeleton of a country card">
                <section className="country-card-skeleton__flag">
                    <Skeleton height="11rem" />
                </section>
                <section className="country-card-skeleton__details">
                    <Skeleton height="2rem" />
                    <Skeleton count={3} />
                </section>
            </div>
        )
    });
}