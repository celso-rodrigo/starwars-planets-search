import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Tests of App component', () => {
  it('Should load the planets on open.', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Tatooine')).toBeDefined());
    await waitFor(() => expect(screen.getByText('Alderaan')).toBeDefined());
    await waitFor(() => expect(screen.getByText('Kamino')).toBeDefined());
  })

  it('Should exist an input to filter by name.', async () => {
    render(<App />);
    const filterByTextInput = screen.getByTestId('name-filter');
    await waitFor(() => expect(screen.getByText('Tatooine')).toBeDefined());
    userEvent.click(filterByTextInput);
    userEvent.type(filterByTextInput, 'Tatooine');
    expect(screen.getByText('Tatooine')).toBeDefined();
  })

  it('Should exist an input to filter by amount.', () => {
    render(<App />);
    const filterByAmountInput = screen.getByTestId('value-filter');
    userEvent.click(filterByAmountInput);
    userEvent.type(filterByAmountInput, '1000');
  })

  it('Should exist an select with 5 different column filters.', () => {
    render(<App />);
    const columnFilterSelect = screen.getByTestId('column-filter');
    expect(columnFilterSelect.childElementCount).toBe(5);
    userEvent.selectOptions(columnFilterSelect, 'diameter');
    expect(screen.getByText('diameter').selected).toBe(true);
  })

  it('Should exist an select with 3 different comparison filters.', () => {
    render(<App />);
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    expect(comparisonFilterSelect.childElementCount).toBe(3);
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');
    expect(screen.getByText('maior que').selected).toBe(true);
    userEvent.selectOptions(comparisonFilterSelect, 'menor que');
    expect(screen.getByText('menor que').selected).toBe(true);
    userEvent.selectOptions(comparisonFilterSelect, 'igual a');
    expect(screen.getByText('igual a').selected).toBe(true);
  })

  it('Should display the filters when the filter button is pressed.', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('Tatooine')).toBeDefined());
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const columnFilterSelect = screen.getByTestId('column-filter');
    const filterButton = screen.getByRole('button');
    userEvent.click(filterButton);
    expect(screen.getByText('population | maior que | 0')).toBeDefined(); 
  
    userEvent.selectOptions(columnFilterSelect, 'surface_water');
    userEvent.selectOptions(comparisonFilterSelect, 'igual a');
    userEvent.click(filterButton);
    expect(screen.getByText('surface_water | igual a | 0')).toBeDefined();
  
    userEvent.selectOptions(comparisonFilterSelect, 'menor que');
    userEvent.selectOptions(columnFilterSelect, 'diameter');
    userEvent.click(filterButton);
    expect(screen.getByText('diameter | menor que | 0')).toBeDefined(); 
  })
})
