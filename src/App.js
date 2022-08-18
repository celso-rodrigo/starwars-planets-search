import React from 'react';
import PlanetDisplay from './components/PlanetTable';
import PlanetFilter from './components/PlanetFilter';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <PlanetFilter />
      <PlanetDisplay />
    </PlanetProvider>
  );
}

export default App;
