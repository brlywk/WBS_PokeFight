// poke_arena_page.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameButton from "../components/GameButton";
import RoundInfo from "../components/RoundInfo";
import SpDisplay from "../components/SpDisplay";
import { useGameContext } from "../contexts/useGameContext";
import { useSaveFight } from "../hooks/useFights";
import { useTypeEffects } from "../hooks/useTypes";
import {
  calculateDamageCaused,
  createRoundInfo,
  getTypeEffectModifier,
} from "../utils/gameHelper";
import { setBackgroundClass, setPageTitle } from "../utils/pageUtil";

export default function PokeArenaPage() {
  // ---- CONTEXT
  const { playerName, playerPokemon, opponentName, opponentPokemon } =
    useGameContext();

  // ---- CUSTOM HOOKS
  const {
    allTypeEffects,
    allTypeEffectsLoading,
    fetch: fetchTypeEffects,
  } = useTypeEffects();
  const { saveFight } = useSaveFight();

  const navigate = useNavigate();

  // ---- STATE
  const [playerSp, setPlayerSp] = useState(3);
  const [opponentSp, setOpponentSp] = useState(3);
  const [playerCurrentHp, setPlayerCurrentHp] = useState(
    playerPokemon?.stats.hp,
  );
  const [opponentCurrentHp, setOpponentCurrentHp] = useState(
    opponentPokemon?.stats.hp,
  );
  const [round, setRound] = useState(1);
  const [allRounds, setAllRounds] = useState([]);
  const [winner, setWinner] = useState(null);

  // ---- PLAYER ACTIONS
  const calculateRound = (action) => {
    const oppActions = [
      "attack",
      "defense",
      "special_attack",
      "special_defense",
    ];

    let oppActionTaken =
      oppActions[Math.floor(Math.random() * oppActions.length)];

    // check if opponent can do a special attack
    if (
      oppActionTaken === "special_attack" ||
      oppActionTaken === "special_defense"
    ) {
      if (opponentSp === 0) {
        oppActionTaken = oppActionTaken.split("_")[1];
      } else {
        setOpponentSp((prev) => prev - 1);
      }
    }

    // check if player can take special action
    if (action === "special_attack" || action === "special_defense") {
      if (playerSp === 0) {
        action = action.split("_")[1];
      } else {
        setPlayerSp((prev) => prev - 1);
      }
    }

    // for damage calculation
    const playerSpecialModifier = getTypeEffectModifier(
      playerPokemon.type,
      opponentPokemon.type,
      allTypeEffects,
    );
    const oppSpecialModifier = getTypeEffectModifier(
      opponentPokemon.type,
      playerPokemon.type,
      allTypeEffects,
    );
    const attackModifier = 10;

    // Calculate damage taken by player and CPU
    const playerDamage = calculateDamageCaused(
      action,
      playerPokemon,
      oppActionTaken,
      opponentPokemon,
      attackModifier,
      playerSpecialModifier,
    );
    const oppDamage = calculateDamageCaused(
      oppActionTaken,
      opponentPokemon,
      action,
      playerPokemon,
      attackModifier,
      oppSpecialModifier,
    );

    const newPlayerHp = Math.max(playerCurrentHp - oppDamage, 0);
    const newOppHp = Math.max(opponentCurrentHp - playerDamage, 0);

    setPlayerCurrentHp(newPlayerHp);
    setOpponentCurrentHp(newOppHp);

    const roundInfo = createRoundInfo(
      round,
      action,
      oppDamage,
      oppActionTaken,
      playerDamage,
      newPlayerHp,
      newOppHp,
    );

    setRound((prev) => prev + 1);

    // order might be wrong here... maybe fix this later...
    setAllRounds((prev) => [...prev, roundInfo]);

    // const playerFaster = playerPokemon.stats.speed >= opponentPokemon.stats.speed;

    // determine winner before updating HP (otherwise might be out of sync)
    if (newPlayerHp === 0 && newOppHp === 0) {
      setWinner(playerName);
    } else if (newOppHp === 0) {
      setWinner(playerName);
    } else if (newPlayerHp === 0) {
      setWinner(opponentName);
    }
  };

  const persistFightResult = async () => {
    const fightResult = {
      winner,
      player_one_name: playerName,
      player_two_name: opponentName,
      player_one_pokemon_id: playerPokemon.pokedexId,
      player_two_pokemon_id: opponentPokemon.pokedexId,
      rounds: allRounds,
    };

    saveFight(fightResult);
    return;
  };

  // ---- FETCH TYPE DATA ON LOAD
  useEffect(() => {
    fetchTypeEffects();
    setPageTitle("FIGHT TO THE DEATH");
    setBackgroundClass("poke-arena-bg");
  }, []);

  useEffect(() => {
    if (!winner) return;

    // this feels wrong but right now it's the easiest way...
    async function persistFight() {
      await persistFightResult();
    }

    persistFight();
    navigate("/result");
  }, [winner]);

  return (
    <div className="animate-fade-in-from-bottom">
    <div className="flex h-full w-full flex-col items-center justify-center relative">
      {(!playerName || !playerPokemon || !opponentPokemon) && (
        <div className="flex w-full h-full justify-center items-center">
          It seems like you did not start the game properly. Please go back to
          the{" "}
          <Link to="/" className="text-blue-300 hover:underline mx-2">
            Start Page
          </Link>{" "}
          to start the game!
        </div>
      )}

      {!allTypeEffectsLoading &&
        allTypeEffects &&
        playerName &&
        playerPokemon &&
        opponentPokemon && (
          <>
            {/* VS */}
            <div className="relative top-20  transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-red-500 border-4 border-red-500 py-2 px-4 bg-white bg-opacity-30">
              VS
            </div>

            {/* Player */}
            <div className="relative -left-[25vw] top-[30vh]  flex flex-col items-center">
              <div className="flex flex-col items-center space-y-1">
                <SpDisplay amount={playerSp} />
                <div className="bg-black text-white rounded-full px-2 py-1">
                  {playerPokemon.name}
                </div>
                <div className="bg-green-500 text-white rounded-full px-2 py-1">{`${playerCurrentHp}/${playerPokemon.stats.hp}`}</div>
              </div>
              <img
                src={playerPokemon.sprites.back}
                alt={playerPokemon.name}
                className="w-48 h-48 playerPokemon"
              />
            </div>

            {/* Game GameButtons */}
            <div className="fixed left-0 bottom-1/4 flex flex-wrap md:flex-nowrap flex-row md:flex-col items-start space-x-1 md:space-x-0 md:space-y-4 ml-16 text-left">            
            <GameButton
              className="min-w-max"
                label="Attack"
                onClick={() => calculateRound("attack")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M216 34h-64a6 6 0 0 0-4.76 2.34l-65.39 85L70.6 110.1a14 14 0 0 0-19.8 0l-12.7 12.7a14 14 0 0 0 0 19.81L59.51 164L30.1 193.42a14 14 0 0 0 0 19.8l12.69 12.69a14 14 0 0 0 19.8 0L92 196.5l21.4 21.4a14 14 0 0 0 19.8 0l12.7-12.69a14 14 0 0 0 0-19.81l-11.25-11.25l85-65.39A6 6 0 0 0 222 104V40a6 6 0 0 0-6-6ZM54.1 217.42a2 2 0 0 1-2.83 0l-12.68-12.69a2 2 0 0 1 0-2.82L68 172.5L83.51 188Zm83.31-20.7l-12.69 12.7a2 2 0 0 1-2.84 0l-75.29-75.3a2 2 0 0 1 0-2.83l12.69-12.7a2 2 0 0 1 2.84 0l75.29 75.3a2 2 0 0 1 0 2.83ZM210 101.05l-83.91 64.55l-13.6-13.6l51.75-51.76a6 6 0 0 0-8.48-8.48L104 143.51l-13.6-13.6L155 46h55Z"
                  />
                </svg>
              </GameButton>
              <GameButton
                label="Special Attack"
                onClick={() => calculateRound("special_attack")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </GameButton>
              <GameButton
                label="Defense"
                onClick={() => calculateRound("defend")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.263 6.913T12 22Zm0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"
                  />
                </svg>
              </GameButton>
              <GameButton
                label="Special Defense"
                onClick={() => calculateRound("special_defend")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3c2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04l-1.03-3.41l2.84-2.15l-3.56-.08L10 5.12L8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z"
                  />
                </svg>
              </GameButton>
            </div>


            {/* Opponent */}
            <div className="relative left-[20vw] -top-[25vh] flex flex-col items-center">
              <div className="flex flex-col items-center space-y-1">
                <SpDisplay amount={opponentSp} />
                <div className="bg-black text-white rounded-full px-2 py-1 mb-1">
                  {opponentPokemon.name}
                </div>
                <div className="bg-green-500 text-white rounded-full px-2 py-1">{`${opponentCurrentHp}/${opponentPokemon.stats.hp}`}</div>
              </div>
              <img
                src={opponentPokemon.sprites.front}
                alt={opponentPokemon.name}
                className="w-48 h-48 opponentPokemon"
              />
            </div>

            {/* Combat Messages ... pretty ugly and desperately needs refactoring, 
          but final projects looms over us! */}
            <RoundInfo
              playerName={playerName}
              playerPokemon={playerPokemon}
              opponentName={opponentName}
              opponentPokemon={opponentPokemon}
              allRounds={allRounds}
            />
          </>
        )}
    </div>
    </div>
  );
}
