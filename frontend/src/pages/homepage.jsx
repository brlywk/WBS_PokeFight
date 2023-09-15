import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/useGameContext";
import { Link, useNavigate } from "react-router-dom";
import { setBackgroundClass, setPageTitle } from "../utils/pageUtil";
import { Howl } from 'howler'; // Import Howl from howler library
import selectEnterSound from '/pokemon-ui-selectenter.flac';
import loopThemeSound from '/rpg-loop-theme.mp3';

// Define the Pokemon sprite URLs
const pokemonSprites = {
  artwork:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
  front:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
};

function HomePage() {
  const { playerName, setPlayerName } = useGameContext();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false); // State to handle mute/unmute

  // Create Howl instances for the sounds
  const selectEnterSoundHowl = new Howl({ src: [selectEnterSound] });
  const loopThemeSoundHowl = new Howl({ src: [loopThemeSound], loop: true });

  useEffect(() => {
    // Start playing the loop theme when the component mounts
    if (!isMuted) {
      loopThemeSoundHowl.play();
    }
    return () => {
      // Stop playing the loop theme when the component unmounts
      loopThemeSoundHowl.stop();
    };
  }, [isMuted]);

  const handleEnterClick = () => {
    if (playerName) {
      navigate("/pokemon-selection");
      if (!isMuted) {
        selectEnterSoundHowl.play(); // Play the select enter sound when "Enter" is clicked
      }
    }
  };

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleEnterClick();
    }
  };

  const handleMuteClick = () => {
    setIsMuted(!isMuted); // Toggle mute/unmute
  };


  useEffect(() => {
    setPageTitle();
    setBackgroundClass("homepage-bg");
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <img src="/PokeFight.webp" alt="PokeFight Logo" />
      <img
        src={pokemonSprites.front}
        alt="Pokemon Sprite"
        className="h-48 w-48 animate-bounce"
      />
      <input
        type="text"
        value={playerName}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={`font-['Press_Start_2P'] mb-6 text-l bg-white/50 border rounded-md p-2 ${
          playerName ? "border-black/50" : "border-red-500/50"
        }`}
        placeholder="Enter trainer name"
      />
      <button
        onClick={handleEnterClick}
        className="text-shadow mb-8 font-['Press_Start_2P'] text-6xl font-bold text-yellow-500"
      >
        Enter
      </button>
      <button onClick={handleMuteClick} className="mb-8">
        {isMuted ? 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg> 
          : 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        }
      </button>
      <Link
        to="/leaderboard"
        className="text-shadow mt-5 font-['Press_Start_2P'] text-xl font-bold text-white"
      >
        Leaderboard
      </Link>
    </div>
  );
}

export default HomePage;




