import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FetchAPI from './FetchAPI_Context';

export default function FetchProvider({ children }) {
  const [planetsAPI, setPlanetsAPI] = useState([{}]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState([]);
  const [colunaFiltered, setColunaFiltered] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        const newData = data.results.map((planet) => {
          delete planet.residents;
          return planet;
        });
        setPlanetsAPI(newData);
      });
  }, []);

  useEffect(() => {
    setColunaFiltered([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]);
  }, []);

  useEffect(() => {
    let planetsFiltered = planetsAPI;

    if (filters.length === 0) {
      return setPlanets(planetsAPI);
    }

    filters.forEach(({ coluna, operador, inputNumber }) => {
      if (operador === 'maior que') {
        planetsFiltered = planetsFiltered
          .filter((planeta) => Number(planeta[coluna]) > inputNumber);
      } else if (operador === 'menor que') {
        console.log('adicionou <');
        planetsFiltered = planetsFiltered
          .filter((planeta) => Number(planeta[coluna]) < inputNumber);
      } else if (operador === 'igual a') {
        planetsFiltered = planetsFiltered
          .filter((planeta) => Number(planeta[coluna]) === Number(inputNumber));
      }
    });
    setPlanets(planetsFiltered);
  }, [filters, planetsAPI]);

  const addFilters = ({ coluna, operador, inputNumber }) => {
    if (colunaFiltered.length > 0) {
      setFilters([...filters, { coluna, operador, inputNumber }]);
    } else if (colunaFiltered.length === 1) {
      return setColunaFiltered([]);
    }
    setColunaFiltered(colunaFiltered.filter((opt) => opt !== coluna));
  };

  const rmFilters = ({ coluna }) => {
    setColunaFiltered([...colunaFiltered, coluna]);
    setFilters(filters.filter((filter) => filter.coluna !== coluna));
  };

  const rmAllFilters = () => {
    setFilters([]);
    setColunaFiltered([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]);
  };

  useEffect(() => {
    setPlanets(planetsAPI.sort((a, b) => {
      const SORT_NUMBER = -1;
      if (a.name < b.name) {
        return SORT_NUMBER;
      } if (a.name > b.name) {
        return 1;
      }
      return 0;
    }));
  }, [planetsAPI]);

  const apllyOrder = () => {
    const { column, sort } = order;
    let orderPlanets = [];
    const unknownPlanets = planets.filter((planet) => planet[column] === 'unknown');
    const filterUnknownPlanets = planets.filter((planet) => planet[column] !== 'unknown');
    if (sort === 'ASC') {
      orderPlanets = [...filterUnknownPlanets
        .sort((a, b) => Number(a[column]) - Number(b[column]))];
    } else {
      orderPlanets = [...filterUnknownPlanets
        .sort((a, b) => Number(Number(b[column]) - a[column]))];
    }
    setPlanets([...orderPlanets, ...unknownPlanets]);
  };

  return (
    <FetchAPI.Provider
      value={ {
        planets,
        setPlanets,
        planetsAPI,
        filters,
        setFilters,
        colunaFiltered,
        setColunaFiltered,
        addFilters,
        rmFilters,
        rmAllFilters,
        order,
        setOrder,
        apllyOrder,
      } }
    >
      { children }
    </FetchAPI.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
