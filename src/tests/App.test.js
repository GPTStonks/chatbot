import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';

/* Mocked components */
jest.mock('react-markdown', () => ({ children }) => <div>{children}</div>);
window.HTMLElement.prototype.scrollIntoView = function () {};

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);

    // Verify the presence of the logos (chat + sidebar)
    const logoElements = screen.getAllByRole('img');
    expect(logoElements.length).toBe(2);

    // Verify the search bar
    const searchBar = screen.getByPlaceholderText('Search useful command...');
    expect(searchBar).toBeInTheDocument();

    // Verify specific buttons by their role or visible text
    const styleButton = screen.getByTestId('StyleIcon');
    expect(styleButton).toBeInTheDocument();

    const nextButton = screen.getByTestId('NavigateNextIcon');
    expect(nextButton).toBeInTheDocument();

    // Verify the message input area
    const messageInput = screen.getByLabelText('Write your message here');
    expect(messageInput).toBeInTheDocument();

    // Verify the send button
    const sendButton = screen.getByText('Send');
    expect(sendButton).toBeInTheDocument();
  });
});
