import React, { useContext } from 'react';
import planetContext from '../context/planetsContext';

function PlanetFilter() {
  const {
    filterByName,
    setFilterByName,
    handleNumericFilters,
    numberFilter,
    filterByNumericInfo,
    numericFilters,
    filterOptions,
    clearFilter,
    clearAllFilters,
  } = useContext(planetContext);

  return (
    <div>
      <label htmlFor="textFilter">
        <p>Filtrar:</p>
        <input
          type="text"
          name="textFilter"
          value={ filterByName }
          onChange={ ({ target }) => setFilterByName(target.value) }
          data-testid="name-filter"
        />
      </label>
      <div>
        <select
          data-testid="column-filter"
          name="columnFilter"
          onChange={ ({ target }) => handleNumericFilters(target) }
        >
          {filterOptions.map((option) => (
            <option key={ option }>{ option }</option>
          ))}
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
        onClick={ () => filterByNumericInfo() }
        data-testid="button-filter"
      >
        Filtrar
      </button>
      {numericFilters.length > 0 && numericFilters.map((filter, index) => (
        <div data-testid="filter" key={ `filter-${index}` }>
          <p>
            { `${filter.column} | ${filter.comparison} | ${filter.value}` }
          </p>
          <button
            type="button"
            onClick={ () => clearFilter(filter.column) }
          >
            X
          </button>
        </div>
      ))}
      {numericFilters.length > 0 && (
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ clearAllFilters }
        >
          Remover todas filtragens
        </button>
      )}
    </div>
  );
}

export default PlanetFilter;
