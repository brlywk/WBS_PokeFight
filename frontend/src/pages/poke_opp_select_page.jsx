import FilteredList from "../components/FilteredList";

export default function PokemonSelectionPage() {
  const handleSelection = (pokemon) => {
    alert(`Player selected ${pokemon.name}`);
  };

  return (
    <>
      <div className="homepage-bg flex h-full w-full flex-col items-center">
        <h1>Select your pokemon!</h1>
        <FilteredList handleSelection={handleSelection} />
      </div>
    </>
  );
}
