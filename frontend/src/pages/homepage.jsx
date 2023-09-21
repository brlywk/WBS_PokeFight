import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/useGameContext";
import { Link, useNavigate } from "react-router-dom";
import { setBackgroundClass, setPageTitle } from "../utils/pageUtil";
import { Howl } from 'howler'; // Import Howl from howler library
import selectEnterSound from '/pokemon-ui-selectenter.flac';
import loopThemeSound from '/rpg-loop-theme.mp3';
import { Dialog, Transition } from '@headlessui/react'; // Import Dialog and Transition from headlessui library
import { Fragment, useRef } from 'react'; // Import Fragment and useRef from react library

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
  const [isOpen, setIsOpen] = useState(false); // State to handle open/close of the modal
  const cancelButtonRef = useRef(null); // Ref for the cancel button in the modal

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

  const handleModalOpen = () => {
    setIsOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsOpen(false); // Close the modal
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
      <div className="absolute bottom-0 text-center w-full pb-2">
        <p className="text-xs">Copyright Notice: "Pokémon and Pokémon character names are trademarks of Nintendo, The Pokémon Company, and Game Freak. This is a non-commercial, educational project."</p>
        <button onClick={handleModalOpen} className="text-xs underline">Full Copyright Notice and Disclaimer</button>
      </div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          static
          open={isOpen}
          onClose={handleModalClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Full Copyright Notice and Disclaimer
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This project is developed as an educational exercise at WBS Coding School, Berlin. The purpose of this project is to apply and demonstrate skills learned in the program.
                  </p>
                  <p className="text-sm text-gray-500">
                    Pokémon and Pokémon character names are trademarks of Nintendo, The Pokémon Company, and Game Freak. This project is not affiliated with or endorsed by Nintendo or The Pokemon Company International. Any trademarks, service marks, product names, or named features are assumed to be the property of their respective owners and are used only for reference. No challenge to any intellectual property rights is intended or implied.
                  </p>
                  <p className="text-sm text-gray-500">
                    This project is not intended for commercial use and has been created for educational purposes only. No revenue is generated through this project, nor is it intended to generate any revenue. The content utilized in this project is used in a fair-use context.
                  </p>
                  <p className="text-sm text-gray-500">
                    This project uses data from the Pokémon API, images, and other Pokémon-related assets that are copyrighted.
                  </p>
                  <p className="text-sm text-gray-500">
                    Any redistribution or reproduction of part or all of the contents in any form is prohibited, other than the following:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-500">
                    <li>You may print or download to a local hard disk extracts for your personal and non-commercial use only.</li>
                    <li>You may copy the content to individual third parties for their personal use, but only if you acknowledge the project as the source of the material.</li>
                  </ul>
                  <p className="text-sm text-gray-500">
                    This project and any dispute arising out of it are subject to the laws of Berlin, Germany.
                  </p>
                  <p className="text-sm text-gray-500">
                    For any questions or clarifications, please contact me at jr.a.schmalz@gmail.com
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleModalClose}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default HomePage;
