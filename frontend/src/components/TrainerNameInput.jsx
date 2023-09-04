// src/components/TrainerNameInput.jsx
import React, { useState } from 'react';

// This component will be the input field for the trainer name
const TrainerNameInput = ({ setTrainerName }) => {
  const [input, setInput] = useState('');

  // Catch errors or unwanted values
  const handleSubmit = () => {
    try {
      if (input) {
        setTrainerName(input);
      } else {
        console.log('Please enter a valid name.');
      }
    } catch (error) {
      console.log(`Error setting name: ${error}`);
    }
  };

  return (
    <div>
      {/* Two-way data binding for React */}
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Enter</button>
    </div>
  );
};

export default TrainerNameInput;
