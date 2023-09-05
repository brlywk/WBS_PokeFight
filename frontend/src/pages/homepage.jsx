import React, { useState } from "react";
import homePageBg from "../assets/homepagebg.svg";
import logo from "../assets/PokeFight.webp"; // Import your logo

function HomePage() {
  const [trainerName, setTrainerName] = useState("");

  const handleInputChange = (event) => {
    setTrainerName(event.target.value);
  };

  const handleEnterClick = () => {
    // Handle the enter button click event
    // You might want to navigate to the next page here
  };

  return (
    <div className="homepage-bg flex h-full w-full flex-col items-center justify-center ">
      <img src="/PokeFight.webp" alt="PokeFight Logo" />
      <input
        type="text"
        value={trainerName}
        onChange={handleInputChange}
        placeholder="Enter trainer name"
      />
      <button
        onClick={handleEnterClick}
        className="font-['Press_Start_2P'] text-4xl"
        // style={{
        //   fontFamily: '"Press Start 2P", cursive',
        //   fontSize: "50px",
        //   color: "yellow",
        //   textShadow: "3px 3px 0px black",
        //   fontWeight: "bold",
        //   marginTop: "20px",
        // }}
      >
        Enter
      </button>
      {/* Other components */}
    </div>
  );
}

export default HomePage;
