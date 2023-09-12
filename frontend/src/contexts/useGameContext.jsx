import { createContext, useContext, useState } from "react";

export const GameContext = createContext(null);

export default function GameContextProvider({ children }) {
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState("CPU");
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
        opponentName,
        setOpponentName,
        playerPokemon,
        setPlayerPokemon,
        opponentPokemon,
        setOpponentPokemon,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }

  return context;
}
