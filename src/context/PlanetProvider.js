import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetContext from './planetsContext';

function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nextPage, setNextPage] = useState('[]');
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([{
    column: 'population',
    comparison: 'maior que',
    value: 0,
  }]);

  useEffect(() => {
    const getApiResponse = async () => {
      const apiUrl = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(apiUrl);
      const result = await response.json();
      const resultPlanets = result.results;
      resultPlanets.forEach((planet) => delete planet.residents);
      setPlanets(resultPlanets);
      setFilteredPlanets(resultPlanets);
      setCategories(Object.keys(resultPlanets[0]));
      setNextPage(result.next);
    };

    getApiResponse();
  }, []);

  const filterByNumericInfo = () => {
    const { column, value, comparison } = filterByNumericValues[0];
    const toNumber = Number(value);
    let numericFilter = filteredPlanets;
    if (comparison === 'maior que') {
      numericFilter = numericFilter.filter((planet) => Number(planet[column]) > toNumber);
    }
    if (comparison === 'menor que') {
      numericFilter = numericFilter.filter((planet) => Number(planet[column]) < toNumber);
    }
    if (comparison === 'igual a') {
      numericFilter = numericFilter
        .filter((planet) => Number(planet[column]) === toNumber);
    }
    setFilteredPlanets(numericFilter);
  };

  const handleTextFilter = ({ value }) => {
    setFilterByName(value);
    setFilteredPlanets(planets.filter((planet) => (
      (planet.name.toLowerCase()).includes(value.toLowerCase())
    )));
  };

  const handleNumericFilters = (target) => {
    const { name, value } = target;
    if (name === 'columnFilter') {
      setFilterByNumericValues([{ ...filterByNumericValues[0], column: value }]);
    }
    if (name === 'comparisonFilter') {
      setFilterByNumericValues([{ ...filterByNumericValues[0], comparison: value }]);
    }
    if (name === 'valueFilter') {
      setFilterByNumericValues([{ ...filterByNumericValues[0], value }]);
    }
  };

  const providerValue = {
    filteredPlanets,
    categories,
    nextPage,
    filterByName,
    handleTextFilter,
    handleNumericFilters,
    numberFilter: filterByNumericValues[0].value,
    filterByNumericInfo,
  };

  return (
    <planetContext.Provider value={ providerValue }>
      { children }
    </planetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
