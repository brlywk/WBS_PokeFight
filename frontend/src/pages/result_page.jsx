import { useEffect } from "react";
import { Link } from "react-router-dom"; // Import useNavigate from react-router-dom
import { setBackgroundClass, setPageTitle } from "../utils/pageUtil";

function ResultPage() {
  useEffect(() => {
    setPageTitle("Game Over");
    setBackgroundClass("poke-arena-bg");
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-30 backdrop-blur-md p-10 rounded-lg border-4 border-black">
        <h1 className="font-['Press_Start_2P'] text-3xl text-red-500 font-bold mt-5 text-shadow flex items-center justify-center mb-5">
          GAME OVER
        </h1>
        <div className="flex justify-center gap-5">
          <Link
            to="/"
            className="font-['Press_Start_2P'] text-2xl text-yellow-500 bg-black font-bold mt-5 text-shadow p-10" // Reduced font size
          >
            PLAY AGAIN
          </Link>
          <Link
            to="/leaderboard"
            className="font-['Press_Start_2P'] text-2xl text-black bg-white border-2 border-black font-bold mt-5 p-10" // Reduced font size
          >
            LEADERBOARD
          </Link>
        </div>
      </div>
    </div>
  );
}

export { ResultPage };
