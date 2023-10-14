import { vi, describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterByRegion from '../components/FilterByRegion';
import { Region } from '../../../api/types';

describe('FilterByRegion Component', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    })

    it('should render the filter by region box', () => {
        render(<FilterByRegion filterByRegion={Region.ALL} setFilterByRegion={vi.fn()} />);

        const filterByRegion = screen.getByRole('combobox');
        expect(filterByRegion).toBeInTheDocument();
    });

    it('should render the filter by region box with the correct options', () => {
        render(<FilterByRegion filterByRegion={Region.ALL} setFilterByRegion={vi.fn()} />);

        Object.values(Region).forEach(region => {
            const button = screen.getByRole('button', { name: region });
            expect(button).toHaveTextContent(region)
        });
    });

    it('should call the setFilterByRegionMock function when the filter by region box value changes', () => {
        const setFilterByRegionMock = vi.fn();
        render(<FilterByRegion filterByRegion={Region.ALL} setFilterByRegion={setFilterByRegionMock} />);

        Object.values(Region).forEach(region => {
            if (region === Region.ALL) return; // skip Region.ALL (because it's the default value and thus it won't trigger the setFilterByRegionMock function)
            const button = screen.getByRole('button', { name: region });
            fireEvent.click(button, { target: { value: region } });
            expect(setFilterByRegionMock).toHaveBeenCalledWith(region);
        });

        // Now test the Region.ALL button since the it isn't currently selected (due to the previous tests)
        fireEvent.click(screen.getByRole('button', { name: Region.ALL }), { target: { value: Region.ALL } });
        expect(setFilterByRegionMock).not.toHaveBeenCalledWith(Region.ALL);
    });
});