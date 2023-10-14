import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
    it('should render the footer', () => {
        render(<Footer />);

        expect(screen.getByText('Challenge and Design by')).toBeInTheDocument();

        expect(screen.getByRole('link', { name: 'Link to Frontend Mentor website' })).toHaveAttribute('href', 'https://www.frontendmentor.io/');
        expect(screen.getByText('Frontend Mentor.')).toBeInTheDocument();

        expect(screen.getByText('Coded by')).toBeInTheDocument();

        expect(screen.getByRole('link', { name: "Link to the author's GitHub profile" })).toHaveAttribute('href', 'https://github.com/MaorBezalel');
        expect(screen.getByText('Maor Bezalel.')).toBeInTheDocument();
    });
});