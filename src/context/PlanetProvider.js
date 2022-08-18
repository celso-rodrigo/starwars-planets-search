import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetContext from './planetsContext';

function PlanetProvider({ children }) {
  const allFilterOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const allNumericFilterValues = [{
    column: 'population',
    comparison: 'maior que',
    value: 0,
  }];

  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [filterByName, setFilterByName] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const [filterOptions, setFilterOptions] = useState(allFilterOptions);
  const [
    filterByNumericValues,
    setFilterByNumericValues,
  ] = useState(allNumericFilterValues);

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

  useEffect(() => {
    const updateColumn = () => {
      setFilterByNumericValues(
        [{ ...filterByNumericValues[0], column: filterOptions[0] }],
      );
    };
    updateColumn();
  }, [filterOptions]);

  useEffect(() => {
    const filterWithName = () => {
      setFilteredPlanets(planets.filter((planet) => (
        (planet.name.toLowerCase()).includes(filterByName.toLowerCase())
      )));
    };
    filterWithName();
  }, [filterByName]);

  useEffect(() => {
    const filterWithNumeric = (filter) => {
      const { column, value, comparison } = filter;
      const toNumber = Number(value);
      let numFilter = filteredPlanets;
      if (comparison === 'maior que') {
        numFilter = numFilter.filter((planet) => Number(planet[column]) > toNumber);
      }
      if (comparison === 'menor que') {
        numFilter = numFilter.filter((planet) => Number(planet[column]) < toNumber);
      }
      if (comparison === 'igual a') {
        numFilter = numFilter.filter((planet) => Number(planet[column]) === toNumber);
      }
      setFilteredPlanets(numFilter);
    };
    numericFilters.forEach((filter) => filterWithNumeric(filter));
  }, [numericFilters]);

  const filterByNumericInfo = () => {
    setNumericFilters(filterByNumericValues[0]);
    setFilterOptions(filterOptions
      .filter((option) => option !== filterByNumericValues[0].column));
    setNumericFilters([...numericFilters, filterByNumericValues[0]]);
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

  const clearAllFilters = () => {
    setFilteredPlanets(planets);
    setNumericFilters([]);
    setFilterByName('');
    setFilterOptions(allFilterOptions);
  };

  const clearFilter = (column) => {
    setNumericFilters(numericFilters.filter((filter) => filter.column !== column));
    setFilterOptions([...filterOptions, column]);
    setFilteredPlanets(planets);
  };

  const providerValue = {
    filteredPlanets,
    setFilterByName,
    categories,
    nextPage,
    filterByName,
    handleNumericFilters,
    numberFilter: filterByNumericValues[0].value,
    filterByNumericInfo,
    numericFilters,
    filterOptions,
    clearFilter,
    clearAllFilters,
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
