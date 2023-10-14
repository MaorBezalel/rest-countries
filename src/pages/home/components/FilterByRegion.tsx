import { Region } from "../../../api/types";

type FilterByRegionProps = {
    filterByRegion: Region;
    setFilterByRegion: (region: Region) => void;
}

export default function FilterByRegion({filterByRegion, setFilterByRegion}: FilterByRegionProps) {
    const handleDetailsClick = (e: React.MouseEvent<HTMLDetailsElement>) => {
        e.preventDefault();
        e.currentTarget.open = !e.currentTarget.open;
    }
    
    const handleFilterByRegion = (e: React.MouseEvent<HTMLButtonElement>) => {
        const region = e.currentTarget.value as Region;
        if (region === filterByRegion) return; // avoid unnecessary api calls
        setFilterByRegion(region);
    }

    return (
        <details className="filter-by-region" onClick={handleDetailsClick} role="combobox">
            <summary className="filter-by-region__title"><span>Filter by Region</span></summary>
            <menu className="filter-by-region__menu">
                <li className="filter-by-region__menu-item"><button aria-label={Region.ALL} value={Region.ALL} onClick={handleFilterByRegion}>All</button></li>
                <li className="filter-by-region__menu-item"><button aria-label={Region.AFRICA} value={Region.AFRICA} onClick={handleFilterByRegion}>Africa</button></li>
                <li className="filter-by-region__menu-item"><button aria-label={Region.AMERICAS} value={Region.AMERICAS} onClick={handleFilterByRegion}>Americas</button></li>
                <li className="filter-by-region__menu-item"><button aria-label={Region.ASIA} value={Region.ASIA} onClick={handleFilterByRegion}>Asia</button></li>
                <li className="filter-by-region__menu-item"><button aria-label={Region.EUROPE} value={Region.EUROPE} onClick={handleFilterByRegion}>Europe</button></li>
                <li className="filter-by-region__menu-item"><button aria-label={Region.OCEANIA} value={Region.OCEANIA} onClick={handleFilterByRegion}>Oceania</button></li>
            </menu>
        </details>
    );
}