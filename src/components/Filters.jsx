import React, { useContext } from 'react';
import FetchAPI from '../context/FetchAPI_Context';
import './filters.css';

function Filters() {
  const {
    filters,
    rmFilters,
  } = useContext(FetchAPI);

  const handleClick = ({ coluna, operador, inputNumber }) => {
    rmFilters({ coluna, operador, inputNumber });
  };

  return (
    <div className="container_filters">
      {
        filters.map(({ coluna, operador, inputNumber }, index) => (
          <div key={ index } className="filter">
            <span data-testid="filter">
              {`${coluna} ${operador} ${inputNumber}`}
              <button
                onClick={ () => handleClick({ coluna, operador, inputNumber }) }
              >
                [x]
              </button>
            </span>
          </div>
        ))
      }
    </div>
  );
}

export default Filters;
