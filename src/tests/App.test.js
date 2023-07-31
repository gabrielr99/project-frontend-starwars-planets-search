import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FetchProvider from '../context/FetchAPI_Provider';

test('I am your test', () => {
  render(
    <FetchProvider>
      <App />
    </FetchProvider>,
  );

  const tittle = screen.getByText(/Projeto Star Wars - Trybe/i);
  expect(tittle).toBeInTheDocument();

  const textBox = screen.getByRole('textbox');
  expect(textBox).toBeInTheDocument();

  const colunaCombobox = screen.getByRole('combobox', {
    name: /coluna/i,
  });
  expect(colunaCombobox).toBeInTheDocument();

  const operadorCombobox = screen.getByRole('combobox', {
    name: /operador/i,
  });
  expect(operadorCombobox).toBeInTheDocument();

  const inputNumber = screen.getByRole('spinbutton');
  expect(inputNumber).toBeInTheDocument();

  const filtrarBtn = screen.getByRole('button', {
    name: /filtrar/i,
  });
  expect(filtrarBtn).toBeInTheDocument();

  const ordenarCombobox = screen.getByRole('combobox', { name: /Ordenar/i });
  expect(ordenarCombobox).toBeInTheDocument();

  const asc = screen.getByRole('radio', { name: /ascendente/i });
  expect(asc).toBeInTheDocument();

  const desc = screen.getByRole('radio', { name: /descendente/i });
  expect(desc).toBeInTheDocument();

  const ordenarBtn = screen.getByRole('button', {
    name: /ordenar/i,
  });
  expect(ordenarBtn).toBeInTheDocument();

  const rmFiltrosBtn = screen.getByRole('button', {
    name: /remover filtros/i,
  });
  expect(rmFiltrosBtn).toBeInTheDocument();

  fireEvent.change(colunaCombobox, { target: { value: 'rotation_period' } });
  expect(colunaCombobox).toHaveValue('rotation_period');
  fireEvent.change(operadorCombobox, { target: { value: 'igual a' } });
  expect(operadorCombobox).toHaveValue('igual a');
  fireEvent.change(inputNumber, { target: { value: 24 } });
  const INPUT_VALUE = 24;
  expect(inputNumber).toHaveValue(INPUT_VALUE);

  userEvent.click(filtrarBtn);

  const rotationPeriodFilter = screen.getByText(/rotation_period igual a 24/i);
  expect(rotationPeriodFilter).toBeInTheDocument();

  // const tbody = screen.getByRole('table-body');
  // const TABLE_LENGTH = 10;
  // await waitFor(() => { expect(tbody.children.length).toBe(TABLE_LENGTH); });

  // const alderaan = screen.getByRole('cell', {
  //   name: /alderaan/i,
  // });
  // await waitFor(() => { expect(alderaan).toBeInTheDocument(); });
});
