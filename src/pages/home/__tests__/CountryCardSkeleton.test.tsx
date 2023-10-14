import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CountryCardSkeleton from '../components/CountryCardSkeleton';

describe('CountryCardSkeleton Component', () => {
    it('should render the correct number of skeletons', () => {
        const count = 8;
        render(
            <CountryCardSkeleton count={8} />
        );

        // Check if the correct number of skeletons is rendered
        expect(screen.getAllByLabelText('A loading skeleton of a country card')).toHaveLength(count);
    });
});