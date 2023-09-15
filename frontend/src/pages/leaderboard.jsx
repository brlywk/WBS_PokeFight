import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setBackgroundClass, setPageTitle } from "../utils/pageUtil";
import { useAllFights } from "../hooks/useFights";
import { pokemonEndpoint } from "../utils/apiEndpoints";
import Loading from "../components/Loading";

const Leaderboard = () => {
  const { allFights, allFightsLoading, fetch: fetchFights } = useAllFights();
  const [fightsLoading, setFightsLoading] = useState(true);
  const [fights, setFights] = useState([]);

  useEffect(() => {
    setPageTitle("Leaderboard");
    setBackgroundClass("homepage-bg");

    fetchFights();
  }, []);

  useEffect(() => {
    // unfortunately because of not so smart decisions with the database schema,
    // we now have to iterate through all fights and get the pokemon info :(
    if (!allFights) return;

    const getPokemonDataForFights = async () => {
      const tmpFights = [];
      setFightsLoading(true);

      for (const fight of allFights) {
        const adjustedFight = { ...fight };

        try {
          const pokemons = await Promise.all([
            fetch(`${pokemonEndpoint}/${fight.player_one_pokemon_id}`).then(
              (res) => res.json(),
            ),
            fetch(`${pokemonEndpoint}/${fight.player_two_pokemon_id}`).then(
              (res) => res.json(),
            ),
          ]);

          adjustedFight.player_one_pokemon = pokemons[0];
          adjustedFight.player_two_pokemon = pokemons[1];

          tmpFights.push(adjustedFight);
        } catch (err) {
          // this should be properly handled...
          console.log(err.message);
        }
      }

      setFights(tmpFights);
      setFightsLoading(false);
    };

    getPokemonDataForFights();
  }, [allFights]);

  return (
    <div className="animate-fade-in-from-bottom h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-start gap-y-4 md:p-4">
        <Link
          to="/"
          className="continue-button text-shadow font-['Press_Start_2P'] text-lg font-bold text-white md:text-xl"
        >
          &lt; Back
        </Link>
        <h1 className="text-shadow font-['Press_Start_2P'] text-2xl font-bold text-white md:text-4xl">
          Leaderboard
        </h1>
        {fightsLoading && <Loading />}

        {!fightsLoading && fights?.length > 0 && (
          <div className="flex flex-col gap-y-4 md:p-8 lg:w-3/5">
            {fights.map((f) => (
              <div
                key={f._id}
                className="flex flex-col bg-white/50 p-4 backdrop-blur lg:rounded-xl"
              >
                <div className="mb-4 flex justify-between">
                  <div>{new Date(f.createdAt).toLocaleDateString()}</div>
                  <div>{new Date(f.createdAt).toLocaleTimeString()}</div>
                </div>
                <div className="grid gap-x-4 lg:grid-cols-[1fr_1fr_max-content_1fr_1fr]">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row items-center">
                      {f.winner === f.player_one_name && (
                        <img
                          src="/pokeball.png"
                          alt="Winner"
                          className="h-8 w-8 md:mr-4"
                        />
                      )}
                      <h2 className="font-['Press_Start_2P'] text-2xl">
                        {f.player_one_name}
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={f.player_one_pokemon.sprites.front}
                      alt={f.player_one_pokemon.name}
                      className="-scale-x-100"
                    />
                    <div>{f.player_one_pokemon.name}</div>
                  </div>
                  <div className="flex items-center justify-center py-4 font-['Press_Start_2P'] text-4xl text-red-600">
                    VS
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={f.player_two_pokemon.sprites.front}
                      alt={f.player_two_pokemon.name}
                    />
                    <div>{f.player_two_pokemon.name}</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex flex-row items-center">
                      <h2 className="py-4 font-['Press_Start_2P'] text-2xl">
                        {f.player_two_name}
                      </h2>
                      {f.winner === f.player_two_name && (
                        <img
                          src="/pokeball.png"
                          alt="Winner"
                          className="h-8 w-8 md:ml-4"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex w-full justify-center">
                  <div className="flex flex-row flex-wrap gap-2 lg:w-3/4">
                    {f.rounds?.length > 0 &&
                      f.rounds.map((rd) => (
                        <div
                          key={rd.round}
                          className="grid w-full grid-cols-[max-content_1fr] gap-x-4 gap-y-2 lg:gap-x-16"
                        >
                          <div className="text font-['Press_Start_2P']">
                            {rd.round}
                          </div>
                          <div className="flex flex-row flex-wrap">
                            <div className="w-full">
                              <div className="grid grid-cols-[1fr_10fr] gap-x-8">
                                <div className="italic">
                                  {f.player_one_name}
                                </div>
                                <div>
                                  {f.player_one_pokemon.name} used &quot;
                                  {rd.player_one_action}&quot;.{" "}
                                  {f.player_one_pokemon.name} took{" "}
                                  {rd.player_one_damage_taken} damage this
                                  round. {f.player_one_pokemon.name} has{" "}
                                  {rd.player_one_hp_left} of{" "}
                                  {f.player_one_pokemon.stats.hp} HP left.
                                </div>
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="grid grid-cols-[1fr_10fr] gap-x-8">
                                <div className="italic">
                                  {f.player_two_name}
                                </div>
                                <div>
                                  {f.player_two_pokemon.name} used &quot;
                                  {rd.player_two_action}&quot;.{" "}
                                  {f.player_two_pokemon.name} took{" "}
                                  {rd.player_two_damage_taken} damage this
                                  round. {f.player_two_pokemon.name} has{" "}
                                  {rd.player_two_hp_left} of{" "}
                                  {f.player_two_pokemon.stats.hp} HP left.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
