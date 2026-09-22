import { useState } from "react";
import SlbBank from "./SlbBank.jsx";


function SpecificSlbButton ({key}) {
  const [message, setMessage] = useState ("");

  const handleClick = () => {
    const filteredArray = SlbBank.filter((index) => index.key.trim().toLowerCase() === key.trim().toLowerCase());
    const randomIndex = Math.floor(Math.random() * filteredArray.length);

    if (filteredArray.length === 0) {
        const anotherRandomIndex = Math.floor(Math.random() * SlbBank.length);
        setMessage(SlbBank[anotherRandomIndex].message);
        }

    else (setMessage(filteredArray[randomIndex].message));
  }
    const handlePlay = () => {
    if (!message) return;
    
    // Stop any current speech before starting new
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };
    return (
    <>
      <button className = "bomb-button" onClick={handleClick}>
      </button>
      <h4>{message}</h4>
        {message && (
        <button className= "button2" onClick={handlePlay}>
          ▶        </button>
      )}

    </>
      );
};
export default SpecificSlbButton;
