import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetContext from './planetsContext';

function PlanetProvider({ children }) {
  const apiUrl = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const [planets, setPlanets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nextPage, setNextPage] = useState('[]');

  useEffect(() => {
    const getApiResponse = async () => {
      const response = await fetch(apiUrl);
      const result = await response.json();
      const resultPlanets = result.results;
      resultPlanets.forEach((planet) => delete planet.residents);
      setPlanets(resultPlanets);
      setCategories(Object.keys(resultPlanets[0]));
      setNextPage(result.next);
    };

    getApiResponse();
  }, []);

  const providerValue = {
    planets,
    categories,
    nextPage,
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
