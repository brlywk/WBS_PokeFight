// frontend/src/components/PokemonCard.jsx

// ... (imports and other stuff)

const PokemonCard = ({ pokemon }) => {
    return (
      <div className="pokemon-card min-w-[200px] max-w-[250px] border border-opacity-40 rounded-lg p-2">
        <img className="w-full h-1/2 object-cover rounded-t-lg" src={pokemon.sprites.front} alt={pokemon.name} />
        <div className="text-center p-2">
          <p className="font-bold">{pokemon.name}</p>
          {/* Other stats */}
        </div>
      </div>
    );
  };
  
  export default PokemonCard;
  