import { Fragment, useEffect, useRef } from "react";

export default function RoundInfo({
  playerName,
  opponentName,
  playerPokemon,
  opponentPokemon,
  allRounds,
}) {
  const scrollRef = useRef(null);

  const playerFaster = playerPokemon.stats.speed >= opponentPokemon.stats.speed;

  const firstPlayer = playerFaster ? playerName : opponentName;
  const lastPlayer = playerFaster ? opponentName : playerName;

  const firstPokemon = playerFaster ? playerPokemon : opponentPokemon;
  const lastPokemon = playerFaster ? opponentPokemon : playerPokemon;

  // scroll to the bottom of the list when new rounds are added
  useEffect(() => {
    const div = scrollRef.current;
    if (!div) return;
    div.scrollTop = div.scrollHeight;
  }, [allRounds]);

  return (
    <>
      {allRounds && allRounds.length > 0 && (
        <div
          className="fixed bottom-0 h-[10vh] w-full overflow-y-auto border-t-2 border-black/50 bg-white/25 p-2 text-sm backdrop-blur md:bottom-4 md:right-4 md:h-[15vh] md:w-3/5 md:rounded-lg md:border-2 md:p-4 lg:w-1/2"
          ref={scrollRef}
        >
          <div className="flex flex-col md:grid md:grid-cols-[max-content_1fr] md:gap-x-8 md:gap-y-2 lg:gap-x-16">
            {allRounds.map((rd) => (
              <Fragment key={rd.round}>
                <div>Round {rd.round}</div>
                <div className="flex flex-row flex-wrap">
                  <div className="w-full">
                    <div className="grid grid-cols-[1fr_10fr] gap-x-8">
                      <div className="italic">{firstPlayer}</div>
                      <div>
                        {firstPokemon.name} used &quot;
                        {rd.player_one_action}&quot;. {firstPokemon.name} took{" "}
                        {rd.player_one_damage_taken} damage this round.{" "}
                        {firstPokemon.name} has {rd.player_one_hp_left} of{" "}
                        {firstPokemon.stats.hp} HP left.
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="grid grid-cols-[1fr_10fr] gap-x-8">
                      <div className="italic">{lastPlayer}</div>
                      <div>
                        {lastPokemon.name} used &quot;
                        {rd.player_two_action}&quot;. {lastPokemon.name} took{" "}
                        {rd.player_two_damage_taken} damage this round.{" "}
                        {lastPokemon.name} has {rd.player_two_hp_left} of{" "}
                        {lastPokemon.stats.hp} HP left.
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
