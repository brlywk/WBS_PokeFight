// poke_opp_select_page.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard'; // Import this component

export default function PokemonSelectionPage() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    // Fetch pokemon data here
    // Imagine this is from your backend's /api/pokemons
    setPokemonData( /* fetched data */ );
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#your-bg-color]">
      <h1 className="text-5xl text-white font-cormorant py-10">Pick your starter Pokémon</h1>
      <div className="carousel w-full h-[400px]">
        {pokemonData.map((poke) => (
          <PokemonCard key={poke._id} data={poke} />
        ))}
      </div>
      <Link to="/opponent-selection" className="text-2xl text-white font-pressStart py-5">
        Continue
      </Link>
    </div>
  );
}
