// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // for the custom matchers
import Welcome from '../src/Components/Home/Welcome';


describe('MyComponent', () => {
  test('renders the component with the correct text', () => {
    render(<Welcome />);
    
    const element = screen.getByText(/Welcome to the home page/i);
    
    expect(element).toBeInTheDocument();
  });
});