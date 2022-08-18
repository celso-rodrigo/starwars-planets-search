import React, { useContext } from 'react';
import planetContext from '../context/planetsContext';

function PlanetTable() {
  const { filteredPlanets, categories } = useContext(planetContext);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {categories.map((category) => (
            <th key={ `${category}-heading` }>
              <p>{ category }</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((planet) => (
          <tr key={ planet.name }>
            <td>
              <p>{ planet.name }</p>
            </td>
            <td>
              <p>{ planet.rotation_period }</p>
            </td>
            <td>
              <p>{ planet.orbital_period }</p>
            </td>
            <td>
              <p>{ planet.diameter }</p>
            </td>
            <td>
              <p>{ planet.climate }</p>
            </td>
            <td>
              <p>{ planet.gravity }</p>
            </td>
            <td>
              <p>{ planet.terrain }</p>
            </td>
            <td>
              <p>{ planet.surface_water }</p>
            </td>
            <td>
              <p>{ planet.population }</p>
            </td>
            <td>
              <p>{ planet.edited }</p>
            </td>
            <td>
              <p>{ planet.created }</p>
            </td>
            <td>
              <p>{ planet.films }</p>
            </td>
            <td>
              <p>{ planet.url }</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlanetTable;
