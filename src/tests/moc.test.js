import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import FetchAPI from '../context/FetchAPI_Context';

const resultsData = testData.results;
const colunaFiltered = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];
const filters = [];

test('I am your test', async () => {
  render(
    <FetchAPI.Provider value={ { planets: resultsData, colunaFiltered, filters } }>
      <App />
    </FetchAPI.Provider>,
  );

  const alderaan = screen.getByRole('cell', {
    name: /alderaan/i,
  });
  await waitFor(() => { expect(alderaan).toBeInTheDocument(); });
});
