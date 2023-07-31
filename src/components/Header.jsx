import React, { useContext, useEffect, useState } from 'react';
import FetchAPI from '../context/FetchAPI_Context';
import './header.css';

function Header() {
  const { setPlanets, planetsAPI, colunaFiltered,
    addFilters, rmAllFilters, setOrder, apllyOrder, order } = useContext(FetchAPI);
  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [inputNumber, setInputNumber] = useState(0);
  // const [sort, setSort] = useState('ASC');
  // const [column, setColumn] = useState('population');

  useEffect(() => {
    setColuna(colunaFiltered[0]);
  }, [colunaFiltered]);

  const handleChange = ({ target: { value } }) => {
    setPlanets(planetsAPI.filter(({ name }) => name
      .toLowerCase()
      .includes(value.toLowerCase())));
  };

  const handleClick = () => {
    addFilters({ coluna, operador, inputNumber });
  };

  const handleOrder = () => {
    apllyOrder();
  };

  return (
    <header>
      <div className="searchAndTitle">
        <h3 className="title">Projeto Star Wars - Trybe</h3>
        <form action="">
          <input
            data-testid="name-filter"
            className="searchOpt"
            type="text"
            onChange={ (e) => handleChange(e) }
          />
        </form>
      </div>
      <div className="header_forms">
        <label htmlFor="coluna" className="label_select">
          Coluna
          <select
            id="coluna"
            defaultValue={ colunaFiltered[0] }
            data-testid="column-filter"
            value={ coluna }
            onChange={ (e) => setColuna(e.target.value) }
          >
            {
              colunaFiltered.map((opt) => (
                <option key={ opt } value={ opt }>{opt}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="operador" className="label_select">
          Operador
          <select
            name=""
            id="operador"
            defaultValue="maior que"
            data-testid="comparison-filter"
            onChange={ (e) => setOperador(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          name=""
          defaultValue={ inputNumber }
          id=""
          data-testid="value-filter"
          onChange={ (e) => setInputNumber(e.target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => handleClick() }
        >
          FILTRAR
        </button>
        <label htmlFor="ordenar" className="label_select">
          Ordenar
          <select
            id="ordenar"
            defaultValue="population"
            data-testid="column-sort"
            name="Ordenar"
            // onChange={ (e) => setColumn(e.target.value) }
            onChange={ (e) => setOrder((prev) => ({
              ...prev,
              column: e.target.value,
            })) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <div className="radio_order">
          <div>
            <input
              type="radio"
              name="order"
              id="ASC"
              data-testid="column-sort-input-asc"
              // onClick={ () => setSort('ASC') }
              onChange={ () => setOrder((prev) => ({
                ...prev,
                sort: 'ASC',
              })) }
              checked={ order.sort === 'ASC' }
            />
            <label htmlFor="ASC">Ascendente</label>
          </div>
          <div>
            <input
              type="radio"
              name="order"
              id="DESC"
              data-testid="column-sort-input-desc"
              // onClick={ () => setSort('DESC') }
              onChange={ () => setOrder((prev) => ({
                ...prev,
                sort: 'DESC',
              })) }
              checked={ order.sort === 'DESC' }
            />
            <label htmlFor="DESC">Descendente</label>
          </div>
        </div>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ () => handleOrder() }
        >
          ORDENAR
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => {
            rmAllFilters();
            setColuna('population');
          } }
        >
          REMOVER FILTROS
        </button>
      </div>
    </header>
  );
}

export default Header;
