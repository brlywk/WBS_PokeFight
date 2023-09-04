import React, { useState } from 'react';
import homePageBg from "../assets/homepagebg.svg";
import logo from "../assets/PokeFight.webp"; // Import your logo

function HomePage() {
  const [trainerName, setTrainerName] = useState('');

  const handleInputChange = (event) => {
    setTrainerName(event.target.value);
  };

  const handleEnterClick = () => {
    // Handle the enter button click event
    // You might want to navigate to the next page here
  };

  return (
    <div style={{ 
      backgroundImage: `url(${homePageBg})`,
      height: '100vh', 
      width: '100%', 
      backgroundSize: 'cover', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
    }}>
      <img src={logo} alt="PokeFight Logo" style={{ position: 'absolute', top: '2cm' }} />
      <input 
        type="text" 
        value={trainerName} 
        onChange={handleInputChange} 
        placeholder="Enter trainer name"
      />
      <button 
        onClick={handleEnterClick} 
        style={{ 
          fontFamily: '"Press Start 2P", cursive', 
          fontSize: '50px', 
          color: 'yellow', 
          textShadow: '3px 3px 0px black', 
          fontWeight: 'bold', 
          marginTop: '20px' 
        }}
      >
        Enter
      </button>
      {/* Other components */}
    </div>
  );
}

export default HomePage;