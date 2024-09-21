import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      const promises = data.results.map(async (pokemon) => {
        const pokemonData = await fetch(pokemon.url);
        return await pokemonData.json();
      });
      const results = await Promise.all(promises);
      setPokemons(results);
    };

    fetchPokemons();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  // Filter pokemons based on search input
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search)
  );

  return (
    <div className="app">
      <h1>Search Here</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        className="search-bar"
        value={search}
        onChange={handleSearchChange}
      />
      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <div className="pokemon-card" key={pokemon.id}>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <h2 className="pokemon-name">{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
