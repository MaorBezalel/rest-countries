import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BorderCountriesSkeleton from '../components/BorderCountriesSkeleton';
import * as hooks from '../../../hooks';

describe('BorderCountriesSkeleton Component', () => {
    it('should render the skeleton when data is loading', () => {
        vi.spyOn(hooks, 'useFetch').mockReturnValue([{
            data: null,
            isLoading: true,
            error: null,
        }, vi.fn()]);

        render(<BorderCountriesSkeleton />);

        // Check if the border countries are rendered
        expect(screen.getByLabelText('A loading skeleton of border countries links')).toBeInTheDocument();
    });
});