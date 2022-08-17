import React, { useContext } from 'react';
import planetContext from '../context/planetsContext';

function PlanetFilter() {
  const { filterByName, handleTextFilter } = useContext(planetContext);
  return (
    <div>
      <label htmlFor="textFilter">
        <p>Filtrar:</p>
        <input
          type="text"
          name="textFilter"
          value={ filterByName }
          onChange={ ({ target }) => handleTextFilter(target) }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default PlanetFilter;
