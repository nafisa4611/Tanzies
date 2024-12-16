import React from "react";
import "./Die.css";

const Die = ({ value, isHeld, onClick }) => {
  return (
    <button
      className={`die-button ${isHeld ? "held" : ""}`} // Add 'held' class if isHeld is true
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Die;
