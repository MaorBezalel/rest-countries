import { vi, describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    })

    it('should render the search bar searchbox', () => {
        render(<SearchBar searchQuery={""} setSearchQuery={vi.fn()} />);

        const searchBar = screen.getByRole('searchbox');
        expect(searchBar).toBeInTheDocument();
    });

    it('should render the search bar icon', () => {
        render(<SearchBar searchQuery={""} setSearchQuery={vi.fn()} />);

        const searchIcon = screen.getByTitle('Magnifying Glass Icon');
        expect(searchIcon).toBeInTheDocument();
    });

    it('should render the search bar searchbox with the correct value', () => {
        render(<SearchBar searchQuery={"Lalaland"} setSearchQuery={vi.fn()} />);

        const searchBar = screen.getByRole('searchbox');
        expect(searchBar).toHaveValue('Lalaland');
    });

    it('should call the setSearchQuery function when the searchbox value changes', () => {
        const setSearchQueryMock = vi.fn();
        render(<SearchBar searchQuery={""} setSearchQuery={setSearchQueryMock} />);

        const searchBar = screen.getByRole('searchbox');
        fireEvent.change(searchBar, { target: { value: 'Lalaland' } });
        expect(setSearchQueryMock).toHaveBeenCalledWith('Lalaland');
    });
});