import React, { useContext } from 'react';
import planetContext from '../context/planetsContext';

function PlanetFilter() {
  const {
    filterByName,
    handleTextFilter,
    handleNumericFilters,
    numberFilter,
    filterByNumericInfo,
    numericFilters,
  } = useContext(planetContext);

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
      <div>
        <select
          data-testid="column-filter"
          name="columnFilter"
          onChange={ ({ target }) => handleNumericFilters(target) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>

        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          onChange={ ({ target }) => handleNumericFilters(target) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="valueFilter"
          value={ numberFilter }
          onChange={ ({ target }) => handleNumericFilters(target) }
        />
      </div>

      <button
        type="button"
        onClick={ filterByNumericInfo }
        data-testid="button-filter"
      >
        Filtrar
      </button>

      {numericFilters.length > 0 && numericFilters.map((filter, index) => (
        <p
          key={ `filter-${index}` }
        >
          { `${filter.column} | ${filter.comparison} | ${filter.value}` }
        </p>
      ))}
    </div>
  );
}

export default PlanetFilter;
