import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type SearchBarProps = {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({searchQuery, setSearchQuery}: SearchBarProps) {
    const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    return (
        <section className="search-bar" aria-labelledby='search-bar'>
            <FontAwesomeIcon className="search-bar__icon" icon={faMagnifyingGlass} color="var(--clr-text)" title='Magnifying Glass Icon' />
            <input id="search" className="search-bar__input" type="search" placeholder="Search for a country..." value={searchQuery} onChange={handleSearchQueryChange} />
        </section>
    );
}   