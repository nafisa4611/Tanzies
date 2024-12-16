import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./Components/Die/Die";
import Confetti from 'react-confetti'

const App = () => {
  // Function to generate an array of 10 random numbers (1 to 6 for dice)
  const generateRandomNumbers = () => {
    return [...Array(10)].map(() => ({
      value: Math.floor(Math.random() * 6) + 1, // Random value between 1 and 6
      isHeld: false, // Initial state for isHeld is false
    }));
  };

  // State to store the values of the dice
  const [diceValues, setDiceValues] = useState(generateRandomNumbers);
  const [gameWon, setGameWon] = useState(false); // Track if the game is won

  // Function to handle the dice roll
  const rollDice = () => {
    setDiceValues((prevDiceValues) =>
      prevDiceValues.map((die) => {
        // If a die is held, keep its value, otherwise roll a new value
        return die.isHeld
          ? die // If held, return the same die
          : { value: Math.floor(Math.random() * 6) + 1, isHeld: false }; // Roll a new value
      })
    );
  };

  // Function to handle the dice being held
  const holdDie = (index) => {
    setDiceValues((prevDiceValues) =>
      prevDiceValues.map((die, i) =>
        i === index
          ? { ...die, isHeld: !die.isHeld } // Toggle isHeld state
          : die
      )
    );
  };

  // Function to check if the game is won
  const checkGameWon = () => {
    const allHeld = diceValues.every((die) => die.isHeld);
    const allSameValue = diceValues.every(
      (die) => die.value === diceValues[0].value
    );
    if (allHeld && allSameValue) {
      setGameWon(true); // Set the game as won
    }
  };

  // Check if the game is won after every roll or state change
  useEffect(() => {
    checkGameWon();
  }, [diceValues]);

  // Dice elements
  const diceElement = diceValues.map((die, index) => (
    <Die
      key={index}
      value={die.value}
      isHeld={die.isHeld}
      onClick={() => holdDie(index)} // Toggle hold state on click
    />
  ));

  return (
    
    <div className="container">
      {gameWon && <Confetti/>}
      <div className="box">
        <h1 className="game-title">Tanzies Game</h1>
        {gameWon && <h2 className="congratulations">Congratulations! You Won!</h2>}
        <div className="dice-container">{diceElement}</div>
        <button
          className="roll-button"
          onClick={gameWon ? () => setDiceValues(generateRandomNumbers()) : rollDice} // If game is won, start new game
        >
          {gameWon ? "New Game" : "Roll Dice"}
        </button>
      </div>
    </div>
  );
};

export default App;
