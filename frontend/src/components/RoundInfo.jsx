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
          className="bg-white/25 border border-black/50 rounded-lg w-[60vw] p-4 max-h-[20vh] overflow-y-auto"
          ref={scrollRef}
        >
          <div className="grid grid-cols-[max-content_1fr] gap-x-16 gap-y-2">
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
