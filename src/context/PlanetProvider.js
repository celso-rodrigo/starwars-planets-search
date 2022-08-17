import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetContext from './planetsContext';

function PlanetProvider({ children }) {
  const apiUrl = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nextPage, setNextPage] = useState('[]');
  const [filterByName, setFilterByName] = useState('');

  useEffect(() => {
    const getApiResponse = async () => {
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

  const handleTextFilter = ({ value }) => {
    setFilterByName(value);
    setFilteredPlanets(planets.filter((planet) => (
      (planet.name.toLowerCase()).includes(value.toLowerCase())
    )));
  };

  const providerValue = {
    filteredPlanets,
    categories,
    nextPage,
    filterByName,
    handleTextFilter,
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
