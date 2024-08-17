import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import URLForm from './components/URLForm';
import MetadataDisplay from './components/MetadataDisplay';

describe('MetadataDisplay Component', () => {
    it('renders metadata items', () => {
        const metadata = [
            { url: 'https://www.w3schools.com/', title: 'W3Schools Online Web Tutorials', description: 'Example description', image: 'https://www.w3schools.com/images/w3schools_logo_436_2.png' },
        ];

        render(<MetadataDisplay metadata={metadata} />);
        
        expect(screen.getByText(/W3Schools Online Web Tutorials/i)).toBeInTheDocument();
        expect(screen.getByText('Example description')).toBeInTheDocument();
        expect(screen.getByAltText(/W3Schools Online Web Tutorials/i)).toHaveAttribute('src', 'https://www.w3schools.com/images/w3schools_logo_436_2.png');
    });

    it('renders a message when no metadata is available', () => {
        render(<MetadataDisplay metadata={[]} />);

        expect(screen.getByText('No metadata available')).toBeInTheDocument();
    });
});

describe('URLForm Component', () => {
    it('renders the form with input fields and submit button', () => {
        render(<URLForm />);

        expect(screen.getByPlaceholderText('Enter a URL')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('shows an error message when the input is invalid', () => {
        render(<URLForm />);

        const input = screen.getByPlaceholderText('Enter a URL');  // Get the input inside the test
        fireEvent.change(input, { target: { value: 'invalid-url' } });
        fireEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Please enter a valid URL')).toBeInTheDocument();
    });

    it('calls the fetch metadata function when form is submitted with valid URLs', () => {
        const mockFetchMetadata = jest.fn();
        render(<URLForm fetchMetadata={mockFetchMetadata} />);

        const input = screen.getByPlaceholderText('Enter a URL');  // Get the input inside the test
        fireEvent.change(input, { target: { value: 'https://www.w3schools.com/' } });
        fireEvent.click(screen.getByText('Submit'));

        expect(mockFetchMetadata).toHaveBeenCalledWith(['https://www.w3schools.com/']);
    });
});
